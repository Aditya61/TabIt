import { prisma } from "$lib/server/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

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
            phone: true,
            outstanding: true,
            credits: {
                orderBy: { date: 'desc' },
                select: {
                    id: true,
                    amtRemaining: true,
                    date: true
                }
            }
        }
    });

    if (!creditor) {
        return fail(404, {message: "Creditor Not Found!"});
    }

    return { creditor };
}