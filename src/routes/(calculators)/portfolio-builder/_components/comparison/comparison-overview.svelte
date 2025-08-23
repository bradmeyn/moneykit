<script lang="ts">
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';
	import ComparisonTable from './comparison-table.svelte';
	import StackedBarChart from '$lib/components/charts/stacked-bar.svelte';
	import { formatAsPercentage } from '$utils/formatters';
	import { COLOURS } from '$lib/constants/colours';
	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();

	// Prepare data for stacked bar chart showing % allocation breakdown by holdings
	let allocationDatasets = $derived.by(() => {
		const allHoldings = new Set([
			...portfolio1.holdings.map((h) => h.investment.symbol),
			...portfolio2.holdings.map((h) => h.investment.symbol)
		]);
		return Array.from(allHoldings).map((symbol, index) => {
			const p1Holding = portfolio1.holdings.find((h) => h.investment.symbol === symbol);
			const p2Holding = portfolio2.holdings.find((h) => h.investment.symbol === symbol);
			return {
				label: symbol,
				data: [p1Holding?.weight ?? 0, p2Holding?.weight ?? 0],
				backgroundColor: COLOURS[index % COLOURS.length]
			};
		});
	});
</script>

<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
	<div class="card">
		<h2 class="card-heading">Portfolio Comparison</h2>
		<ComparisonTable {portfolio1} {portfolio2} view="value" />
	</div>

	<div class="card">
		<h2 class="card-heading">Allocation Comparison</h2>
		<StackedBarChart
			datasets={allocationDatasets}
			labels={['Portfolio 1', 'Portfolio 2']}
			formatter={formatAsPercentage}
			showLegend={true}
			enableTooltip={true}
		/>
	</div>
</div>
