import { command, form, query } from '$app/server';
import { z } from 'zod';
import { getCurrentUser } from '$lib/remotes/auth.remote';
import { db } from '$db';
import { incomeTable } from '$db/schemas/budget';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const getIncomes = query(async () => {
	const user = await getCurrentUser();
	if (!user) error(401, 'Unauthorized');
	return db.query.incomeTable.findMany({
		where: eq(incomeTable.userId, user.id),
		orderBy: (t, { desc }) => desc(t.amount)
	});
});

export const addIncome = form(
	z.object({
		name: z.string().min(1, 'Name is required'),
		amount: z.coerce.number().positive('Amount must be positive'),
		frequency: z.enum(['weekly', 'fortnightly', 'monthly', 'quarterly', 'yearly']),
		category: z.string()
	}),
	async (data) => {
		const user = await getCurrentUser();
		if (!user) error(401, 'Unauthorized');
		await db.insert(incomeTable).values({
			userId: user.id,
			name: data.name,
			amount: Math.round(data.amount * 100),
			frequency: data.frequency,
			category: data.category || null
		});
		await getIncomes().refresh();
		return { success: true };
	}
);

export const updateIncome = form(
	z.object({
		id: z.string(),
		name: z.string().min(1, 'Name is required'),
		amount: z.coerce.number().positive('Amount must be positive'),
		frequency: z.enum(['weekly', 'fortnightly', 'monthly', 'quarterly', 'yearly']),
		category: z.string()
	}),
	async (data) => {
		const user = await getCurrentUser();
		if (!user) error(401, 'Unauthorized');
		const income = await db.query.incomeTable.findFirst({ where: eq(incomeTable.id, data.id) });
		if (!income) error(404, 'Income not found');
		if (income.userId !== user.id) error(403, 'Forbidden');
		await db
			.update(incomeTable)
			.set({
				name: data.name,
				amount: Math.round(data.amount * 100),
				frequency: data.frequency,
				category: data.category || null
			})
			.where(eq(incomeTable.id, data.id));
		await getIncomes().refresh();
		return { success: true };
	}
);

export const deleteIncome = command(z.object({ id: z.string() }), async ({ id }) => {
	const user = await getCurrentUser();
	if (!user) error(401, 'Unauthorized');
	const income = await db.query.incomeTable.findFirst({ where: eq(incomeTable.id, id) });
	if (!income) error(404, 'Income not found');
	if (income.userId !== user.id) error(403, 'Forbidden');
	await db.delete(incomeTable).where(eq(incomeTable.id, id));
	await getIncomes().refresh();
	return { success: true };
});
