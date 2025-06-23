import { prisma } from "$lib/server/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.trim();
        const phone = formData.get('phone')?.trim();

        const userId = locals.user?.id;
        if (!userId) {
            throw redirect(302, '/login');
        }

        if (!name || !phone) {
            return fail(400, {message: "All fields are required!"});
        }

        const existingCreditor = await prisma.creditor.findFirst({ where: { name, userId } });
        if (existingCreditor) {
            return fail(409, {message: "Creditor exists with same name!"});
        }

        try {
            await prisma.creditor.create({
                data: {
                    name: name,
                    phone: phone,
                    userId: userId
                }
            });

            return {
                status: 200,
                success: "Creditor Added."
            }
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Creditor registration failed!"})
        }
    }
};