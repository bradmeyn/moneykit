export function formatAsPercentage(value: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 0,
		maximumFractionDigits: 3
	}).format(value);
}

export function formatAsCurrency(value: number, includeCents: boolean = false): string {
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: includeCents ? 2 : 0,
		maximumFractionDigits: includeCents ? 2 : 0
	};

	options.style = 'currency';
	options.currency = 'USD';

	return new Intl.NumberFormat('en-US', options).format(value);
}

export function formatAsNumber(value: number, includeCents: boolean = false): string {
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: includeCents ? 2 : 0,
		maximumFractionDigits: includeCents ? 2 : 0
	};

	return new Intl.NumberFormat('en-US', options).format(value);
}

// Function to parse the formatted value back to an integer
export function parseCurrency(value: string) {
	return parseInt(value.replace(/[^0-9]+/g, ''));
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
