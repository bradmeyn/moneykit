import type { BudgetItem } from './types';
import { FREQUENCIES } from '$lib/constants/frequencies';

export function createBudget() {
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
			category: 'Cash Reserves',
			frequency: 'annually',
			type: 'Savings'
		},
		{
			id: 3,
			name: 'Retirement Fund',
			amount: 200,
			category: 'Retirement & Investments',
			frequency: 'monthly',
			type: 'Savings'
		}
	]);

	const income = $derived<BudgetItem[]>(budgetItems.filter((i) => i.type === 'Income'));
	const expenses = $derived<BudgetItem[]>(budgetItems.filter((i) => i.type === 'Expense'));
	const savings = $derived<BudgetItem[]>(budgetItems.filter((i) => i.type === 'Savings'));

	const incomeCategories = $derived<string[]>([...new Set(income.map((i) => i.category))]);
	const expenseCategories = $derived<string[]>([...new Set(expenses.map((i) => i.category))]);
	const savingsCategories = $derived<string[]>([...new Set(savings.map((i) => i.category))]);

	const expenseByCategory = $derived<{ category: string; total: number }[]>(
		expenseCategories.map((category) => {
			const categoryExpenses = expenses.filter((i) => i.category === category);
			const total = categoryExpenses.reduce(
				(acc, i) => acc + i.amount * FREQUENCIES[i.frequency].value,
				0
			);
			return { category, total };
		})
	);

	const annualIncome = $derived<number>(
		income.reduce((acc, i) => acc + i.amount * FREQUENCIES[i.frequency].value, 0)
	);
	const annualExpenses = $derived<number>(
		expenses.reduce((acc, i) => acc + i.amount * FREQUENCIES[i.frequency].value, 0)
	);
	const annualSavings = $derived<number>(
		savings.reduce((acc, i) => acc + i.amount * FREQUENCIES[i.frequency].value, 0)
	);
	const unallocated = $derived<number>(annualIncome - annualExpenses - annualSavings);

	return {
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
		get annualIncome() {
			return annualIncome;
		},
		get annualExpenses() {
			return annualExpenses;
		},
		get annualSavings() {
			return annualSavings;
		},
		get unallocated() {
			return unallocated;
		}
	};
}
