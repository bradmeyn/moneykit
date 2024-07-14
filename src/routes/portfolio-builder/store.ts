import { INVESTMENTS, UNALLOCATED_INVESTMENT } from '$lib/constants';
import { writable, derived } from 'svelte/store';
import type { Holding } from '$lib/types';

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
		},
		{
			investment: UNALLOCATED_INVESTMENT,
			allocation: 0.1
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
	let holdingtotal = 0;
	let updatedHoldings = $portfolio.holdings
		.filter((h) => h.investment.code !== 'CASH')
		.map((holding) => {
			holdingtotal += $portfolio.value * holding.allocation;
			const updatedHolding = {
				...holding,
				value: $portfolio.value * holding.allocation,
				cost: holding.investment.cost * ($portfolio.value * holding.allocation)
			};
			return updatedHolding;
		});

	const unallocated = 1 - holdingtotal / $portfolio.value;

	// Add the unallocated cash
	if (unallocated < 1) {
		updatedHoldings = [
			...updatedHoldings,
			{
				investment: UNALLOCATED_INVESTMENT,
				allocation: unallocated,
				value: $portfolio.value * unallocated,
				cost: 0
			}
		];
	}

	const assetAllocation = [
		{
			name: 'Aus Equities',
			key: 'ausEquities',
			value: 0
		},
		{
			name: 'Int Equities',
			key: 'intEquities',
			value: 0
		},
		{
			name: 'Aus Property',
			key: 'ausProperty',
			value: 0
		},
		{
			name: 'Int Property',
			key: 'intProperty',
			value: 0
		},
		{
			name: 'Aus Bonds',
			key: 'ausBonds',
			value: 0
		},
		{
			name: 'Int Bonds',
			key: 'intBonds',
			value: 0
		},
		{
			name: 'Cash',
			key: 'cash',
			value: 0
		}
	];

	// Update the asset allocation
	updatedHoldings.forEach((holding) => {
		Object.keys(holding.investment.assetAllocation).forEach((key) => {
			const index = assetAllocation.findIndex((a) => a.key === key);
			// @ts-expect-error - I know this is a number
			assetAllocation[index].value += holding.value * holding.investment.assetAllocation[key];
		});
	});

	const totalPercentage = Math.round(
		updatedHoldings.reduce((acc, holding) => acc + holding.allocation, 0)
	);

	const totalCost = updatedHoldings.reduce((acc, holding) => acc + holding.cost, 0);

	const totalCostPercentage = totalCost / $portfolio.value;

	return {
		holdings: updatedHoldings,
		assetAllocation,
		totalPercentage,
		totalCost,
		totalCostPercentage
	};
});
