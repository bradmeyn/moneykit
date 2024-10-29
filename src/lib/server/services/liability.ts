import { and, eq } from 'drizzle-orm';
import { liabilities, type Liability, type NewLiability } from '$lib/server/db/schema';
import { db } from '$lib/server/db/index';

/**
 * Create a new liability for a user
 */
export async function createLiability(
	liabilityData: Omit<NewLiability, 'id' | 'createdAt'>
): Promise<Liability> {
	const [newLiability] = await db.insert(liabilities).values(liabilityData).returning();
	return newLiability;
}

/**
 * Get a liability by its ID and user ID
 */
export async function getLiabilityById(id: string, userId: string): Promise<Liability | undefined> {
	const result = await db
		.select()
		.from(liabilities)
		.where(and(eq(liabilities.id, id), eq(liabilities.userId, userId)))
		.limit(1);
	return result[0];
}

/**
 * Get all liabilities for a user
 */
export async function getLiabilitiesByUserId(userId: string): Promise<Liability[]> {
	return await db
		.select()
		.from(liabilities)
		.where(eq(liabilities.userId, userId))
		.orderBy(liabilities.createdAt);
}

/**
 * Update a liability
 */
export async function updateLiability(
	id: string,
	userId: string,
	liabilityData: Partial<Omit<NewLiability, 'id' | 'createdAt' | 'userId'>>
): Promise<Liability | undefined> {
	// Format numerical values if they exist
	if (liabilityData.balance !== undefined) {
		liabilityData.balance = Number(liabilityData.balance).toFixed(2);
	}
	if (liabilityData.interestRate !== undefined) {
		liabilityData.interestRate = Number(liabilityData.interestRate).toFixed(4);
	}
	if (liabilityData.repaymentAmount !== undefined) {
		liabilityData.repaymentAmount = Number(liabilityData.repaymentAmount).toFixed(2);
	}

	const [updatedLiability] = await db
		.update(liabilities)
		.set(liabilityData)
		.where(and(eq(liabilities.id, id), eq(liabilities.userId, userId)))
		.returning();
	return updatedLiability;
}

/**
 * Delete a liability
 */
export async function deleteLiability(id: string, userId: string): Promise<Liability | undefined> {
	const [deletedLiability] = await db
		.delete(liabilities)
		.where(and(eq(liabilities.id, id), eq(liabilities.userId, userId)))
		.returning();
	return deletedLiability;
}

/**
 * Check if a liability with the given name already exists for a user
 */
export async function getLiabilityByName(
	name: string,
	userId: string
): Promise<Liability | undefined> {
	const result = await db
		.select()
		.from(liabilities)
		.where(and(eq(liabilities.name, name), eq(liabilities.userId, userId)))
		.limit(1);
	return result[0];
}

/**
 * Get total liability amount for a user
 */
export async function getTotalLiabilities(userId: string): Promise<number> {
	const userLiabilities = await getLiabilitiesByUserId(userId);
	return userLiabilities.reduce((total, liability) => total + Number(liability.balance), 0);
}
