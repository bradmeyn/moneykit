import { writable, derived } from 'svelte/store';
import type { BudgetItem } from './types';

export const budgetItems = writable<BudgetItem[]>([
	{
		id: 1,
		name: 'Salary',
		amount: 1000,
		category: 'Wages & Salary',
		frequency: 12,
		type: 'Income'
	},
	{
		id: 2,
		name: 'Bonus',
		amount: 500,
		category: 'Wages & Salary',
		frequency: 1,
		type: 'Income'
	},
	{
		id: 2,
		name: 'Rental Income',
		amount: 500,
		category: 'Investments',
		frequency: 1,
		type: 'Income'
	},
	{
		id: 2,
		name: 'Interest',
		amount: 500,
		category: 'Investments',
		frequency: 1,
		type: 'Income'
	},
	{
		id: 2,
		name: 'Dividends & Distributions',
		amount: 500,
		category: 'Investments',
		frequency: 4,
		type: 'Income'
	},
	{
		id: 2,
		name: 'Capital Gains',
		amount: 500,
		category: 'Investments',
		frequency: 1,
		type: 'Income'
	},

	{
		id: 1,
		name: 'Rent/Mortgage',
		amount: 100,
		category: 'Housing & Utilities',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 11,
		name: 'Rates',
		amount: 300,
		category: 'Housing & Utilities',
		frequency: 4,
		type: 'Expense'
	},
	{
		id: 12,
		name: 'Water',
		amount: 100,
		category: 'Housing & Utilities',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 11,
		name: 'Electricity & Gas',
		amount: 300,
		category: 'Housing & Utilities',
		frequency: 4,
		type: 'Expense'
	},
	{
		id: 11,
		name: 'Internet & Phone',
		amount: 120,
		category: 'Housing & Utilities',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 2,
		name: 'Groceries',
		amount: 50,
		category: 'Food',
		frequency: 52,
		type: 'Expense'
	},
	{
		id: 30,
		name: 'Takeaway',
		amount: 50,
		category: 'Food',
		frequency: 52,
		type: 'Expense'
	},
	{
		id: 3,
		name: 'Gym Membership',
		amount: 30,
		category: 'Health',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 4,
		name: 'Fuel',
		amount: 50,
		category: 'Car',
		frequency: 52,
		type: 'Expense'
	},
	{
		id: 40,
		name: 'Registration',
		amount: 50,
		category: 'Car',
		frequency: 52,
		type: 'Expense'
	},
	{
		id: 41,
		name: 'Insurance',
		amount: 1200,
		category: 'Car',
		frequency: 1,
		type: 'Expense'
	},
	{
		id: 42,
		name: 'Maintenance',
		amount: 200,
		category: 'Car',
		frequency: 1,
		type: 'Expense'
	},
	{
		id: 5,
		name: 'Streaming Services',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 5,
		name: 'Hobbies',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 5,
		name: 'Eating Out',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 12,
		type: 'Expense'
	},
	{
		id: 5,
		name: 'Alcohol',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 12,
		type: 'Expense'
	},

	{
		id: 2,
		name: 'Vacation Fund',
		amount: 50,
		category: 'Cash Reserves',
		frequency: 1,
		type: 'Savings'
	},

	{
		id: 3,
		name: 'Retirement Fund',
		amount: 200,
		category: 'Retirement & Investments',
		frequency: 12,
		type: 'Savings'
	}
]);

export function addBudgetItem(item: BudgetItem) {
	budgetItems.update(($budget) => {
		$budget.push(item);
		return $budget;
	});
}

export function updateBudgetItem(updatedItem: BudgetItem) {
	budgetItems.update(($budgetItems) => {
		const index = $budgetItems.findIndex((i) => i.id === updatedItem.id);
		if (index !== -1) {
			$budgetItems[index] = updatedItem;
		}
		return $budgetItems;
	});
}

export function removeBudgetItem(id: number) {
	budgetItems.update(($budgetItems) => {
		return $budgetItems.filter((i) => i.id !== id);
	});
}

export const budget = derived(budgetItems, ($budgetItems) => {
	const income = $budgetItems.filter((i) => i.type === 'Income');
	const expenses = $budgetItems.filter((i) => i.type === 'Expense');
	const savings = $budgetItems.filter((i) => i.type === 'Savings');

	const incomeCategories = [...new Set(income.map((i) => i.category))];
	const expenseCategories = [...new Set(expenses.map((i) => i.category))];
	const savingsCategories = [...new Set(savings.map((i) => i.category))];

	const expenseByCategory = expenseCategories.map((category) => {
		const categoryExpenses = expenses.filter((i) => i.category === category);
		const total = categoryExpenses.reduce((acc, i) => acc + i.amount * i.frequency, 0);
		return { category, total };
	});

	const annualIncome = income.reduce((acc, i) => acc + i.amount * i.frequency, 0);
	const annualExpenses = expenses.reduce((acc, i) => acc + i.amount * i.frequency, 0);
	const annualSavings = savings.reduce((acc, i) => acc + i.amount * i.frequency, 0);
	const unallocated = annualIncome - annualExpenses - annualSavings;

	return {
		income,
		expenses,
		savings,
		incomeCategories,
		expenseCategories,
		savingsCategories,
		expenseByCategory,
		annualIncome,
		annualExpenses,
		annualSavings,
		unallocated
	};
});
