import { INVESTMENTS, UNALLOCATED_CASH } from '$lib/constants';
import { writable, derived, type Readable } from 'svelte/store';
import type { Scenario, Holding, Result } from './types';

export const scenarios = writable<Scenario[]>([
	{
		id: 1,
		value: 500000,
		holdings: [
			{
				investment: INVESTMENTS[1],
				weighting: 0.5
			},
			{
				investment: INVESTMENTS[0],
				weighting: 0.25
			},
			{
				investment: INVESTMENTS[5],
				weighting: 0.125
			},
			{
				investment: INVESTMENTS[6],
				weighting: 0.075
			},
			{
				investment: UNALLOCATED_CASH,
				weighting: 0.05
			}
		]
	}
]);

export const results: Readable<Result[]> = derived(scenarios, ($scenarios) => {
	console.log($scenarios);
	return $scenarios.map((scenario) => {
		let holdingTotal = 0;

		// Filter out 'CASH' investments and calculate the value and cost for each holding
		let holdings = scenario.holdings
			.filter((h) => h.investment.code !== 'CASH')
			.map((holding) => {
				holdingTotal += scenario.value * holding.weighting;
				const updatedHolding = {
					...holding,
					value: scenario.value * holding.weighting,
					cost: holding.investment.cost * (scenario.value * holding.weighting)
				};
				return updatedHolding;
			});

		// Calculate the unallocated portion of the portfolio
		const unallocated = 1 - holdingTotal / scenario.value;

		// If there is any unallocated portion, add it as a new holding
		if (unallocated > 0) {
			holdings = [
				...holdings,
				{
					investment: UNALLOCATED_CASH,
					weighting: unallocated,
					value: scenario.value * unallocated,
					cost: 0
				}
			];
		}

		// Initialize asset allocation categories
		const assetAllocation = [
			{ name: 'Aus Equities', key: 'ausEquities', value: 0 },
			{ name: 'Int Equities', key: 'intEquities', value: 0 },
			{ name: 'Aus Property', key: 'ausProperty', value: 0 },
			{ name: 'Int Property', key: 'intProperty', value: 0 },
			{ name: 'Aus Bonds', key: 'ausBonds', value: 0 },
			{ name: 'Int Bonds', key: 'intBonds', value: 0 },
			{ name: 'Cash', key: 'cash', value: 0 }
		];

		// Update asset allocation values based on holdings
		holdings.forEach((holding) => {
			Object.keys(holding.investment.assetAllocation).forEach((key) => {
				const i = assetAllocation.findIndex((a) => a.key === key);
				const k = key as keyof typeof holding.investment.assetAllocation;
				assetAllocation[i].value += holding.value * holding.investment.assetAllocation[k];
			});
		});

		// Calculate the total percentage of the portfolio that is allocated
		const totalWeighting = Math.round(
			holdings.reduce((acc, holding) => acc + holding.weighting, 0)
		);

		// Calculate the total cost of the portfolio
		const totalCost = holdings.reduce((acc, holding) => acc + holding.cost, 0);

		// Calculate the total cost percentage relative to the portfolio value
		const totalCostPercentage = totalCost / scenario.value;

		// Return the updated portfolio details
		return {
			id: scenario.id,
			holdings,
			assetAllocation,
			totalWeighting,
			totalCost,
			totalCostPercentage
		};
	});
});

export function addScenario() {
	scenarios.update(($scenarios) => {
		const newScenario = {
			...($scenarios[$scenarios.length - 1] || {}),
			id: $scenarios.length + 1
		};
		return [...$scenarios, newScenario];
	});
}

export function addHolding(portfolioId: number, holding: Holding) {
	scenarios.update(($scenarios) => {
		return $scenarios.map((portfolio) => {
			if (portfolio.id === portfolioId) {
				return {
					...portfolio,
					holdings: [...portfolio.holdings, holding]
				};
			}
			return portfolio;
		});
	});
}

export function updateHolding(portfolioId: number, updatedHolding: Holding) {
	scenarios.update(($scenarios) => {
		return $scenarios.map((portfolio) => {
			if (portfolio.id === portfolioId) {
				return {
					...portfolio,
					holdings: portfolio.holdings.map((holding) =>
						holding.investment.code === updatedHolding.investment.code ? updatedHolding : holding
					)
				};
			}
			return portfolio;
		});
	});
}

export function removeHolding(portfolioId: number, investmentCode: string) {
	console.log('removing', portfolioId, investmentCode);
	scenarios.update(($scenarios) => {
		return $scenarios.map((portfolio) => {
			if (portfolio.id === portfolioId) {
				return {
					...portfolio,
					holdings: portfolio.holdings.filter(
						(holding) => holding.investment.code !== investmentCode
					)
				};
			}
			return portfolio;
		});
	});
}
