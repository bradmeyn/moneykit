export const formatAsPercentage = (value: number): string => {
	return `${value.toLocaleString(undefined, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 2
	})}%`;
};

export const parsePercentage = (value: string): number => {
	// Remove % and any commas, then parse
	const cleanValue = value.replace(/[%,]/g, '');
	const parsed = parseFloat(cleanValue) / 100;
	return isNaN(parsed) ? 0 : parsed;
};
export const formatAsCurrency = (value: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(value);
};
// Parse currency string to number
export const parseCurrency = (value: string): number => {
	// Remove all non-numeric characters except decimal point
	const cleanValue = value.replace(/[$,]/g, '');
	const parsed = parseFloat(cleanValue);
	return isNaN(parsed) ? 0 : parsed;
};

export function formatAsNumber(value: number, includeCents: boolean = false): string {
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: includeCents ? 2 : 0,
		maximumFractionDigits: includeCents ? 2 : 0
	};

	return new Intl.NumberFormat('en-US', options).format(value);
}

const assetAllocationLabels = {
	ausEquities: 'Aus Equities',
	intEquities: 'Int Equities',
	ausProperty: 'Aus Property',
	intProperty: 'Int Property',
	ausBonds: 'Aus Bonds',
	intBonds: 'Int Bonds',
	cash: 'Cash'
};

export function getReadableLabel(key: string): string {
	// @ts-expect-error - TS doesn't know that the key will be a valid key of AssetAllocation
	if (!assetAllocationLabels[key]) {
		return key;
	}
	// @ts-expect-error - TS doesn't know that the key will be a valid key of AssetAllocation
	return assetAllocationLabels[key];
}

export function getFrequencyLabel(frequency: number) {
	switch (frequency) {
		case 1:
			return 'Yearly';
		case 2:
			return 'Half-yearly';
		case 4:
			return 'Quarterly';
		case 12:
			return 'Monthly';
		case 26:
			return 'Fortnightly';
		default:
	}
}
