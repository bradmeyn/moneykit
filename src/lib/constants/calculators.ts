export const calculatorsByCategory = {
	Savings: [
		{ name: 'Growth Calculator', href: '/growth-calculator' },
		{ name: 'Drawdown Calculator', href: '/drawdown-calculator' },
		{ name: 'Budget Builder', href: '/budget-builder' },
		{ name: 'Tax Calculator', href: '/personal-tax-calculator' }
		// { name: 'Retirement Calculator', href: '/retirement-calculator' },
		// { name: 'FIRE Calculator', href: '/fire-calculator' }
	],
	Investment: [
		{ name: 'Portfolio Builder', href: '/portfolio-builder' }
		// { name: 'Rebalance Calculator', href: '/rebalance-calculator' }
	]
	// Property: [{ name: 'Mortgage Repayment Calculator', href: '/mortgage-calculator' }],
	// Superannuation: [
	// 	{ name: 'Superannuation Comparison', href: '/super-comparison-calculator' },
	// 	{ name: 'Pension Calculator', href: '/pension-calculator' }
	// ]
} as const;

export const categories: Category[] = Object.keys(calculatorsByCategory) as Category[];
export type Category = keyof typeof calculatorsByCategory;
