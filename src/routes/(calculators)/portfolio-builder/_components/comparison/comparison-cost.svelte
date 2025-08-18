<script lang="ts">
	import StackedBarChart from '$lib/components/charts/stacked-bar.svelte';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import { COLOURS } from '$lib/constants/colours';
	import ComparisonTable from './comparison-table.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();

	// Prepare data for stacked bar chart showing cost breakdown by holdings
	let datasets = $derived.by(() => {
		// Get all unique holdings across both portfolios
		const allHoldings = new Set([
			...portfolio1.holdings.map((h) => h.investment.symbol),
			...portfolio2.holdings.map((h) => h.investment.symbol)
		]);

		return Array.from(allHoldings).map((symbol, index) => {
			const p1Holding = portfolio1.holdings.find((h) => h.investment.symbol === symbol);
			const p2Holding = portfolio2.holdings.find((h) => h.investment.symbol === symbol);

			return {
				label: symbol,
				data: [p1Holding?.cost || 0, p2Holding?.cost || 0],
				backgroundColor: COLOURS[index % COLOURS.length]
			};
		});
	});

	// Get unique investments for the cost table
	function getCostRows(portfolio: Portfolio) {
		return (portfolio.holdings ?? []).map((h) => ({
			symbol: h.investment.symbol,
			name: h.investment.name,
			cost: h.cost,
			managementCost: h.investment.managementCost
		}));
	}

	const costRows1 = getCostRows(portfolio1);
	const costRows2 = getCostRows(portfolio2);
	const allSymbols = Array.from(
		new Set([...costRows1.map((r) => r.symbol), ...costRows2.map((r) => r.symbol)])
	);

	// Calculate weighted average fees
	const weightedAvgFee1 =
		portfolio1 && portfolio1.totalAllocated > 0
			? portfolio1.totalCost / portfolio1.totalAllocated
			: 0;
	const weightedAvgFee2 =
		portfolio2 && portfolio2.totalAllocated > 0
			? portfolio2.totalCost / portfolio2.totalAllocated
			: 0;
</script>

<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
	<div class="card">
		<h2 class="card-heading">Investment Costs</h2>
		<div class="mt-6">
			<ComparisonTable {portfolio1} {portfolio2} view="cost" />
		</div>
	</div>

	<div class="card">
		<h2 class="card-heading">Cost Comparison</h2>
		<StackedBarChart
			{datasets}
			labels={['Portfolio 1', 'Portfolio 2']}
			formatter={formatAsCurrency}
			showLegend={true}
			enableTooltip={true}
		/>
	</div>
</div>
