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
	principal: number = 0,
	interestRate: number = 0,
	years: number = 0,
	contributionAmount: number = 0,
	contributionFrequency: number = 0
) => {
	console.log('principal', principal);
	console.log('interestRate', interestRate);
	console.log('years', years);
	console.log('contributionAmount', contributionAmount);
	console.log('contributionFrequency', contributionFrequency);

	let totalValue = principal;
	let totalInterest = 0;
	let totalContributions = 0;

	const interestByYear: number[] = [];
	const contributionsByYear: number[] = [];
	const chartYears: number[] = [];
	const startingByYear: number[] = [];

	for (let i = 0; i < years; i++) {
		// Storing the starting value for the year
		startingByYear.push(parseFloat(principal.toFixed(2)));

		// Calculating yearly interest
		const yearlyInterest = totalValue * (interestRate / 100);
		totalInterest += yearlyInterest;
		interestByYear.push(parseFloat(totalInterest.toFixed(2)));

		// Calculating yearly contributions
		const yearlyContribution = contributionAmount * contributionFrequency;
		totalContributions += yearlyContribution;
		contributionsByYear.push(parseFloat(totalContributions.toFixed(2)));

		// Update the total value with yearly interest and contribution
		totalValue += yearlyInterest + yearlyContribution;

		chartYears.push(i + 1);
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
