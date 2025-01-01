export const calculatorsByCategory = {
	Savings: [
		{
			name: 'Budget Builder',
			href: '/budget-builder',
			description: 'Create and manage your personal budget with ease',
			iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
		},
		{
			name: 'Growth Calculator',
			href: '/growth-calculator',
			description: 'Project your investment growth with our powerful calculator',
			iconPath: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6'
		},

		{
			name: 'Tax Calculator',
			href: '/personal-tax-calculator',
			description: 'Estimate your tax obligations and plan accordingly',
			iconPath:
				'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
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
