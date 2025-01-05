export const calculatorsByCategory = {
	Savings: [
		{
			name: 'Budget Builder',
			href: '/budget-builder',
			description: 'Create and manage your personal budget',
			iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
		},
		{
			name: 'Growth Calculator',
			href: '/growth-calculator',
			description: 'Project your investment growth over time',
			iconPath: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6'
		},

		{
			name: 'Tax Calculator',
			href: '/personal-tax-calculator',
			description: 'Estimate your income tax liability',
			iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
		},
		{
			name: 'FIRE Calculator',
			href: '/fire-calculator',
			description: 'Estimate your tax obligations and plan accordingly',
			iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
		}
	]
} as const;

export type Category = keyof typeof calculatorsByCategory;
export type CalculatorItem = {
	name: string;
	href: string;
	description: string;
	iconPath: string;
};

export const calculators: CalculatorItem[] = Object.values(calculatorsByCategory).flat();
export const categories: Category[] = Object.keys(calculatorsByCategory) as Category[];
