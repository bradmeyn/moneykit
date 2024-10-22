import type { Actions, Action } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { budgetItemSchema } from '$lib/schemas/dashboard';
import { db } from '$db/index';
import { incomes, expenses, savings } from '$db/schema';
import { and, eq } from 'drizzle-orm';

export const actions: Actions = {
	addItem: (async ({ request, locals }) => {
		const { userId } = locals;
		if (!userId) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());
		const result = budgetItemSchema.safeParse(formData);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid data',
				issues: result.error.issues
			});
		}

		const { name, amount, frequency, category, type } = result.data;

		try {
			// Check for existing item
			let table;
			switch (type) {
				case 'income':
					table = incomes;
					break;
				case 'expense':
					table = expenses;
					break;
				case 'savings':
					table = savings;
					break;
				default:
					return fail(400, { error: 'Invalid type' });
			}

			const existingItem = await db
				.select()
				.from(table)
				.where(and(eq(table.category, category), eq(table.userId, userId)))
				.limit(1);

			if (existingItem.length > 0) {
				return fail(400, {
					error: 'A budget item with this name already exists'
				});
			}

			// Create new budget item
			const [newItem] = await db
				.insert(table)
				.values({
					name,
					amount,
					frequency,
					category,
					userId
				})
				.returning();

			return {
				success: true,
				message: `Successfully added new ${type} item`,
				item: newItem
			};
		} catch (error) {
			console.error('Add budget item error:', error);
			return fail(500, {
				error: 'An error occurred while adding the budget item'
			});
		}
	}) satisfies Action
};
