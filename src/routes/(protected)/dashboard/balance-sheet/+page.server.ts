import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { liabilitySchema, assetSchema } from '$lib/schemas/dashboard';
import type { PageServerLoad } from './$types';
import {
	createLiability,
	getLiabilitiesByUserId,
	getLiabilityByName
} from '$lib/server/services/liability';
import { createAsset, getAssetsByUserId, getAssetByName } from '$lib/server/services/asset';

export const load = (async ({ locals }) => {
	if (!locals.userId) {
		redirect(307, '/login');
	}
	const { userId } = locals;

	try {
		const [userLiabilities, userAssets] = await Promise.all([
			getLiabilitiesByUserId(userId),
			getAssetsByUserId(userId)
		]);

		return {
			liabilities: userLiabilities,
			assets: userAssets
		};
	} catch (error) {
		return {
			liabilities: [],
			assets: []
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	addAsset: async ({ request, locals }) => {
		const { userId } = locals;
		if (!userId) {
			return fail(401, { error: 'Unauthorized' });
		}

		// Get form data and parse numbers
		const data = Object.fromEntries(await request.formData());
		console.log('Form data:', data);
		const parsedData = {
			...data,
			value: +data.value
		};

		const validation = assetSchema.safeParse(parsedData);

		if (!validation.success) {
			console.log('Validation error:', validation.error);
			return fail(400, {
				error: 'Invalid data',
				issues: validation.error.issues
			});
		}

		try {
			// Check for existing asset with the same name
			const existingAsset = await getAssetByName(validation.data.name, userId);

			if (existingAsset) {
				return fail(400, {
					error: 'An asset with this name already exists'
				});
			}

			// Create new asset
			const newAsset = await createAsset({
				...validation.data,
				value: validation.data.value.toFixed(2),
				userId
			});

			return {
				success: true,
				message: 'Successfully added new asset',
				asset: newAsset
			};
		} catch (error) {
			console.error('Add asset error:', error);
			return fail(500, {
				error: 'An error occurred while adding the asset'
			});
		}
	},
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
