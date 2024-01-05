import { writable, derived } from 'svelte/store';

import { INVESTMENTS } from '$lib/constants';
import type { Holding } from '$lib/types';

const defaultPortfolio: Holding[] = [
	{
		investment: INVESTMENTS[0],
		value: 1000
	},
	{
		investment: INVESTMENTS[1],
		value: 2000
	},
	{
		investment: INVESTMENTS[2],
		value: 3000
	}
];

export default function createPortfolioStore() {
	const portfolio = writable(defaultPortfolio);

	function addHolding(holding: Holding) {
		portfolio.update((holdings) => [...holdings, holding]);
	}

	function removeHolding(holding: Holding) {
		portfolio.update((holdings) => holdings.filter((h) => h !== holding));
	}

	function updateHolding(updatedHolding: Holding) {
		portfolio.update((holdings) =>
			holdings.map((h) =>
				h.investment.symbol === updatedHolding.investment.symbol ? updatedHolding : h
			)
		);
	}

	// Derived store to calculate total value
	const totalValue = derived(portfolio, ($portfolio) =>
		$portfolio.reduce((total, holding) => total + holding.value, 0)
	);

	return {
		portfolio,
		addHolding,
		removeHolding,
		updateHolding,
		totalValue
	};
}
