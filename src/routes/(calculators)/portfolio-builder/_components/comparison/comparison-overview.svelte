<script lang="ts">
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';
	import ComparisonOverviewTable from './comparison-overview-table.svelte';
	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();
</script>

<div class="card">
	<h2 class="card-heading">Portfolio Comparison</h2>

	<ComparisonOverviewTable {portfolio1} {portfolio2} />
</div>
