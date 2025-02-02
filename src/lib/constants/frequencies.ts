export const FREQUENCIES = {
	weekly: { label: 'Weekly', value: 52, singular: 'week' },
	fortnightly: { label: 'Fortnightly', value: 26, singular: 'fortnight' },
	monthly: { label: 'Monthly', value: 12, singular: 'month' },
	quarterly: { label: 'Quarterly', value: 4, singular: 'quarter' },
	half_yearly: { label: 'Half Yearly', value: 2, singular: 'half year' },
	annually: { label: 'Annually', value: 1, singular: 'year' }
} as const;

export type FrequencyType = keyof typeof FREQUENCIES;

export const FREQUENCY_ENUM = Object.keys(FREQUENCIES) as FrequencyType[];

export const REPAYMENT_FREQUENCIES = {
	weekly: { label: 'Weekly', value: 52, singular: 'week' },
	fortnightly: { label: 'Fortnightly', value: 26, singular: 'fortnight' },
	monthly: { label: 'Monthly', value: 12, singular: 'month' }
} as const;
