<script lang="ts">
	import StackedBarChart from '$lib/components/charts/stacked-bar.svelte';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import { COLOURS } from '$lib/constants/colours';

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

	const labels = ['Portfolio 1', 'Portfolio 2'];
	const formatter = (value: number) => formatAsCurrency(value);

	// Table data for comparison
	const rows = [
		{
			label: 'Total Cost',
			p1: portfolio1?.totalCost ?? 0,
			p2: portfolio2?.totalCost ?? 0,
			format: formatAsCurrency
		},
		{
			label: 'Weighted Avg. Fee',
			p1:
				portfolio1 && portfolio1.totalAllocated
					? portfolio1.totalCost / portfolio1.totalAllocated
					: 0,
			p2:
				portfolio2 && portfolio2.totalAllocated
					? portfolio2.totalCost / portfolio2.totalAllocated
					: 0,
			format: formatAsPercentage
		}
	];
</script>

<div class="card">
	<h2 class="card-heading">Portfolio Cost Comparison</h2>

	<!-- Stacked Bar Chart showing cost breakdown -->
	<div class="mb-6">
		<h3 class="text-lg font-semibold mb-4">Cost Breakdown by Holdings</h3>
		<StackedBarChart {datasets} {labels} {formatter} showLegend={true} enableTooltip={true} />
	</div>

	<!-- Summary table -->
	<div class="mt-6">
		<h3 class="text-lg font-semibold mb-4">Cost Summary</h3>
		<table class="w-full rounded-lg overflow-hidden">
			<thead>
				<tr>
					<th class="text-left">Cost Metric</th>
					<th class="text-right">Portfolio 1</th>
					<th class="text-right">Portfolio 2</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row}
					<tr>
						<td>{row.label}</td>
						<td class="text-right">{row.format(row.p1)}</td>
						<td class="text-right">{row.format(row.p2)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
