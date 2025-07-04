import { redirect } from "@sveltejs/kit";

// Authentication check and redirection for protected routes
export function requireAuth(locals) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }
}