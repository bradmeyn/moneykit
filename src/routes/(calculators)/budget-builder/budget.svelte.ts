import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { v4 as uuidv4 } from 'uuid';
import { setContext, getContext } from 'svelte';

export type BudgetItem = {
	id: string;
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

class Budget {
	frequency = $state<FrequencyType>('monthly');

	budgetItems = $state<BudgetItem[]>([
		{
			id: uuidv4(),
			name: 'Salary',
			amount: 1000,
			category: 'Wages & Salary',
			frequency: 'monthly',
			type: 'Income'
		},
		{
			id: uuidv4(),
			name: 'Bonus',
			amount: 500,
			category: 'Wages & Salary',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: uuidv4(),
			name: 'Rental Income',
			amount: 500,
			category: 'Investments',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: uuidv4(),
			name: 'Interest',
			amount: 500,
			category: 'Investments',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: uuidv4(),
			name: 'Dividends & Distributions',
			amount: 500,
			category: 'Investments',
			frequency: 'quarterly',
			type: 'Income'
		},
		{
			id: uuidv4(),
			name: 'Capital Gains',
			amount: 500,
			category: 'Investments',
			frequency: 'annually',
			type: 'Income'
		},
		{
			id: uuidv4(),
			name: 'Rent/Mortgage',
			amount: 100,
			category: 'Housing & Utilities',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Rates',
			amount: 300,
			category: 'Housing & Utilities',
			frequency: 'quarterly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Water',
			amount: 100,
			category: 'Housing & Utilities',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Electricity & Gas',
			amount: 300,
			category: 'Housing & Utilities',
			frequency: 'quarterly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Internet & Phone',
			amount: 120,
			category: 'Housing & Utilities',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Groceries',
			amount: 50,
			category: 'Food',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Takeaway',
			amount: 50,
			category: 'Food',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Gym Membership',
			amount: 30,
			category: 'Health',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Fuel',
			amount: 50,
			category: 'Car',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Registration',
			amount: 50,
			category: 'Car',
			frequency: 'weekly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Insurance',
			amount: 1200,
			category: 'Car',
			frequency: 'annually',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Maintenance',
			amount: 200,
			category: 'Car',
			frequency: 'annually',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Streaming Services',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Hobbies',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Eating Out',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Alcohol',
			amount: 10,
			category: 'Entertainment & Leisure',
			frequency: 'monthly',
			type: 'Expense'
		},
		{
			id: uuidv4(),
			name: 'Vacation Fund',
			amount: 50,
			category: 'Cash Savings',
			frequency: 'annually',
			type: 'Savings'
		},
		{
			id: uuidv4(),
			name: 'Retirement Fund',
			amount: 200,
			category: 'Superannuation',
			frequency: 'monthly',
			type: 'Savings'
		},
		{
			id: uuidv4(),
			name: 'ETF Portfolio',
			amount: 200,
			category: 'Investments',
			frequency: 'monthly',
			type: 'Savings'
		}
	]);

	// Items by type
	income = $derived<BudgetItem[]>(this.budgetItems.filter((i) => i.type === 'Income'));
	expenses = $derived<BudgetItem[]>(this.budgetItems.filter((i) => i.type === 'Expense'));
	savings = $derived<BudgetItem[]>(this.budgetItems.filter((i) => i.type === 'Savings'));

	// Categories
	incomeCategories = $state<string[]>([...new Set(this.income.map((i) => i.category))]);
	expenseCategories = $state<string[]>([...new Set(this.expenses.map((i) => i.category))]);
	savingsCategories = $state<string[]>([...new Set(this.savings.map((i) => i.category))]);

	// Frequency-adjusted items
	adjustedIncome = $derived<BudgetItem[]>(
		this.income.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, this.frequency)
		}))
	);
	adjustedExpenses = $derived<BudgetItem[]>(
		this.expenses.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, this.frequency)
		}))
	);
	adjustedSavings = $derived<BudgetItem[]>(
		this.savings.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, this.frequency)
		}))
	);

	expenseByCategory = $derived<{ category: string; total: number }[]>(
		this.expenseCategories.map((category) => {
			const categoryExpenses = this.adjustedExpenses.filter((i) => i.category === category);
			const total = categoryExpenses.reduce((acc, i) => acc + i.amount, 0);
			return { category, total };
		})
	);

	// Calculate totals for current frequency
	totalIncome = $derived<number>(this.adjustedIncome.reduce((acc, i) => acc + i.amount, 0));
	totalExpenses = $derived<number>(this.adjustedExpenses.reduce((acc, i) => acc + i.amount, 0));
	totalSavings = $derived<number>(this.adjustedSavings.reduce((acc, i) => acc + i.amount, 0));
	unallocated = $derived<number>(this.totalIncome - this.totalExpenses - this.totalSavings);

	addItem(item: BudgetItem) {
		this.budgetItems.push(item);
	}

	removeItem(id: string) {
		const index = this.budgetItems.findIndex((i) => i.id === id);
		if (index !== -1) {
			this.budgetItems.splice(index, 1);
		}
	}

	updateItem(item: BudgetItem) {
		const index = this.budgetItems.findIndex((i) => i.id === item.id);
		if (index !== -1) {
			this.budgetItems[index] = item;
		}
	}

	getDownloadData() {
		// Sort items by type
		const income = this.budgetItems.filter((item) => item.type === 'Income');
		const expenses = this.budgetItems.filter((item) => item.type === 'Expense');
		const savings = this.budgetItems.filter((item) => item.type === 'Savings');

		const headers = [
			'Type',
			'Name',
			'Category',
			'Amount',
			'Frequency',
			'Monthly Total',
			'Annual Total'
		];
		const rows: (string | number)[][] = [];

		// Helper function to add items of a specific type
		function addItemsToRows(items: BudgetItem[], type: string) {
			if (items.length > 0) {
				rows.push([type]); // Add type header

				items.forEach((item) => {
					const monthlyAmount = convertToFrequency(item.amount, item.frequency, 'monthly');
					const annualAmount = convertToFrequency(item.amount, item.frequency, 'annually');

					rows.push([
						'', // Empty cell for indentation
						item.name,
						item.category,
						item.amount,
						item.frequency,
						Number(monthlyAmount.toFixed(2)),
						Number(annualAmount.toFixed(2))
					]);
				});

				// Add total for this type
				const monthlyTotal = items.reduce(
					(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
					0
				);
				const annualTotal = items.reduce(
					(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
					0
				);
				rows.push([
					`${type} Total`,
					'',
					'',
					'',
					'',
					Number(monthlyTotal.toFixed(2)),
					Number(annualTotal.toFixed(2))
				]);
				rows.push([]); // Add empty line between sections
			}
		}

		// Add all item types
		addItemsToRows(income, 'Income');
		addItemsToRows(expenses, 'Expenses');
		addItemsToRows(savings, 'Savings');

		// Calculate unallocated funds
		const monthlyIncome = income.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
			0
		);
		const monthlyExpenses = expenses.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
			0
		);
		const monthlySavings = savings.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
			0
		);
		const monthlyUnallocated = monthlyIncome - (monthlyExpenses + monthlySavings);

		const annualIncome = income.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
			0
		);
		const annualExpenses = expenses.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
			0
		);
		const annualSavings = savings.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
			0
		);
		const annualUnallocated = annualIncome - (annualExpenses + annualSavings);

		rows.push([
			'Unallocated',
			'',
			'',
			'',
			'',
			Number(monthlyUnallocated.toFixed(2)),
			Number(annualUnallocated.toFixed(2))
		]);

		return {
			headers,
			rows,
			filename: `budget-${new Date().toLocaleDateString('en-AU').split('/').join('-')}.csv`
		};
	}
}

const BUDGET_KEY = Symbol('budget');

export function setBudgetState() {
	return setContext(BUDGET_KEY, new Budget());
}

export function getBudgetState() {
	return getContext<Budget>(BUDGET_KEY);
}
