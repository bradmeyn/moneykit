import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { setContext, getContext } from 'svelte';

export type GrowthScenario = {
	contributionAmount: number;
	interestRate: number;
	contributionFrequency: FrequencyType;
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

	// Scenario state
	baseScenario = $state<GrowthScenario>({
		contributionAmount: 1000,
		interestRate: 0.07,
		contributionFrequency: 'monthly'
	});

	comparisonScenario = $state<GrowthScenario>({
		contributionAmount: 0,
		interestRate: 0.0,
		contributionFrequency: 'monthly'
	});

	// Derived calculation results
	baseResult = $derived(
		this.calculateCompoundInterest(
			this.principal,
			this.baseScenario.interestRate,
			this.years,
			this.baseScenario.contributionAmount,
			FREQUENCIES[this.baseScenario.contributionFrequency].value
		)
	);

	comparisonResult = $derived(
		this.calculateCompoundInterest(
			this.principal,
			this.comparisonScenario.interestRate,
			this.years,
			this.comparisonScenario.contributionAmount,
			FREQUENCIES[this.comparisonScenario.contributionFrequency].value
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

	calculateCompoundInterest(
		principal: number = 0,
		interestRate: number = 0,
		years: number = 0,
		contributionAmount: number = 0,
		contributionFrequency: number = 0
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
			const yearlyInterest = totalValue * interestRate;
			totalInterest += yearlyInterest;
			const yearlyContribution = contributionAmount * contributionFrequency;
			totalContributions += yearlyContribution;
			totalValue += yearlyInterest + yearlyContribution;

			annualData.push({
				year: i + 1,
				startingValue,
				yearlyInterest: parseFloat(yearlyInterest.toFixed(2)),
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
				contributionFrequency: 'monthly'
			};
		}
	}

	getDownloadData() {
		return {
			headers: ['Year', 'Starting Value', 'Interest Earned', 'Contribution', 'Total Value'],
			rows: this.baseResult.annualData.map((data) => [
				data.year,
				data.startingValue,
				data.yearlyInterest,
				data.yearlyContribution,
				data.endingValue
			])
		};
	}

	getDownloadDataWithComparison() {
		return {
			headers: [
				'Year',
				'Starting Value',
				'Interest Earned',
				'Contribution',
				'Total Value',
				'Comparison Starting Value',
				'Comparison Interest',
				'Comparison Contribution',
				'Comparison Total'
			],
			rows: this.baseResult.annualData.map((data, index) => {
				const compData = this.comparisonResult.annualData[index];
				return [
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
