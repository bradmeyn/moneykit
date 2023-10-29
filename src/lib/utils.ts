export function formatCurrency(value: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

export const frequencyOptions = [
	{ name: 'Weekly', value: 52 },
	{ name: 'Fortnightly', value: 26 },
	{ name: 'Monthly', value: 12 },
	{ name: 'Quarterly', value: 4 },
	{ name: 'Half Yearly', value: 2 },
	{ name: 'Yearly', value: 1 }
];

export const calculateCompoundInterest = (
	principal: number,
	interestRate: number,
	years: number,
	contributionAmount: number,
	contributionFrequency: number
) => {
	let totalValue = principal;
	let totalInterest = 0;
	let totalContributions = 0;
	let interestByYear: number[] = [];
	let contributionsByYear: number[] = [];
	let chartYears: number[] = [];
	let startingByYear: number[] = [];

	for (let i = 0; i < years; i++) {
		// Calculating yearly interest
		const yearlyInterest = totalValue * (interestRate / 100);
		totalInterest += yearlyInterest;
		interestByYear = [...interestByYear, yearlyInterest];

		// Calculating yearly contributions
		const yearlyContribution = contributionAmount * contributionFrequency;
		totalContributions += yearlyContribution;
		contributionsByYear = [...contributionsByYear, yearlyContribution];

		totalValue += yearlyInterest + yearlyContribution;
		chartYears = [...chartYears, i + 1];
		startingByYear = [...startingByYear, principal];
	}

	return {
		totalValue,
		totalInterest,
		totalContributions,
		chartYears,
		interestByYear,
		contributionsByYear,
		startingByYear
	};
};
