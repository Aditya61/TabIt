import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const amount = parseFloat(formData.get('amount'));
        const method = formData.get('method');

        const creditorId = params.id;

        if (!amount) {
            return fail(400, {message: "All fields are required!"});
        }

        try {
            // Add payment
            const payment = await prisma.payment.create({
                data: {
                    creditorId: creditorId,
                    amount: amount,
                    method: method
                }
            })

            // Update status of credits - oldest first
            let remaining = amount;
            const credits = await prisma.credit.findMany({
                where: {
                    creditorId: creditorId,
                    amtRemaining: { gt: 0 }
                },
                orderBy: { date: 'asc' }
            });

            for (const credit of credits) {
                if (remaining <= 0) break;

                const toPay = Math.min(credit.amtRemaining, remaining);
                const newAmtRemaining = credit.amtRemaining - toPay;
                const newAmtPaid = credit.amtPaid + toPay;
                let status = "PARTIALLY PAID";
                if (newAmtRemaining === 0) {
                    status = "PAID";
                }

                await prisma.credit.update({
                    where: { id: credit.id },
                    data: {
                        amtRemaining: newAmtRemaining,
                        amtPaid: newAmtPaid,
                        status: status
                    }
                });

                remaining -= toPay;
            }

            // Update creditor's outstanding
            const creditor = await prisma.creditor.update({
                where: {
                    id: creditorId
                },
                data: {
                    outstanding: {
                        decrement: amount
                    }
                }
            })
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Payment Failed!"});
        }

        throw redirect(303, `/creditors/dashboard/${creditorId}`);
    }
};