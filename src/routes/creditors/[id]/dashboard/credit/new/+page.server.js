import { prisma } from  "$lib/server/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();

        const creditorId = params.id;

        const names = formData.getAll('items[][name]');
        const quantities = formData.getAll('items[][quantity]');
        const totalPrices = formData.getAll('items[][totalPrice]');

        const items = names.map((_, i) => ({
            name: names[i],
            quantity: parseFloat(quantities[i]),
            totalPrice: parseFloat(totalPrices[i])
        }));

        if (!items?.length) {
            return fail(400, {message: "All fields are required!"});
        }

        const amount = items.reduce((sum, item) => {
            return sum + item.totalPrice;
        }, 0)

        try {
            const credit = await prisma.credit.create({
                data: {
                    amtRemaining: amount,
                    creditorId: creditorId,
                    items: {
                        create: items
                    }
                }
            });

            await prisma.creditor.update({
                where: { id: creditorId },
                data: {
                    outstanding: {
                        increment: amount
                    }
                }
            })
        } catch(err) {
            console.log("Here's the issue")
            console.log(err.message);
            return fail(500, {message: "Credit Entry Failed!"})
        }

        throw redirect(303, `/creditors/${creditorId}/dashboard`);
    }
};