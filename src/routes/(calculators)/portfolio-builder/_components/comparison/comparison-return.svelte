<script lang="ts">
	import type { PortfolioType } from '../../calculator.svelte';
	import ComparisonReturnsChart from './comparison-returns-chart.svelte';
	import ComparisonReturnsTable from './comparison-returns-table.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: PortfolioType;
		portfolio2: PortfolioType;
	} = $props();
</script>

<div class="grid grid-cols-1 gap-6">
	<!-- Returns Chart -->
	<div class="card">
		<ComparisonReturnsChart {portfolio1} {portfolio2} />
	</div>
	<!-- Returns Table -->
	<div class="card">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-lg font-semibold">Historical Returns by Year</h3>
		</div>

		<div class="overflow-x-auto">
			<ComparisonReturnsTable {portfolio1} {portfolio2} />
		</div>
	</div>
</div>
