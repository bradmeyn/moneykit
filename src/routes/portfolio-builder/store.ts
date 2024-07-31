import { INVESTMENTS, UNALLOCATED_CASH } from '$lib/constants';
import { writable, derived } from 'svelte/store';
import type { Portfolio, Holding } from './types';

export const portfolios = writable<Portfolio[]>([
	{
		id: 1,
		value: 10000,
		holdings: [
			{
				investment: INVESTMENTS[1],
				weighting: 0.55
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
			}
		]
	}
]);

export const portfolioDetails = derived(portfolios, ($portfolios) => {
	return $portfolios.map((portfolio) => {
		let holdingTotal = 0;

		// Filter out 'CASH' investments and calculate the value and cost for each holding
		let holdings = portfolio.holdings
			.filter((h) => h.investment.code !== 'CASH')
			.map((holding) => {
				holdingTotal += portfolio.value * holding.weighting;
				const updatedHolding = {
					...holding,
					value: portfolio.value * holding.weighting,
					cost: holding.investment.cost * (portfolio.value * holding.weighting)
				};
				return updatedHolding;
			});

		// Calculate the unallocated portion of the portfolio
		const unallocated = 1 - holdingTotal / portfolio.value;

		// If there is any unallocated portion, add it as a new holding
		if (unallocated > 0) {
			holdings = [
				...holdings,
				{
					investment: UNALLOCATED_CASH,
					weighting: unallocated,
					value: portfolio.value * unallocated,
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
				const index = assetAllocation.findIndex((a) => a.key === key);
				// @ts-expect-error - I know this is a number
				assetAllocation[index].value += holding.value * holding.investment.assetAllocation[key];
			});
		});

		// Calculate the total percentage of the portfolio that is allocated
		const totalPercentage = Math.round(
			holdings.reduce((acc, holding) => acc + holding.weighting, 0) * 100
		);

		// Calculate the total cost of the portfolio
		const totalCost = holdings.reduce((acc, holding) => acc + holding.cost, 0);

		// Calculate the total cost percentage relative to the portfolio value
		const totalCostPercentage = totalCost / portfolio.value;

		// Return the updated portfolio details
		return {
			id: portfolio.id,
			holdings,
			assetAllocation,
			totalPercentage,
			totalCost,
			totalCostPercentage
		};
	});
});

export function addPortfolio() {
	portfolios.update(($portfolios) => {
		const newPortfolio = {
			...($portfolios[$portfolios.length - 1] || {}),
			id: $portfolios.length + 1
		};
		return [...$portfolios, newPortfolio];
	});
}

export function addHolding(portfolioId: number, holding: Holding) {
	portfolios.update(($portfolios) => {
		return $portfolios.map((portfolio) => {
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
	portfolios.update(($portfolios) => {
		return $portfolios.map((portfolio) => {
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
	portfolios.update(($portfolios) => {
		return $portfolios.map((portfolio) => {
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
