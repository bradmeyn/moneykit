// Enhanced calculator.svelte with volatility support
import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
import { setContext, getContext } from 'svelte';

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
	useVolatility = $state(false); // Toggle for volatility simulation

	// Scenario state
	baseScenario = $state<GrowthScenario>({
		contributionAmount: 1000,
		interestRate: 0.07,
		contributionFrequency: 'monthly',
		volatility: 0.15 // Default 15% volatility
	});

	comparisonScenario = $state<GrowthScenario>({
		contributionAmount: 0,
		interestRate: 0.0,
		contributionFrequency: 'monthly',
		volatility: 0.15
	});

	// Derived calculation results
	baseResult = $derived(
		this.calculateCompoundInterest(
			this.principal,
			this.baseScenario.interestRate,
			this.years,
			this.baseScenario.contributionAmount,
			FREQUENCIES[this.baseScenario.contributionFrequency].value,
			this.useVolatility ? this.baseScenario.volatility : 0
		)
	);

	comparisonResult = $derived(
		this.calculateCompoundInterest(
			this.principal,
			this.comparisonScenario.interestRate,
			this.years,
			this.comparisonScenario.contributionAmount,
			FREQUENCIES[this.comparisonScenario.contributionFrequency].value,
			this.useVolatility ? this.comparisonScenario.volatility : 0
		)
	);

	baseGoalAchieved = $derived(
		this.baseResult.annualData.some((data) => data.endingValue >= this.savingsGoal)
	);

	baseYearsToGoal = $derived.by(() => {
		const yearReached = this.baseResult.annualData.findIndex(
			(data) => data.endingValue >= this.savingsGoal
		);
		return yearReached === -1 ? null : yearReached + 1;
	});

	comparisonGoalAchieved = $derived(
		this.comparisonResult.annualData.some((data) => data.endingValue >= this.savingsGoal)
	);

	comparisonYearsToGoal = $derived.by(() => {
		const yearReached = this.comparisonResult.annualData.findIndex(
			(data) => data.endingValue >= this.savingsGoal
		);
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
		return expectedReturn + randomNormal * volatility;
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

	updateBase(updates: Partial<GrowthScenario>) {
		this.baseScenario = { ...this.baseScenario, ...updates };
	}

	updateComparison(updates: Partial<GrowthScenario>) {
		this.comparisonScenario = { ...this.comparisonScenario, ...updates };
	}

	toggleComparison(showComparison: boolean) {
		if (showComparison) {
			this.comparisonScenario = {
				...this.baseScenario
			};
		} else {
			this.comparisonScenario = {
				contributionAmount: 1000,
				interestRate: 0.05,
				contributionFrequency: 'monthly',
				volatility: 0.15
			};
		}
	}

	// Method to recalculate with new volatility (useful for "refresh" button)
	recalculate() {
		// Force recalculation by creating new scenario objects
		this.baseScenario = { ...this.baseScenario };
		this.comparisonScenario = { ...this.comparisonScenario };
	}

	getDownloadData() {
		const headers = this.useVolatility
			? [
					'Year',
					'Starting Value',
					'Actual Return %',
					'Interest Earned',
					'Contribution',
					'Total Value'
				]
			: ['Year', 'Starting Value', 'Interest Earned', 'Contribution', 'Total Value'];

		const rows = this.baseResult.annualData.map((data) => {
			const baseRow = [
				data.year,
				data.startingValue,
				data.yearlyInterest,
				data.yearlyContribution,
				data.endingValue
			];

			if (this.useVolatility) {
				baseRow.splice(2, 0, `${(data.actualReturn * 100).toFixed(2)}%`);
			}

			return baseRow;
		});

		return { headers, rows };
	}

	getTableData(isComparing: boolean = false) {
		if (isComparing) {
			const columns = this.useVolatility
				? [
						'Year',
						'Starting',
						'Return %',
						'Interest',
						'Contribution',
						'Total',
						'Comp Starting',
						'Comp Return %',
						'Comp Interest',
						'Comp Contribution',
						'Comp Total'
					]
				: [
						'Year',
						'Starting',
						'Interest',
						'Contribution',
						'Total',
						'Comp Starting',
						'Comp Interest',
						'Comp Contribution',
						'Comp Total'
					];

			return {
				columns,
				rows: this.baseResult.annualData.map((data, index) => {
					const compData = this.comparisonResult.annualData[index];
					const baseRow = [
						data.year,
						formatAsCurrency(data.startingValue),
						formatAsCurrency(data.yearlyInterest),
						formatAsCurrency(data.yearlyContribution),
						formatAsCurrency(data.endingValue),
						formatAsCurrency(compData?.startingValue || 0),
						formatAsCurrency(compData?.yearlyInterest || 0),
						formatAsCurrency(compData?.yearlyContribution || 0),
						formatAsCurrency(compData?.endingValue || 0)
					];

					if (this.useVolatility) {
						baseRow.splice(2, 0, `${(data.actualReturn * 100).toFixed(1)}%`);
						baseRow.splice(7, 0, `${((compData?.actualReturn || 0) * 100).toFixed(1)}%`);
					}

					return baseRow;
				})
			};
		}

		// Default single scenario table
		const columns = this.useVolatility
			? [
					'Year',
					'Starting Value',
					'Actual Return %',
					'Interest Earned',
					'Contribution',
					'Total Value'
				]
			: ['Year', 'Starting Value', 'Interest Earned', 'Contribution', 'Total Value'];

		return {
			columns,
			rows: this.baseResult.annualData.map((data) => {
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

	getDownloadDataWithComparison() {
		const headers = this.useVolatility
			? [
					'Year',
					'Starting Value',
					'Actual Return %',
					'Interest Earned',
					'Contribution',
					'Total Value',
					'Comparison Starting Value',
					'Comparison Return %',
					'Comparison Interest',
					'Comparison Contribution',
					'Comparison Total'
				]
			: [
					'Year',
					'Starting Value',
					'Interest Earned',
					'Contribution',
					'Total Value',
					'Comparison Starting Value',
					'Comparison Interest',
					'Comparison Contribution',
					'Comparison Total'
				];

		const rows = this.baseResult.annualData.map((data, index) => {
			const compData = this.comparisonResult.annualData[index];
			const baseRow = [
				data.year,
				data.startingValue,
				data.yearlyInterest,
				data.yearlyContribution,
				data.endingValue,
				compData?.startingValue || 0,
				compData?.yearlyInterest || 0,
				compData?.yearlyContribution || 0,
				compData?.endingValue || 0
			];

			if (this.useVolatility) {
				baseRow.splice(2, 0, formatAsPercentage(data.actualReturn));
				baseRow.splice(8, 0, formatAsPercentage(compData.actualReturn || 0));
			}

			return baseRow;
		});

		return { headers, rows };
	}
}

const CALCULATOR_KEY = Symbol('growth-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new GrowthCalculatorState());
}

export function getCalculatorState() {
	return getContext<GrowthCalculatorState>(CALCULATOR_KEY);
}
