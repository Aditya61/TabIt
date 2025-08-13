import { prisma } from "$lib/server/prisma.js";
import { redirect } from "@sveltejs/kit";
import { generateToken } from '$lib/server/auth';

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals }) {
    const user = locals.user;
    if (!user) {
        throw redirect(302, '/login');
    }

    return { user };
}


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const userId = formData.get('userId');
        const businessName = formData.get('businessName');
        const remember = true;

        // Check for user record
        const user = await prisma.user.update({ 
            where: { 
                id: userId
            },
            data: {
                businessName: businessName
            }
        });

        // Generate JWT and set it as HTTP-only cookie
        const token = generateToken({ id: user.id, name:user.name, phone: user.phone, businessName: user.businessName }, remember);

        cookies.set('jwt', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60
        });

        throw redirect(302, '/profile');
    }
};