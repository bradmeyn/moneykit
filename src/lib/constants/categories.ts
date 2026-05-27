export const ASSET_CATEGORIES = {
	property: 'Property',
	car: 'Car',
	savings: 'Savings',
	investments: 'Investments',
	other: 'Other'
} as const;
export type AssetCategory = keyof typeof ASSET_CATEGORIES;

export const OWNERS = {
	brad: 'Brad',
	emily: 'Emily',
	joint: 'Joint'
} as const;
export type Owner = keyof typeof OWNERS;
