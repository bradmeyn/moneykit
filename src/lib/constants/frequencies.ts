export const FREQUENCIES = {
	weekly: { label: 'Weekly', value: 52 },
	fortnightly: { label: 'Fortnightly', value: 26 },
	monthly: { label: 'Monthly', value: 12 },
	quarterly: { label: 'Quarterly', value: 4 },
	half_yearly: { label: 'Half Yearly', value: 2 },
	annually: { label: 'Annually', value: 1 }
} as const;

// Define the type based on the object keys
export type FrequencyType = keyof typeof FREQUENCIES;

// Now type the enum array
export const FREQUENCY_ENUM = Object.keys(FREQUENCIES) as FrequencyType[];
