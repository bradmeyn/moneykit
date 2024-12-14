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

function calculateCompoundInterest(
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

function createCalculatorState() {
	let principal = $state(10000);
	let savingsGoal = $state(100000);
	let years = $state(10);

	let baseScenario = $state<GrowthScenario>({
		contributionAmount: 1000,
		interestRate: 0.07,
		contributionFrequency: 'monthly'
	});

	const baseResult = $derived(
		calculateCompoundInterest(
			principal,
			baseScenario.interestRate,
			years,
			baseScenario.contributionAmount,
			FREQUENCIES[baseScenario.contributionFrequency].value
		)
	);

	let comparisonScenario = $state<GrowthScenario>({
		contributionAmount: 0,
		interestRate: 0.0,
		contributionFrequency: 'monthly'
	});

	const comparisonResult = $derived(
		calculateCompoundInterest(
			principal,
			comparisonScenario.interestRate,
			years,
			comparisonScenario.contributionAmount,
			FREQUENCIES[comparisonScenario.contributionFrequency].value
		)
	);

	function updateBase(updates: Partial<GrowthScenario>) {
		baseScenario = { ...baseScenario, ...updates };
	}

	function updateComparison(updates: Partial<GrowthScenario>) {
		comparisonScenario = { ...comparisonScenario, ...updates };
	}

	function toggleComparison(showComparison: boolean) {
		if (showComparison) {
			comparisonScenario = {
				...baseScenario
			};
		} else {
			comparisonScenario = {
				contributionAmount: 1000,
				interestRate: 0.05,
				contributionFrequency: 'monthly'
			};
		}
	}

	return {
		get principal() {
			return principal;
		},
		set principal(value: number) {
			principal = value;
		},
		get savingsGoal() {
			return savingsGoal;
		},
		set savingsGoal(value: number) {
			savingsGoal = value;
		},
		get years() {
			return years;
		},
		set years(value: number) {
			years = value;
		},
		get baseScenario() {
			return baseScenario;
		},
		get baseResult() {
			return baseResult;
		},
		get comparisonScenario() {
			return comparisonScenario;
		},
		get comparisonResult() {
			return comparisonResult;
		},
		updateBase,
		updateComparison,
		toggleComparison
	};
}

const CALCULATOR_KEY = Symbol('growth-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, createCalculatorState());
}

export function getCalculatorState() {
	return getContext<ReturnType<typeof createCalculatorState>>(CALCULATOR_KEY);
}
