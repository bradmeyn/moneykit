import { z } from 'zod';

export const budgetItemSchema = z.object({
	name: z.string().min(2),
	amount: z.number().positive(),
	frequency: z.enum([
		'daily',
		'weekly',
		'fortnightly',
		'monthly',
		'quarterly',
		'half-yearly',
		'annually'
	]),
	category: z.string().min(2),
	type: z.enum(['income', 'expense', 'savings'])
});
