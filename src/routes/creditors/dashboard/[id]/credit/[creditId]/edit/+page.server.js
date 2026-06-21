import { prisma } from "$lib/server/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

// Load credit + its current items for editing
/** @type {import('./$types').PageLoad} */
export async function load({ params, locals }) {
    const user = locals.user;
    if (!user) {
        throw redirect(302, '/login');
    }

    const creditor = await prisma.creditor.findFirst({
        where: {
            id: params.id,
            userId: user.id
        },
        select: {
            id: true,
            name: true,
            phone: true
        }
    });

    if (!creditor) {
        return fail(404, {message: "Creditor Not Found!"});
    }

    const credit = await prisma.credit.findFirst({
        where: {
            id: params.creditId,
            creditorId: params.id
        },
        select: {
            id: true,
            amtRemaining: true,
            amtPaid: true,
            status: true,
            date: true,
            items: {
                select: {
                    id: true,
                    name: true,
                    quantity: true,
                    totalPrice: true
                }
            }
        }
    });

    if (!credit) {
        return fail(404, {message: "Credit Not Found!"});
    }

    return { user, creditor, credit };
}

// Replace the credit's items and cascade the resulting change to the
// creditor's current outstanding + outstanding log
/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params, locals }) => {
        const userId = locals.user?.id;
        if (!userId) {
            throw redirect(302, '/login');
        }

        const creditorId = params.id;
        const creditId = params.creditId;

        const formData = await request.formData();

        // Save array of fields
        const names = formData.getAll('items[][name]');
        const quantities = formData.getAll('items[][quantity]');
        const totalPrices = formData.getAll('items[][totalPrice]');

        // Convert it to json
        const items = names.map((_, i) => ({
            name: names[i],
            quantity: parseFloat(quantities[i]),
            totalPrice: parseFloat(totalPrices[i])
        }));

        if (!items?.length) {
            return fail(400, {message: "At least one item required!"});
        }

        const newAmount = items.reduce((sum, item) => {
            return sum + item.totalPrice;
        }, 0);

        if (!newAmount || newAmount <= 0) {
            return fail(400, {message: "Total amount must be greater than zero!"});
        }

        const creditor = await prisma.creditor.findFirst({
            where: { id: creditorId, userId: userId }
        });

        if (!creditor) {
            return fail(404, {message: "Creditor not found!"});
        }

        const credit = await prisma.credit.findFirst({
            where: { id: creditId, creditorId: creditorId }
        });

        if (!credit) {
            return fail(404, {message: "Credit not found!"});
        }

        // amtPaid never changes here - only the remaining/billed amount does.
        // The new remaining amount can never drop below what's already been paid.
        const newAmtRemaining = newAmount - credit.amtPaid;

        if (newAmtRemaining < 0) {
            return fail(400, {message: `New total can't be less than the amount already paid (₹ ${credit.amtPaid})!`});
        }

        let status = "PENDING";
        if (newAmtRemaining === 0) {
            status = "PAID";
        } else if (credit.amtPaid > 0) {
            status = "PARTIALLY PAID";
        }

        // Calculate previous and updated outstanding for OutstandingLog
        const prevOutstanding = creditor.outstanding;
        const delta = newAmtRemaining - credit.amtRemaining;
        const nextOutstanding = prevOutstanding + delta;

        try {
            await prisma.$transaction(async (tx) => {
                // Drop the old item set and recreate it from the submitted form
                await tx.item.deleteMany({ where: { creditId: creditId } });

                await tx.credit.update({
                    where: { id: creditId },
                    data: {
                        amtRemaining: newAmtRemaining,
                        status: status,
                        items: {
                            create: items
                        }
                    }
                });

                // Only touch outstanding/the log if the billed amount actually changed
                if (delta !== 0) {
                    await tx.outstandingLog.create({
                        data: {
                            creditId: creditId,
                            prevOutstanding: prevOutstanding,
                            nextOutstanding: nextOutstanding
                        }
                    });

                    await tx.creditor.update({
                        where: { id: creditorId },
                        data: {
                            outstanding: {
                                increment: delta
                            }
                        }
                    });
                }
            });
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Credit update failed!"});
        }

        throw redirect(303, `/creditors/dashboard/${creditorId}/credit/${creditId}`);
    }
};
