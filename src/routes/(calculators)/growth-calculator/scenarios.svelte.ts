import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { calculateCompoundInterest, type AnnualData } from './helpers';

export type GrowthScenario = {
	id: number;
	principal: number;
	contributionAmount: number;
	interestRate: number;
	contributionFrequency: FrequencyType;
	years: number;
};

export type GrowthResult = {
	id: number;
	totalValue: number;
	totalInterest: number;
	totalContributions: number;
	annualData: AnnualData[];
};

export function createScenarios() {
	// Initial state
	const scenarios = $state<GrowthScenario[]>([
		{
			id: 1,
			principal: 100000,
			contributionAmount: 1000,
			interestRate: 0.06,
			contributionFrequency: 'monthly',
			years: 10
		}
	]);

	// Derived calculations
	const results = $derived<GrowthResult[]>(
		scenarios.map((scenario) => {
			const result = calculateCompoundInterest(
				scenario.principal,
				scenario.interestRate,
				scenario.years,
				scenario.contributionAmount,
				FREQUENCIES[scenario.contributionFrequency].value
			);

			return {
				id: scenario.id,
				...result
			};
		})
	);

	function addScenario() {
		const lastScenario = scenarios[scenarios.length - 1];

		scenarios.push({
			id: scenarios.length + 1,
			principal: lastScenario.principal,
			contributionAmount: lastScenario.contributionAmount,
			interestRate: lastScenario.interestRate,
			contributionFrequency: lastScenario.contributionFrequency,
			years: lastScenario.years
		});
	}

	return {
		get scenarios() {
			return scenarios;
		},
		get results() {
			return results;
		},
		addScenario
	};
}
