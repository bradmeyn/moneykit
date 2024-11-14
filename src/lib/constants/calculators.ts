export const calculatorsByCategory = {
	Savings: [
		{
			name: 'Growth Calculator',
			href: '/growth-calculator',
			description: 'Project your investment growth with our powerful calculator',
			iconPath: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6'
		},
		{
			name: 'Drawdown Calculator',
			href: '/drawdown-calculator',
			description: 'Plan your retirement withdrawals strategically',
			iconPath: 'M21 12a9 9 0 1 1-6.219-8.56 M12 8v4l2.5 2.5'
		},
		{
			name: 'Budget Builder',
			href: '/budget-builder',
			description: 'Create and manage your personal budget with ease',
			iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
		},
		{
			name: 'Tax Calculator',
			href: '/personal-tax-calculator',
			description: 'Estimate your tax obligations and plan accordingly',
			iconPath:
				'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
		}
	]
	// Investment: [
	// 	{
	// 		name: 'Portfolio Builder',
	// 		href: '/portfolio-builder',
	// 		description: 'Design and optimize your investment portfolio',
	// 		iconPath: 'M21 3v18M3 9h18M3 15h18M3 9a6 6 0 0 1 6-6M3 15a6 6 0 0 0 6 6'
	// 	}
	// ]
} as const;

export type CalculatorItem = {
	name: string;
	href: string;
	description: string;
	iconPath: string;
};

export const calculators: CalculatorItem[] = Object.values(calculatorsByCategory).flat();

export type Category = keyof typeof calculatorsByCategory;
export const categories: Category[] = Object.keys(calculatorsByCategory) as Category[];
