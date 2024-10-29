import { z } from 'zod';

const frequencyEnum = z.enum([
	'daily',
	'weekly',
	'fortnightly',
	'monthly',
	'quarterly',
	'annually'
]);

export const budgetItemSchema = z.object({
	name: z.string().min(2),
	amount: z.number().positive(),
	frequency: frequencyEnum,
	category: z.string().min(2),
	type: z.enum(['income', 'expense', 'savings'])
});

export const liabilitySchema = z.object({
	name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
	balance: z
		.number()
		.positive('Amount must be positive')
		.multipleOf(0.01, 'Amount can have up to 2 decimal places'),
	interestRate: z
		.number()
		.min(0, 'Interest rate cannot be negative')
		.max(1, 'Interest rate cannot exceed 100%'),
	repaymentAmount: z
		.number()
		.positive('Repayment amount must be positive')
		.multipleOf(0.01, 'Repayment amount can have up to 2 decimal places'),
	repaymentFrequency: frequencyEnum,
	type: z.enum([
		'credit_card',
		'home_loan',
		'car_loan',
		'personal_loan',
		'student_loan',
		'line_of_credit',
		'business_loan',
		'investment_loan',
		'other'
	])
});

export const assetSchema = z.object({
	name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
	value: z
		.number()
		.positive('Amount must be positive')
		.multipleOf(0.01, 'Amount can have up to 2 decimal places, e.g. 1234.56'),
	type: z.enum([
		'cash/savings',
		'shares/ETFs',
		'cryptocurrency',
		'superannuation',
		'car',
		'property',
		'other'
	])
});
