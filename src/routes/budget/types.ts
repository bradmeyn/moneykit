export type BudgetItem = {
	id: number;
	name: string;
	amount: number;
	category: string;
	frequency: number;
	type: 'Income' | 'Expense' | 'Savings'
};
