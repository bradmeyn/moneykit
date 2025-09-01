// Enhanced calculator.svelte with volatility support
import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { setContext, getContext } from 'svelte';
import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';

export type GrowthScenario = {
	contributionAmount: number;
	interestRate: number;
	contributionFrequency: FrequencyType;
	volatility: number; // Standard deviation of annual returns
};

export type GrowthResult = {
	totalValue: number;
	totalInterest: number;
	totalContributions: number;
	annualData: AnnualData[];
};

export type AnnualData = {
	year: number;
	startingValue: number;
	yearlyInterest: number;
	actualReturn: number; // The actual return used (with volatility)
	totalInterest: number;
	yearlyContribution: number;
	totalContributions: number;
	endingValue: number;
};

class GrowthCalculatorState {
	// Input state
	principal = $state(10000);
	savingsGoal = $state(100000);
	years = $state(10);

	contributionAmount = $state(1000);
	contributionFrequency = $state<FrequencyType>('monthly');
	annualContributions = $derived.by(() => {
		return this.contributionAmount * FREQUENCIES[this.contributionFrequency].value;
	});

	returnRate = $state(0.07);
	inflationRate = $state(0.02);

	useVolatility = $state(false);
	volatility = $state(0.15);

	// FIRE inputs
	fireMode = $state(false);
	annualExpenses = $state(40000);
	withdrawalRate = $state(0.04);
	secondaryIncome = $state(0);

	fireNumber = $derived((this.annualExpenses - this.secondaryIncome) / this.withdrawalRate);
	yearsToFire = $derived.by(() => {
		let amount = this.principal;

		const realGrowthRate = (1 + this.returnRate) / (1 + this.inflationRate) - 1;

		let years = 0;
		while (amount < this.fireNumber && years < 100) {
			amount = amount * (1 + realGrowthRate) + this.annualContributions;
			years++;
		}
		return years;
	});

	target = $derived(this.fireMode ? this.fireNumber : this.savingsGoal);

	// Derived calculation results
	result = $derived(
		this.calculateCompoundInterest(
			this.principal,
			this.returnRate,
			this.years,
			this.contributionAmount,
			FREQUENCIES[this.contributionFrequency].value,
			this.useVolatility ? this.volatility : 0
		)
	);

	isGoalAchieved = $derived(this.result.annualData.some((data) => data.endingValue >= this.target));

	yearsToGoal = $derived.by(() => {
		const yearReached = this.result.annualData.findIndex((data) => data.endingValue >= this.target);
		return yearReached === -1 ? null : yearReached + 1;
	});

	// Simple Box-Muller transform for generating normal distribution
	private generateNormalRandom(): number {
		let u1 = 0,
			u2 = 0;
		while (u1 === 0) u1 = Math.random(); // Converting [0,1) to (0,1)
		while (u2 === 0) u2 = Math.random();

		const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
		return z0;
	}

	// Generate a random return based on expected return and volatility
	private generateRandomReturn(expectedReturn: number, volatility: number): number {
		if (volatility === 0) return expectedReturn;

		const randomNormal = this.generateNormalRandom();
		return expectedReturn + randomNormal * this.volatility;
	}

	calculateCompoundInterest(
		principal: number = 0,
		interestRate: number = 0,
		years: number = 0,
		contributionAmount: number = 0,
		contributionFrequency: number = 0,
		volatility: number = 0
	): GrowthResult {
		if (
			principal <= 0 ||
			interestRate <= 0 ||
			years <= 0 ||
			contributionAmount < 0 ||
			contributionFrequency < 0
		) {
			return {
				totalValue: 0,
				totalInterest: 0,
				totalContributions: 0,
				annualData: []
			};
		}

		let totalValue = principal;
		let totalInterest = 0;
		let totalContributions = 0;
		const annualData = [];

		for (let i = 0; i < years; i++) {
			const startingValue = parseFloat(totalValue.toFixed(2));

			// Generate actual return for this year (with or without volatility)
			const actualReturn =
				volatility > 0 ? this.generateRandomReturn(interestRate, volatility) : interestRate;

			// Ensure return doesn't go below -100% (total loss)
			const clampedReturn = Math.max(actualReturn, -1);

			const yearlyInterest = totalValue * clampedReturn;
			totalInterest += yearlyInterest;

			const yearlyContribution = contributionAmount * contributionFrequency;
			totalContributions += yearlyContribution;
			totalValue += yearlyInterest + yearlyContribution;

			// Ensure total value doesn't go below 0
			totalValue = Math.max(totalValue, 0);

			annualData.push({
				year: i + 1,
				startingValue,
				yearlyInterest: parseFloat(yearlyInterest.toFixed(2)),
				actualReturn: parseFloat(clampedReturn.toFixed(4)),
				totalInterest: parseFloat(totalInterest.toFixed(2)),
				yearlyContribution: parseFloat(yearlyContribution.toFixed(2)),
				totalContributions: parseFloat(totalContributions.toFixed(2)),
				endingValue: parseFloat(totalValue.toFixed(2))
			});
		}

		return {
			totalValue,
			totalInterest,
			totalContributions,
			annualData
		};
	}

	getTableData() {
		// Default single scenario table
		const columns = this.useVolatility
			? [
					'Year',
					'Starting Value',
					'Actual Return %',
					'Interest Earned',
					'Annual Contribution',
					'Total Value'
				]
			: ['Year', 'Starting Value', 'Interest Earned', 'AnnualContribution', 'Total Value'];

		return {
			columns,
			rows: this.result.annualData.map((data) => {
				const row = [
					data.year,
					formatAsCurrency(data.startingValue),
					formatAsCurrency(data.yearlyInterest),
					formatAsCurrency(data.yearlyContribution),
					formatAsCurrency(data.endingValue)
				];

				if (this.useVolatility) {
					row.splice(2, 0, formatAsPercentage(data.actualReturn));
				}

				return row;
			})
		};
	}
}

const CALCULATOR_KEY = Symbol('growth-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new GrowthCalculatorState());
}

export function getCalculatorState() {
	return getContext<GrowthCalculatorState>(CALCULATOR_KEY);
}
