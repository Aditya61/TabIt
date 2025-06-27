import { redirect } from "@sveltejs/kit";

export function GET({ cookies }) {
    cookies.delete('jwt', { 
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    throw redirect(302, '/login');
}