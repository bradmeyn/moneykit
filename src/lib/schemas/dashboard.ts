import { z } from 'zod';

const frequencyEnum = z.enum(['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually']);

export const budgetItemSchema = z.object({
	name: z.string().min(2),
	amount: z.number().positive(),
	frequency: frequencyEnum,
	category: z.string().min(2),
	type: z.enum(['income', 'expense', 'savings'])
});

export const liabilitySchema = z.object({
	name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
	amount: z.number().int('Amount must be a whole number').positive('Amount must be positive'),
	interestRate: z
		.number()
		.min(0, 'Interest rate cannot be negative')
		.max(100, 'Interest rate cannot exceed 100%')
		.multipleOf(0.01, 'Interest rate can have up to 2 decimal places'),
	repaymentAmount: z
		.number()
		.positive('Repayment amount must be positive')
		.multipleOf(0.01, 'Repayment amount can have up to 2 decimal places'),
	repaymentFrequency: frequencyEnum,
	remainingTerm: z
		.number()
		.int('Remaining term must be a whole number')
		.min(0, 'Remaining term cannot be negative')
});

export const assetSchema = z.object({
	name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
	amount: z.number().int('Amount must be a whole number').positive('Amount must be positive')
});
