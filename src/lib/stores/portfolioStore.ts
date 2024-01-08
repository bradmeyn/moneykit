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

export const holdings = derived(portfolio, ($portfolio) => {
	return $portfolio.holdings.map((holding) => ({
		...holding,
		value: $portfolio.value * holding.allocation,
		cost: holding.investment.cost * holding.value
	}));
});
