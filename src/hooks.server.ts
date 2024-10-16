import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Initialize userId as null
	event.locals.userId = null;

	// Get the session cookie
	const sessionCookie = event.cookies.get('session');

	if (sessionCookie) {
		try {
			// Parse the JSON stored in the cookie
			const sessionData = JSON.parse(sessionCookie);

			console.log('sessionData', sessionData);

			// If userId exists in the parsed data, set it in locals
			if (sessionData && sessionData.userId) {
				event.locals.userId = sessionData.userId;
			}
		} catch (error) {
			// If there's an error parsing the cookie, log it and continue without setting userId
			console.error('Error parsing session cookie:', error);
		}
	}

	// You can add additional checks or logic here if needed

	const response = await resolve(event);
	return response;
};
