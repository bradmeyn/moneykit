import { INCOME_TAX_RATES } from './constants';

export function formatAsPercentage(value: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).format(value);
}

export function formatAsCurrency(
	value: number,
	includeCents: boolean = false,
	includeSymbol: boolean = false
): string {
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: includeCents ? 2 : 0,
		maximumFractionDigits: includeCents ? 2 : 0
	};

	if (includeSymbol) {
		options.style = 'currency';
		options.currency = 'USD';
	} else {
		// If the currency symbol is not included, we use 'decimal' style
		options.style = 'decimal';
	}

	return new Intl.NumberFormat('en-US', options).format(value);
}
// Function to parse the formatted value back to an integer
export function parseCurrency(value: string) {
	return parseInt(value.replace(/[^0-9]+/g, ''));
}

export function getTaxRates(financialYear: number) {
	const taxRates = INCOME_TAX_RATES.find((taxRate) => taxRate.financialYear === financialYear);
	return taxRates;
}

export function calculateCompoundInterest(
	principal: number = 0,
	interestRate: number = 0,
	years: number = 0,
	contributionAmount: number = 0,
	contributionFrequency: number = 0
) {
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
}
