import { prisma } from "$lib/server/prisma.js";
import { fail, redirect } from "@sveltejs/kit";

// Load creditor's editable fields
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

    return { user, creditor };
}

/** @type {import('./$types').Actions} */
export const actions = {
    // Update creditor's name/phone
    update: async ({ request, params, locals }) => {
        const userId = locals.user?.id;
        if (!userId) {
            throw redirect(302, '/login');
        }

        const creditorId = params.id;
        const formData = await request.formData();
        const name = formData.get('name')?.trim();
        const phone = formData.get('phone')?.trim();

        // Validate input
        if (!name || !phone) {
            return fail(400, {message: "All fields are required!"});
        }

        const creditor = await prisma.creditor.findFirst({
            where: { id: creditorId, userId: userId }
        });

        if (!creditor) {
            return fail(404, {message: "Creditor not found!"});
        }

        // Check for another creditor with the same name for this user
        const existingCreditor = await prisma.creditor.findFirst({
            where: {
                name,
                userId,
                NOT: { id: creditorId }
            }
        });

        if (existingCreditor) {
            return fail(409, {message: "Creditor exists with same name!"});
        }

        try {
            await prisma.creditor.update({
                where: { id: creditorId },
                data: {
                    name: name,
                    phone: phone
                }
            });
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Creditor update failed!"});
        }

        throw redirect(303, `/creditors/dashboard/${creditorId}`);
    },

    // Delete creditor along with every credit, payment, item and outstanding log tied to it
    delete: async ({ params, locals }) => {
        const userId = locals.user?.id;
        if (!userId) {
            throw redirect(302, '/login');
        }

        const creditorId = params.id;

        const creditor = await prisma.creditor.findFirst({
            where: { id: creditorId, userId: userId }
        });

        if (!creditor) {
            return fail(404, {message: "Creditor not found!"});
        }

        try {
            await prisma.$transaction(async (tx) => {
                const credits = await tx.credit.findMany({
                    where: { creditorId: creditorId },
                    select: { id: true }
                });
                const creditIds = credits.map((credit) => credit.id);

                const payments = await tx.payment.findMany({
                    where: { creditorId: creditorId },
                    select: { id: true }
                });
                const paymentIds = payments.map((payment) => payment.id);

                // Items only ever belong to a credit
                await tx.item.deleteMany({
                    where: { creditId: { in: creditIds } }
                });

                // Outstanding logs can point to either a credit or a payment
                await tx.outstandingLog.deleteMany({
                    where: {
                        OR: [
                            { creditId: { in: creditIds } },
                            { paymentId: { in: paymentIds } }
                        ]
                    }
                });

                await tx.credit.deleteMany({ where: { creditorId: creditorId } });
                await tx.payment.deleteMany({ where: { creditorId: creditorId } });
                await tx.creditor.delete({ where: { id: creditorId } });
            });
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Creditor deletion failed!"});
        }

        throw redirect(303, '/creditors');
    }
};
