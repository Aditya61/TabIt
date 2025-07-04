import { redirect } from "@sveltejs/kit";

// Delete jwt cookie and redirect to login
export function GET({ cookies }) {
    cookies.delete('jwt', { 
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    throw redirect(302, '/login');
}