import { v4 as uuidv4 } from 'uuid';
import { type BudgetItem } from './budget.svelte';

export const defaultBudgetItems: BudgetItem[] = [
	// Income items
	{
		id: uuidv4(),
		name: 'Salary',
		amount: 1000,
		category: 'Wages & Salary',
		frequency: 'monthly',
		type: 'income'
	},
	{
		id: uuidv4(),
		name: 'Bonus',
		amount: 500,
		category: 'Wages & Salary',
		frequency: 'annually',
		type: 'income'
	},
	{
		id: uuidv4(),
		name: 'Rental income',
		amount: 500,
		category: 'Investments',
		frequency: 'annually',
		type: 'income'
	},
	{
		id: uuidv4(),
		name: 'Interest',
		amount: 500,
		category: 'Investments',
		frequency: 'annually',
		type: 'income'
	},
	{
		id: uuidv4(),
		name: 'Dividends & Distributions',
		amount: 500,
		category: 'Investments',
		frequency: 'quarterly',
		type: 'income'
	},
	{
		id: uuidv4(),
		name: 'Capital Gains',
		amount: 500,
		category: 'Investments',
		frequency: 'annually',
		type: 'income'
	},
	// Expense items
	{
		id: uuidv4(),
		name: 'Rent/Mortgage',
		amount: 100,
		category: 'Housing & Utilities',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Rates',
		amount: 300,
		category: 'Housing & Utilities',
		frequency: 'quarterly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Water',
		amount: 100,
		category: 'Housing & Utilities',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Electricity & Gas',
		amount: 300,
		category: 'Housing & Utilities',
		frequency: 'quarterly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Internet & Phone',
		amount: 120,
		category: 'Housing & Utilities',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Groceries',
		amount: 50,
		category: 'Food',
		frequency: 'weekly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Takeaway',
		amount: 50,
		category: 'Food',
		frequency: 'weekly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Gym Membership',
		amount: 30,
		category: 'Health',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Fuel',
		amount: 50,
		category: 'Car',
		frequency: 'weekly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Registration',
		amount: 50,
		category: 'Car',
		frequency: 'weekly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Insurance',
		amount: 1200,
		category: 'Car',
		frequency: 'annually',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Maintenance',
		amount: 200,
		category: 'Car',
		frequency: 'annually',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Streaming Services',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Hobbies',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Eating Out',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 'monthly',
		type: 'expense'
	},
	{
		id: uuidv4(),
		name: 'Alcohol',
		amount: 10,
		category: 'Entertainment & Leisure',
		frequency: 'monthly',
		type: 'expense'
	},
	// Savings items
	{
		id: uuidv4(),
		name: 'Vacation Fund',
		amount: 50,
		category: 'Cash Savings',
		frequency: 'annually',
		type: 'savings'
	},
	{
		id: uuidv4(),
		name: 'Retirement Fund',
		amount: 200,
		category: 'Superannuation',
		frequency: 'monthly',
		type: 'savings'
	},
	{
		id: uuidv4(),
		name: 'ETF Portfolio',
		amount: 200,
		category: 'Investments',
		frequency: 'monthly',
		type: 'savings'
	}
];

export const defaultItems = {
	income: defaultBudgetItems.filter((item) => item.type === 'income'),
	expenses: defaultBudgetItems.filter((item) => item.type === 'expense'),
	savings: defaultBudgetItems.filter((item) => item.type === 'savings')
};

export const defaultCategories = {
	income: ['Wages & Salary', 'Investments'],
	expense: ['Housing & Utilities', 'Food', 'Car', 'Health', 'Entertainment & Leisure'],
	savings: ['Cash Savings', 'Superannuation', 'Investments']
};
