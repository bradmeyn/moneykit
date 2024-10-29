import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { liabilitySchema } from '$lib/schemas/dashboard';
import type { PageServerLoad } from './$types';
import {
	createLiability,
	getLiabilitiesByUserId,
	getLiabilityByName
} from '$lib/server/services/liability';

export const load = (async ({ locals }) => {
	if (!locals.userId) {
		redirect(307, '/login');
	}
	const { userId } = locals;

	try {
		const userLiabilities = await getLiabilitiesByUserId(userId);
		return {
			liabilities: userLiabilities
		};
	} catch (error) {
		return {
			liabilities: []
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	addLiability: async ({ request, locals }) => {
		const { userId } = locals;
		if (!userId) {
			return fail(401, { error: 'Unauthorized' });
		}

		// Get form data and parse numbers
		const data = Object.fromEntries(await request.formData());
		console.log('Form data:', data);
		const parsedData = {
			...data,
			balance: +data.balance,
			repaymentAmount: +data.repaymentAmount,
			interestRate: +data.interestRate / 100
		};

		const validation = liabilitySchema.safeParse(parsedData);

		if (!validation.success) {
			console.log('Validation error:', validation.error);
			return fail(400, {
				error: 'Invalid data',
				issues: validation.error.issues
			});
		}

		try {
			// Check for existing liability with the same name
			const existingLiability = await getLiabilityByName(validation.data.name, userId);

			if (existingLiability) {
				return fail(400, {
					error: 'A liability with this name already exists'
				});
			}

			// Create new liability
			const newLiability = await createLiability({
				...validation.data,
				balance: validation.data.balance.toFixed(2),
				interestRate: validation.data.interestRate.toFixed(4),
				repaymentAmount: validation.data.repaymentAmount.toFixed(2),
				userId
			});

			return {
				success: true,
				message: 'Successfully added new liability',
				liability: newLiability
			};
		} catch (error) {
			console.error('Add liability error:', error);
			return fail(500, {
				error: 'An error occurred while adding the liability'
			});
		}
	}
};
