import { requireAuth } from '$lib/server/authGuard.js';

// Authenticate protected routes excluding unprotected ones
export async function load({ locals, url }) {
    if (!['/login', '/signup', '/logout', '/'].includes(url.pathname)) {
        requireAuth(locals);
    }
    return { user: locals.user };
}