import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import db from '$lib/prisma';
import type { Actions } from '@sveltejs/kit';
import { loginSchema } from '$lib/schemas';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		// Validate the form data using Zod
		const result = loginSchema.safeParse({ email, password });

		if (!result.success) {
			// If validation fails, return the errors
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data: { email, password }
			});
		}

		const validatedData = result.data;

		try {
			// Find the user by email
			const user = await db.user.findUnique({ where: { email: validatedData.email } });

			// If the user does not exist, return an error
			if (!user) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}

			// Compare the password
			const passwordMatch = await bcrypt.compare(validatedData.password, user.password);

			// If the password does not match, return an error
			if (!passwordMatch) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}

			// Set session data
			cookies.set('session', JSON.stringify({ userId: user.id, email: user.email }), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});

			// Redirect to a protected route or dashboard
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, { error: 'An error occurred during login' });
		}

		return redirect(303, '/dashboard');
	}
};
