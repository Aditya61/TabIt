import { prisma } from "$lib/server/prisma.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const creditors = await prisma.creditor.findMany({
        where: {
            userId: locals.user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return { creditors };
}