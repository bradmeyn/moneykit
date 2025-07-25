import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { setContext, getContext } from 'svelte';
import { defaultBudgetItems, defaultCategories } from './default-budget-items';
import { browser } from '$app/environment';

export type BudgetItem = {
	id: string;
	name: string;
	amount: number;
	category: string;
	frequency: FrequencyType;
	type: 'income' | 'expense' | 'savings';
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
	hasSavedBudget = $state<boolean>(false);

	checkLocalStorage() {
		if (browser) {
			const storedBudget = localStorage.getItem('budget-data');
			if (storedBudget) this.hasSavedBudget = true;
		}
	}

	constructor() {
		this.checkLocalStorage();
		this.loadFromStorage();
	}

	frequency = $state<FrequencyType>('monthly');
	budgetItems = $state<BudgetItem[]>(defaultBudgetItems);

	// Items by type
	income = $derived<BudgetItem[]>(this.budgetItems.filter((i) => i.type === 'income'));
	expenses = $derived<BudgetItem[]>(this.budgetItems.filter((i) => i.type === 'expense'));
	savings = $derived<BudgetItem[]>(this.budgetItems.filter((i) => i.type === 'savings'));

	// Categories
	categories = $state({
		income: defaultCategories.income,
		expense: defaultCategories.expense,
		savings: defaultCategories.savings
	});

	addCategory(type: BudgetItem['type'], category: string) {
		this.categories[type].push(category);
	}
	deleteCategory(type: BudgetItem['type'], category: string) {
		// Remove items with this category
		this.budgetItems = this.budgetItems.filter(
			(item) => !(item.type === type && item.category === category)
		);
		// Remove category from the list
		const index = this.categories[type].indexOf(category);
		if (index !== -1) {
			this.categories[type].splice(index, 1);
		}
	}
	updateCategory(type: BudgetItem['type'], oldCategory: string, newCategory: string) {
		const index = this.categories[type].indexOf(oldCategory);
		if (index !== -1) {
			this.categories[type][index] = newCategory;
			// Update all items in this category
			this.budgetItems.forEach((item) => {
				if (item.category === oldCategory && item.type === type) {
					item.category = newCategory;
				}
			});
		}
	}
	deleteItemsByCategory(type: BudgetItem['type'], category: string) {
		this.budgetItems = this.budgetItems.filter(
			(item) => !(item.type === type && item.category === category)
		);
	}

	// Frequency-adjusted items
	adjustedincome = $derived<BudgetItem[]>(
		this.income.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, this.frequency)
		}))
	);
	adjustedexpenses = $derived<BudgetItem[]>(
		this.expenses.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, this.frequency)
		}))
	);
	adjustedsavings = $derived<BudgetItem[]>(
		this.savings.map((item) => ({
			...item,
			amount: convertToFrequency(item.amount, item.frequency, this.frequency)
		}))
	);

	expenseByCategory = $derived<{ category: string; total: number }[]>(
		this.categories.expense.map((category) => {
			const categoryexpenses = this.adjustedexpenses.filter((i) => i.category === category);
			const total = categoryexpenses.reduce((acc, i) => acc + i.amount, 0);
			return { category, total };
		})
	);

	// Calculate totals for current frequency
	totalIncome = $derived<number>(this.adjustedincome.reduce((acc, i) => acc + i.amount, 0));
	totalExpenses = $derived<number>(this.adjustedexpenses.reduce((acc, i) => acc + i.amount, 0));
	totalSavings = $derived<number>(this.adjustedsavings.reduce((acc, i) => acc + i.amount, 0));
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

	deleteItemsByType(type: BudgetItem['type'] | null = null) {
		if (!type) {
			this.budgetItems = [];
			return;
		}
		this.budgetItems = this.budgetItems.filter((item) => item.type !== type);
	}

	getDownloadData() {
		// Sort items by type
		const income = this.budgetItems.filter((item) => item.type === 'income');
		const expenses = this.budgetItems.filter((item) => item.type === 'expense');
		const savings = this.budgetItems.filter((item) => item.type === 'savings');

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
		addItemsToRows(income, 'income');
		addItemsToRows(expenses, 'expenses');
		addItemsToRows(savings, 'savings');

		// Calculate unallocated funds
		const monthlyincome = income.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
			0
		);
		const monthlyexpenses = expenses.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
			0
		);
		const monthlysavings = savings.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'monthly'),
			0
		);
		const monthlyUnallocated = monthlyincome - (monthlyexpenses + monthlysavings);

		const annualincome = income.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
			0
		);
		const annualexpenses = expenses.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
			0
		);
		const annualsavings = savings.reduce(
			(acc, item) => acc + convertToFrequency(item.amount, item.frequency, 'annually'),
			0
		);
		const annualUnallocated = annualincome - (annualexpenses + annualsavings);

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

	saveToStorage() {
		if (!browser) return; // Avoid running on server-side
		const data = {
			budgetItems: this.budgetItems,
			categories: this.categories
		};
		localStorage.setItem('budget-data', JSON.stringify(data));
		console.log('Budget data saved to localStorage');
	}

	private loadFromStorage() {
		if (!browser) return; // Avoid running on server-side
		try {
			const saved = localStorage.getItem('budget-data');
			if (saved) {
				const data = JSON.parse(saved);
				this.budgetItems = data.budgetItems || defaultBudgetItems;
				this.categories = data.categories || defaultCategories;
			}
		} catch (error) {
			console.error('Failed to load budget data:', error);
		}
	}

	clearStorage() {
		localStorage.removeItem('budget-data');
	}
}

const BUDGET_KEY = Symbol('budget');

export function setBudgetState() {
	return setContext(BUDGET_KEY, new Budget());
}

export function getBudgetState() {
	return getContext<Budget>(BUDGET_KEY);
}
