import { INVESTMENTS } from '$lib/constants';
import { writable, derived } from 'svelte/store';
import type { AssetAllocation, Holding } from '$lib/types';
import { updated } from '$app/stores';

// // Define the base structure for your portfolio
export const portfolio = writable({
	value: 10000,
	holdings: [
		{
			investment: INVESTMENTS[0],
			allocation: 0.6
		},
		{
			investment: INVESTMENTS[1],
			allocation: 0.3
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

export const portfolioDetails = derived(portfolio, ($portfolio) => {
	// Update the value of each holding
	const updatedHoldings = $portfolio.holdings.map((holding) => {
		const updatedHolding = {
			...holding,
			value: $portfolio.value * holding.allocation,
			cost: holding.investment.cost * ($portfolio.value * holding.allocation)
		};
		return updatedHolding;
	});

	console.log(updatedHoldings);

	const assetAllocation = [
		{
			name: 'Australian Equities',
			key: 'ausEquities',
			value: 0
		},
		{
			name: 'International Equities',
			key: 'intEquities',
			value: 0
		},
		{
			name: 'Australian Property',
			key: 'ausProperty',
			value: 0
		},
		{
			name: 'International Property',
			key: 'intProperty',
			value: 0
		},
		{
			name: 'Australian Bonds',
			key: 'ausBonds',
			value: 0
		},
		{
			name: 'International Bonds',
			key: 'intBonds',
			value: 0
		},
		{
			name: 'Cash',
			key: 'cash',
			value: 0
		}
	];

	updatedHoldings.forEach((holding) => {
		// Loop each asset allocation key and add the value of the holding to the asset allocation

		Object.keys(holding.investment.assetAllocation).forEach((key) => {
			const index = assetAllocation.findIndex((a) => a.key === key);
			assetAllocation[index].value += holding.value * holding.investment.assetAllocation[key];
		});
	});
	console.log(assetAllocation);

	const totalPercentage = updatedHoldings.reduce((acc, holding) => acc + holding.allocation, 0);

	return { holdings: updatedHoldings, assetAllocation, totalPercentage };
});
