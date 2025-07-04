import { prisma } from "$lib/server/prisma.js";
import { redirect } from "@sveltejs/kit";

// Load creditors list for the logged in user
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