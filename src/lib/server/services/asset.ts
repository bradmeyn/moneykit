import { and, eq } from 'drizzle-orm';
import { assets, type Asset, type NewAsset } from '$lib/server/db/schema';
import { db } from '$lib/server/db/index';

/**
 * Create a new asset for a user
 */
export async function createAsset(assetData: Omit<NewAsset, 'id' | 'createdAt'>): Promise<Asset> {
	const [newAsset] = await db.insert(assets).values(assetData).returning();
	return newAsset;
}

/**
 * Get an asset by its ID and user ID
 */
export async function getAssetById(id: string, userId: string): Promise<Asset | undefined> {
	const result = await db
		.select()
		.from(assets)
		.where(and(eq(assets.id, id), eq(assets.userId, userId)))
		.limit(1);
	return result[0];
}

/**
 * Get all assets for a user
 */
export async function getAssetsByUserId(userId: string): Promise<Asset[]> {
	return await db.select().from(assets).where(eq(assets.userId, userId)).orderBy(assets.createdAt);
}

/**
 * Update an asset
 */
export async function updateAsset(
	id: string,
	userId: string,
	assetData: Partial<Omit<NewAsset, 'id' | 'createdAt' | 'userId'>>
): Promise<Asset | undefined> {
	// Format numerical values if they exist
	if (assetData.value !== undefined) {
		assetData.value = Number(assetData.value).toFixed(2);
	}

	const [updatedAsset] = await db
		.update(assets)
		.set(assetData)
		.where(and(eq(assets.id, id), eq(assets.userId, userId)))
		.returning();
	return updatedAsset;
}

/**
 * Delete an asset
 */
export async function deleteAsset(id: string, userId: string): Promise<Asset | undefined> {
	const [deletedAsset] = await db
		.delete(assets)
		.where(and(eq(assets.id, id), eq(assets.userId, userId)))
		.returning();
	return deletedAsset;
}

/**
 * Check if an asset with the given name already exists for a user
 */
export async function getAssetByName(name: string, userId: string): Promise<Asset | undefined> {
	const result = await db
		.select()
		.from(assets)
		.where(and(eq(assets.name, name), eq(assets.userId, userId)))
		.limit(1);
	return result[0];
}

/**
 * Get total assets value for a user
 */
export async function getTotalAssets(userId: string): Promise<number> {
	const userAssets = await getAssetsByUserId(userId);
	return userAssets.reduce((total, asset) => total + Number(asset.value), 0);
}

/**
 * Get total assets value by type for a user
 */
export async function getTotalAssetsByType(userId: string): Promise<Record<string, number>> {
	const userAssets = await getAssetsByUserId(userId);
	return userAssets.reduce(
		(acc, asset) => {
			const type = asset.type;
			acc[type] = (acc[type] || 0) + Number(asset.value);
			return acc;
		},
		{} as Record<string, number>
	);
}
