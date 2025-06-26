import bcrypt from 'bcrypt';
import { prisma } from '$lib/server/prisma.js';
import { fail, redirect } from '@sveltejs/kit';
import { generateToken } from '$lib/server/auth';
import { serialize } from 'cookie';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const phone = formData.get('phone');
        const password = formData.get('password');
        const remember = formData.get('remember') === 'on';

        if (!phone || !password) {
            return fail(400, {message: "All fields are required!"});
        }

        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return fail(401, {message: "Invalid phone or password!"});
        }

        // Generate JWT and set it as HTTP-only cookie
        const token = generateToken({id: user.id, name:user.name, phone: user.phone}, remember)

        cookies.set('jwt', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60
        });

        return redirect(303, "/creditors");
    }
};