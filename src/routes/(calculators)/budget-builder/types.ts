import type { FrequencyType } from '$lib/constants/frequencies';

export type BudgetItem = {
	id: number;
	name: string;
	amount: number;
	category: string;
	frequency: FrequencyType;
	type: 'Income' | 'Expense' | 'Savings';
};
