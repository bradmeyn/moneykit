import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { liabilitySchema } from '$lib/schemas/dashboard';
import { db } from '$db/index';
import { liabilities } from '$db/schema';

export const actions: Actions = {
	addLiability: async ({ request, locals }) => {
		const { userId } = locals;
		if (!userId) {
			return fail(401, { error: 'Unauthorized' });
		}

		// Get form data and parse numbers
		const formData = Object.fromEntries(await request.formData());
		const parsedData = {
			...formData,
			amount: Number(formData.amount),
			interestRate: Number(formData.interestRate),
			repaymentAmount: Number(formData.repaymentAmount),
			remainingTerm: Number(formData.remainingTerm)
		};

		// Validate the data
		const result = liabilitySchema.safeParse(parsedData);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid data',
				issues: result.error.issues
			});
		}

		const { name, amount, interestRate, repaymentAmount, repaymentFrequency, remainingTerm } =
			result.data;

		try {
			// Check for existing liability with the same name
			const existingLiability = await db
				.select()
				.from(liabilities)
				.where(sql`name = ${name} AND user_id = ${userId}`)
				.limit(1);

			if (existingLiability.length > 0) {
				return fail(400, {
					error: 'A liability with this name already exists'
				});
			}

			// Create new liability
			const [newLiability] = await db
				.insert(liabilities)
				.values({
					name,
					amount,
					interestRate,
					repaymentAmount,
					repaymentFrequency,
					remainingTerm,
					userId
				})
				.returning();

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

// Load function to get existing liabilities
export const load = async ({ locals }) => {
	const { userId } = locals;
	if (!userId) {
		return {
			liabilities: []
		};
	}

	try {
		// const userLiabilities = await db
		//     .select()
		//     .from(liabilities)
		//     .where(sql`user_id = ${userId}`)
		//     .orderBy(liabilities.createdAt, 'desc');
		// return {
		// 	liabilities: userLiabilities
		// };
	} catch (error) {
		console.error('Error loading liabilities:', error);
		return {
			liabilities: [],
			error: 'Failed to load liabilities'
		};
	}
};
