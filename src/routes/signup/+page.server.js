import bcrypt from 'bcrypt';
import { prisma } from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const phone = formData.get('phone');
        const password = formData.get('password');

        // Form Data Validation
        if (!name || !phone || !password) {
            return fail(400, {message: "All fields are required!"});
        }

        const existingUser = await prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            return fail(409, {message: "Phone number already registered!"});
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // DB Write
        try {
            await prisma.user.create({
                data: {
                    name: name,
                    phone: phone,
                    password: hashedPass
                }
            });

            return {
                status: 200,
                success: "User Signed Up."
            }
        } catch(err) {
            console.log(err.message);
            return fail(500, {message: "Sign Up Failed!"})
        }
    }
};