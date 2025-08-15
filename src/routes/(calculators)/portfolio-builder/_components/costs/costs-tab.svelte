<script lang="ts">
	import type { PortfolioType } from '../../calculator.svelte';
	import { formatAsCurrency } from '$utils/formatters';
	import CostTable from './cost-table.svelte';
	import StackedBar from '$lib/components/charts/stacked-bar.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();

	const data = $derived(
		portfolio.holdings
			.filter((h) => h.investment.symbol !== 'CASH')
			.sort((a, b) => b.cost - a.cost)
			.map((h) => ({
				label: h.investment.symbol,
				value: h.cost
			}))
	);
</script>

<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mt-4">
	<div class="w-full card">
		<h2 class="card-heading">Costs</h2>
		<CostTable {portfolio} />
	</div>

	<div class="card">
		<StackedBar {data} labels={['Total Cost']} formatter={formatAsCurrency} />
		<LegendList {data} formatter={formatAsCurrency} />
	</div>
</div>
