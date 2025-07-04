import { verifyToken } from "$lib/server/auth";


// Hook to handle token verification and set up locals.user
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const token = event.cookies.get('jwt');

    if (token) {
        try {
            const user = verifyToken(token);
            event.locals.user = user;
        } catch(err) {
            console.error('Invalid token:', err.message);
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return resolve(event);
}