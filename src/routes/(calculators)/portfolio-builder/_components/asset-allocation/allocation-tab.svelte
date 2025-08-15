<script lang="ts">
	import AssetAllocationChart from './allocation-chart.svelte';
	import AssetAllocationTable from './allocation-table.svelte';
	import type { PortfolioType } from '../../calculator.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();
</script>

<div class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-4">
	<div class="w-full card">
		<h2 class="card-heading">Asset Allocation</h2>
		<AssetAllocationTable {portfolio} />
	</div>
	<AssetAllocationChart {portfolio} />
</div>
