import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export const registerSchema = z.object({
	...loginSchema.shape,
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	confirmPassword: z.string().min(6)
});
