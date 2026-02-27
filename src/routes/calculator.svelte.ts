import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { setContext, getContext } from 'svelte';
import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';

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
	actualReturn: number;
	totalInterest: number;
	yearlyContribution: number;
	totalContributions: number;
	endingValue: number;
};

class GrowthCalculatorState {
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

	// FIRE mode
	fireMode = $state(true);
	annualExpenses = $state(40000);
	withdrawalRate = $state(0.04);
	secondaryIncome = $state(0);

	fireNumber = $derived((this.annualExpenses - this.secondaryIncome) / this.withdrawalRate);

	target = $derived(this.fireMode ? this.fireNumber : this.savingsGoal);

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

	isGoalAchieved = $derived(this.result.annualData.some((d) => d.endingValue >= this.target));

	yearsToGoal = $derived.by(() => {
		const yearReached = this.result.annualData.findIndex((d) => d.endingValue >= this.target);
		return yearReached === -1 ? null : yearReached + 1;
	});

	private generateNormalRandom(): number {
		let u1 = 0,
			u2 = 0;
		while (u1 === 0) u1 = Math.random();
		while (u2 === 0) u2 = Math.random();
		return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
	}

	private generateRandomReturn(expectedReturn: number): number {
		return expectedReturn + this.generateNormalRandom() * this.volatility;
	}

	calculateCompoundInterest(
		principal: number = 0,
		interestRate: number = 0,
		years: number = 0,
		contributionAmount: number = 0,
		contributionFrequency: number = 0,
		volatility: number = 0
	): GrowthResult {
		if (principal <= 0 || interestRate <= 0 || years <= 0 || contributionFrequency < 0) {
			return { totalValue: 0, totalInterest: 0, totalContributions: 0, annualData: [] };
		}

		let totalValue = principal;
		let totalInterest = 0;
		let totalContributions = 0;
		const annualData = [];

		for (let i = 0; i < years; i++) {
			const startingValue = parseFloat(totalValue.toFixed(2));
			const actualReturn =
				volatility > 0 ? this.generateRandomReturn(interestRate) : interestRate;
			const clampedReturn = Math.max(actualReturn, -1);
			const yearlyInterest = totalValue * clampedReturn;
			totalInterest += yearlyInterest;
			const yearlyContribution = contributionAmount * contributionFrequency;
			totalContributions += yearlyContribution;
			totalValue = Math.max(totalValue + yearlyInterest + yearlyContribution, 0);

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

		return { totalValue, totalInterest, totalContributions, annualData };
	}

	getTableData() {
		const columns = this.useVolatility
			? ['Year', 'Starting Value', 'Actual Return %', 'Interest Earned', 'Annual Contribution', 'Total Value']
			: ['Year', 'Starting Value', 'Interest Earned', 'Annual Contribution', 'Total Value'];

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
				if (this.useVolatility) row.splice(2, 0, formatAsPercentage(data.actualReturn));
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
