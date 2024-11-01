import { type ZodSchema } from 'zod';

type FieldErrors<T> = {
	[K in keyof T]?: string[];
};

interface ValidationResult<T> {
	success: boolean;
	data?: T;
	fieldErrors?: FieldErrors<T>;
	formErrors?: string[];
}

export const validateFormData = <T>(
	formData: FormData | Record<string, unknown>,
	schema: ZodSchema<T>
): ValidationResult<T> => {
	// Convert FormData to plain object if needed
	const data = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;

	// Parse data through schema
	const result = schema.safeParse(data);

	if (result.success) {
		return {
			success: true,
			data: result.data
		};
	}

	// Process validation errors
	const fieldErrors: FieldErrors<T> = {};
	const formErrors: string[] = [];

	result.error.errors.forEach((error) => {
		const path = error.path[0];
		if (path) {
			const field = String(path);
			if (!fieldErrors[field as keyof T]) {
				fieldErrors[field as keyof T] = [];
			}
			fieldErrors[field as keyof T]?.push(error.message);
		} else {
			formErrors.push(error.message);
		}
	});

	return {
		success: false,
		fieldErrors,
		formErrors
	};
};

// Helper to check if a specific field has errors
export const hasFieldError = <T>(fieldName: keyof T, fieldErrors?: FieldErrors<T>): boolean => {
	return Boolean(fieldErrors?.[fieldName]?.length);
};

// Helper to get error messages for a specific field
export const getFieldErrors = <T>(fieldName: keyof T, fieldErrors?: FieldErrors<T>): string[] => {
	return fieldErrors?.[fieldName] || [];
};
