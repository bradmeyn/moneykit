import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';

export type BudgetItem = {
	id: number;
	name: string;
	amount: number;
	category: string;
	frequency: FrequencyType;
	type: 'Income' | 'Expense' | 'Savings';
};

export function convertToFrequency(
	amount: number,
	fromFrequency: FrequencyType,
	toFrequency: FrequencyType
) {
	const annualAmount = amount * FREQUENCIES[fromFrequency].value;
	return annualAmount / FREQUENCIES[toFrequency].value;
}

export function calculateCategoryTotal(
	items: BudgetItem[],
	category: string,
	toFrequency: FrequencyType
): number {
	const annualTotal = items
		.filter((item) => item.category === category)
		.reduce((acc, item) => acc + item.amount * FREQUENCIES[item.frequency].value, 0);

	return convertToFrequency(annualTotal, 'annually', toFrequency);
}

export function createBudget() {
	let frequency = $state<FrequencyType>('monthly');

	const budgetItems = $state<BudgetItem[]>([
		{
			id: 1,
			name: 'Salary',
			amount: 1000,
			category: 'Wages & Salary',
			frequency: 'monthly',
			type: 'Income'
		},
		{
			id: 2,
			name: 'Bonus',
			amount: 500,
			category: 'Wages & Salary',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: 2,
			name: 'Rental Income',
			amount: 500,
			category: 'Investments',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: 2,
			name: 'Interest',
			amount: 500,
			category: 'Investments',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: 2,
			name: 'Dividends & Distributions',
			amount: 500,
			category: 'Investments',
			frequency: 'quarterly',
			type: 'Income'
		},
		{
			id: 2,
			name: 'Capital Gains',
			amount: 500,
			category: 'Investments',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: 1,
			name: 'Rent/Mortgage',
			amount: 100,
			category: 'Housing & Utilities',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 11,
			name: 'Rates',
			amount: 300,
			category: 'Housing & Utilities',
			frequency: 'quarterly',
			type: 'Expense'
		},
		{
			id: 12,
			name: 'Water',
			amount: 100,
			category: 'Housing & Utilities',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 11,
			name: 'Electricity & Gas',
			amount: 300,
			category: 'Housing & Utilities',
			frequency: 'quarterly',
			type: 'Expense'
		},
		{
			id: 11,
			name: 'Internet & Phone',
			amount: 120,
			category: 'Housing & Utilities',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 2,
			name: 'Groceries',
			amount: 50,
			category: 'Food',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: 30,
			name: 'Takeaway',
			amount: 50,
			category: 'Food',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: 3,
			name: 'Gym Membership',
			amount: 30,
			category: 'Health',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 4,
			name: 'Fuel',
			amount: 50,
			category: 'Car',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: 40,
			name: 'Registration',
			amount: 50,
			category: 'Car',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: 41,
			name: 'Insurance',
			amount: 1200,
			category: 'Car',
			frequency: 'annually',
			type: 'Expense'
		},
		{
			id: 42,
			name: 'Maintenance',
			amount: 200,
			category: 'Car',
			frequency: 'annually',
			type: 'Expense'
		},
		{
			id: 5,
			name: 'Streaming Services',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 5,
			name: 'Hobbies',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 5,
			name: 'Eating Out',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 5,
			name: 'Alcohol',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: 2,
			name: 'Vacation Fund',
			amount: 50,
			category: 'Cash Savings',
			frequency: 'annually',
			type: 'Savings'
		},
		{
			id: 3,
			name: 'Retirement Fund',
			amount: 200,
			category: 'Superannuation',
			frequency: 'monthly',
			type: 'Savings'
		},
		{
			id: 4,
			name: 'ETF Portfolio',
			amount: 200,
			category: 'Investments',
			frequency: 'monthly',
			type: 'Savings'
		}
	]);

	// Items by type
	const income = $derived<BudgetItem[]>(budgetItems.filter((i) => i.type === 'Income'));
	const expenses = $derived<BudgetItem[]>(budgetItems.filter((i) => i.type === 'Expense'));
	const savings = $derived<BudgetItem[]>(budgetItems.filter((i) => i.type === 'Savings'));

	// Categories
	const incomeCategories = $state<string[]>([...new Set(income.map((i) => i.category))]);
	const expenseCategories = $state<string[]>([...new Set(expenses.map((i) => i.category))]);
	const savingsCategories = $state<string[]>([...new Set(savings.map((i) => i.category))]);

	// Frequency-adjusted items
	const adjustedIncome = $derived<BudgetItem[]>(
		income.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, frequency)
		}))
	);

	const adjustedExpenses = $derived<BudgetItem[]>(
		expenses.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, frequency)
		}))
	);

	const adjustedSavings = $derived<BudgetItem[]>(
		savings.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, frequency)
		}))
	);

	const expenseByCategory = $derived<{ category: string; total: number }[]>(
		expenseCategories.map((category) => {
			const categoryExpenses = adjustedExpenses.filter((i) => i.category === category);
			const total = categoryExpenses.reduce((acc, i) => acc + i.amount, 0);
			return { category, total };
		})
	);

	// Calculate totals for current frequency
	const totalIncome = $derived<number>(adjustedIncome.reduce((acc, i) => acc + i.amount, 0));
	const totalExpenses = $derived<number>(adjustedExpenses.reduce((acc, i) => acc + i.amount, 0));
	const totalSavings = $derived<number>(adjustedSavings.reduce((acc, i) => acc + i.amount, 0));
	const unallocated = $derived<number>(totalIncome - totalExpenses - totalSavings);

	function addBudgetItem(item: BudgetItem) {
		budgetItems.push(item);
	}

	return {
		// Budget Frequency
		get frequency() {
			return frequency;
		},
		set frequency(value: FrequencyType) {
			frequency = value;
		},

		get budgetItems() {
			return budgetItems;
		},

		get income() {
			return income;
		},

		get expenses() {
			return expenses;
		},

		get savings() {
			return savings;
		},

		get incomeCategories() {
			return incomeCategories;
		},
		get expenseCategories() {
			return expenseCategories;
		},
		get savingsCategories() {
			return savingsCategories;
		},
		get expenseByCategory() {
			return expenseByCategory;
		},

		// Totals
		get totalIncome() {
			return totalIncome;
		},
		get totalExpenses() {
			return totalExpenses;
		},
		get totalSavings() {
			return totalSavings;
		},

		get unallocated() {
			return unallocated;
		},

		addBudgetItem
	};
}
