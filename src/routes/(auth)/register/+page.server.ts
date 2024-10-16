import type { Actions, Action } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { registerSchema } from '$lib/schemas/auth';
import { createUser, getUserByEmail } from '$lib/server/services/user';

export const actions: Actions = {
	default: (async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = registerSchema.safeParse(formData);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid data'
			});
		}

		const { firstName, lastName, email, password } = result.data;

		try {
			const existingUser = await getUserByEmail(email);

			if (existingUser) {
				return fail(400, {
					error: 'An account with this email already exists'
				});
			}

			// Create the user
			const newUser = await createUser({
				firstName,
				lastName,
				email,
				password
			});

			// Set session data
			cookies.set('session', JSON.stringify({ userId: newUser.id }), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, {
				error: 'An error occurred while registering'
			});
		}

		// Redirect to a protected route or dashboard
		return redirect(303, '/');
	}) satisfies Action
};
