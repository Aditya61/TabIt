import { redirect } from "@sveltejs/kit";

export function GET({ cookies }) {
    cookies.delete('jwt', { path: '/' });
    throw redirect(302, '/login');
}