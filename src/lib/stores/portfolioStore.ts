import { INVESTMENTS } from '$lib/constants';
import { writable, derived } from 'svelte/store';
import type { Holding } from '$lib/types';

// // Define the base structure for your portfolio
export const portfolio = writable({
	value: 10000,
	holdings: [
		{
			investment: INVESTMENTS[0],
			allocation: 0.6,
			value: 6000
		},
		{
			investment: INVESTMENTS[1],
			allocation: 0.3,
			value: 3000
		}
	]
});

export function addHolding(holding: Holding) {
	portfolio.update(($portfolio) => {
		$portfolio.holdings.push(holding);
		return $portfolio;
	});
}

export function updateHolding(updatedHolding: Holding) {
	portfolio.update(($portfolio) => {
		const index = $portfolio.holdings.findIndex(
			(h) => h.investment.code === updatedHolding.investment.code
		);
		if (index !== -1) {
			$portfolio.holdings[index] = updatedHolding;
		}
		return $portfolio;
	});
}

export function removeHolding(investmentCode: string) {
	portfolio.update(($portfolio) => {
		$portfolio.holdings = $portfolio.holdings.filter((h) => h.investment.code !== investmentCode);
		return $portfolio;
	});
}

export const holdings = derived(portfolio, ($portfolio) => {
	return $portfolio.holdings.map((holding) => ({
		...holding,
		value: $portfolio.value * holding.allocation,
		cost: holding.investment.cost * holding.value
	}));
});

export const totalPercentage = derived(holdings, ($holdings) => {
	return $holdings.reduce((acc, holding) => acc + holding.allocation, 0);
});
