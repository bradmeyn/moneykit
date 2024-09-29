export const calculatorsByCategory = {
	Savings: [
		{ name: 'Growth Calculator', href: '/growth-calculator' },
		{ name: 'Drawdown Calculator', href: '/drawdown-calculator' },
		{ name: 'Budget', href: '/budget' },
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
};

export const categories = Object.keys(calculatorsByCategory);
