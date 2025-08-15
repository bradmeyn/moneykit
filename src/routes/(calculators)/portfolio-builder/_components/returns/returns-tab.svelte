<script lang="ts">
	import ReturnsTable from './returns-table.svelte';
	import ReturnsChart from './returns-chart.svelte';
	import type { PortfolioType } from '../../calculator.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();
</script>

<div class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-4">
	<div class="w-full card">
		<h2 class="card-heading">Returns</h2>
		<ReturnsChart {portfolio} />
	</div>

	<div class="card">
		<ReturnsTable {portfolio} />
	</div>
</div>
