import { prisma } from "$lib/server/prisma.js";
import { fail } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const creditId = params.creditId;
    const creditorId = params.id;

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

    return { credit };
}