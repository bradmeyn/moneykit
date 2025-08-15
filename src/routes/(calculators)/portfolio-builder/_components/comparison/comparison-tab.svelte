<script lang="ts">
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();
	import ComparisonBarChart from './comparison-bar-chart.svelte';
	import ComparisonCostTable from './comparison-cost-table.svelte';
	import ComparisonOverviewTable from './comparison-overview-table.svelte';
</script>

<div class="card">
	<h2 class="text-lg font-semibold mb-4">Portfolio Comparison</h2>
	<div class="mb-8 card">
		<h3 class="font-bold mb-2">Overview Comparison</h3>
		<ComparisonOverviewTable {portfolio1} {portfolio2} />
	</div>
	<div class="mb-8 card">
		<h3 class="font-bold mb-2">Asset Allocation Comparison</h3>
		<ComparisonBarChart {portfolio1} {portfolio2} />
	</div>
	<div class="mb-8 card">
		<h3 class="font-bold mb-2">Cost Comparison</h3>
		<ComparisonCostTable {portfolio1} {portfolio2} />
	</div>
</div>
