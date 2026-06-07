import { z } from 'zod';

export const assetSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	amount: z
		.string()
		.min(1, 'Value must be positive')
		.refine((s) => !Number.isNaN(parseFloat(s)), 'Value must be a number')
		.transform((s) => parseFloat(s)),
	category: z.enum(['cash', 'property', 'vehicle', 'other']),
	owner: z.string().min(1, 'Owner is required')
});

export const updateAssetSchema = assetSchema.extend({
	id: z.string()
});

export const liabilitySchema = z.object({
	name: z.string().min(1, 'Name is required'),
	balance: z
		.string()
		.min(1, 'Balance must be positive')
		.refine((s) => !Number.isNaN(parseFloat(s)), 'Balance must be a number')
		.refine((s) => parseFloat(s) > 0, 'Balance must be positive')
		.transform((s) => parseFloat(s)),
	interestRate: z
		.string()
		.min(1, 'Interest rate is required')
		.refine((s) => !Number.isNaN(parseFloat(s)), 'Interest rate must be a number')
		.refine((s) => parseFloat(s) >= 0, 'Interest rate must be 0 or greater')
		.transform((s) => parseFloat(s)),
	category: z.enum(['mortgage', 'personal_loan', 'credit_card', 'other']),
	owner: z.string().min(1, 'Owner is required')
});

export const updateLiabilitySchema = liabilitySchema.extend({
	id: z.string()
});
