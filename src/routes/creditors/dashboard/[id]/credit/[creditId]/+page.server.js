import { prisma } from "$lib/server/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const creditId = params.creditId;
    const creditorId = params.id;

    const creditor = await prisma.creditor.findFirst({
        where: {
            id: creditorId
        },
        select: {
            id: true,
            name: true,
            phone: true,
            outstanding: true
        }
    })

    const credit = await prisma.credit.findFirst({
        where: {
            id: creditId,
            creditorId: creditorId
        },
        select: {
            id: true,
            amtRemaining: true,
            amtPaid: true,
            status: true,
            date: true,
            items: {
                select: {
                    name: true,
                    quantity: true,
                    totalPrice: true
                }
            }
        }
    });

    if (!credit) {
        return fail(404, {message: "Credit Not Found!"})
    }

    return { credit, creditor };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params, locals }) => {
        const userId = locals.user.id;
        const creditorId = params.id;
        const creditId = params.creditId;

        const creditor = await prisma.creditor.findFirst({ where: {
            id: creditorId,
            userId: userId
        } });
        console.log(creditor);

        if (!creditor) {
            return fail(404, {message: "Creditor not found!"})
        }

        const credit = await prisma.credit.findFirst({ where: { id: creditId } });
        if(!credit) {
            return fail(404, {message: "Credit doesn't exist!"})
        }
        console.log(creditId);

        try {
            await prisma.item.deleteMany({
                where: {
                    creditId: creditId
                }
            });

            await prisma.creditor.update({
                where: {
                    id: creditor.id
                },
                data: {
                    outstanding: {
                        decrement: credit.amtRemaining
                    }
                }
            });

            await prisma.credit.delete({
                where: {
                    id: credit.id
                }
            });

            console.log("Success");
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Credit deletion failed!"})
        }

        throw redirect(303, `/creditors/dashboard/${creditor.id}`)
    }
};