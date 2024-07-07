import { INCOME_TAX_RATES } from '../constants';
import type { PersonalTaxScenario } from '../types';

export function formatAsPercentage(value: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 0,
		maximumFractionDigits: 3
	}).format(value);
}

export function formatAsCurrency(value: number, includeCents: boolean = false): string {
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: includeCents ? 2 : 0,
		maximumFractionDigits: includeCents ? 2 : 0
	};

	options.style = 'currency';
	options.currency = 'USD';

	return new Intl.NumberFormat('en-US', options).format(value);
}

export function formatAsNumber(value: number, includeCents: boolean = false): string {
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: includeCents ? 2 : 0,
		maximumFractionDigits: includeCents ? 2 : 0
	};

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

export function calculatePersonalTax(inputs: PersonalTaxScenario) {
	let incomeTax = 0;
	let lowIncomeOffset = 0;
	let medicareLevy = 0;
	let medicareLevySurcharge = 0;
	let totalTax = 0;

	const { income, deductions, hasInsurance, taxRates } = inputs;
	const taxableIncome = income - deductions;

	// Calculate income tax based on brackets
	for (const bracket of taxRates.incomeTax.brackets) {
		if (taxableIncome > bracket.max) {
			incomeTax += (bracket.max - bracket.min) * bracket.rate;
		} else if (taxableIncome > bracket.min) {
			incomeTax += (taxableIncome - bracket.min) * bracket.rate;
			break; // Exiting the loop as the taxable income falls within this bracket
		}
	}

	// Calculate low income offset
	for (const threshold of taxRates.incomeTax.offsets.lowIncome.brackets) {
		// taxable income is below the threshold
		if (threshold.min < taxableIncome && taxableIncome < threshold.max) {
			lowIncomeOffset = threshold.amount - (taxableIncome - threshold.min) * threshold.reduction;
			break;
		}
	}

	// Apply low income offset cap
	incomeTax -= lowIncomeOffset;
	if (incomeTax < 0) {
		incomeTax = 0;
	}

	// Calculate medicare levy (assuming a flat rate for simplicity)
	medicareLevy = taxableIncome * taxRates.medicareLevy.rate;

	// Calculate medicare levy surcharge if applicable
	if (!hasInsurance) {
		for (const surcharge of taxRates.medicareLevySurcharge) {
			if (taxableIncome > surcharge.min) {
				medicareLevySurcharge = taxableIncome * surcharge.rate;
				break; // Assuming only one surcharge rate applies
			}
		}
	}

	totalTax = incomeTax + medicareLevy + medicareLevySurcharge;

	return {
		income,
		deductions,
		taxableIncome,
		lowIncomeOffset,
		incomeTax,
		medicareLevy,
		medicareLevySurcharge,
		totalTax
	};
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

const assetAllocationLabels = {
	ausEquities: 'Aus Equities',
	intEquities: 'Int Equities',
	ausProperty: 'Aus Property',
	intProperty: 'Int Property',
	ausBonds: 'Aus Bonds',
	intBonds: 'Int Bonds',
	cash: 'Cash'
};

export function getReadableLabel(key: string): string {
	// @ts-expect-error - TS doesn't know that the key will be a valid key of AssetAllocation
	if (!assetAllocationLabels[key]) {
		return key;
	}
	// @ts-expect-error - TS doesn't know that the key will be a valid key of AssetAllocation
	return assetAllocationLabels[key];
}
