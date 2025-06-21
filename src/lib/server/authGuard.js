import { redirect } from "@sveltejs/kit";

export function requireAuth(locals) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }
}