/** Normalise an amount at a given frequency to a monthly figure. */
export function toMonthly(amount: number, frequency: string): number {
	switch (frequency) {
		case 'weekly':
			return (amount * 52) / 12;
		case 'fortnightly':
			return (amount * 26) / 12;
		case 'quarterly':
			return amount / 3;
		case 'yearly':
			return amount / 12;
		default:
			return amount;
	}
}

/** Capitalise a frequency for display, e.g. "weekly" -> "Weekly". */
export function formatFrequency(frequency: string): string {
	return frequency.charAt(0).toUpperCase() + frequency.slice(1);
}
