<script lang="ts">
	import type { PortfolioType } from '../../calculator.svelte';
	import { formatAsCurrency } from '$utils/formatters';
	import CostTable from './cost-table.svelte';
	import StackedBar from '$lib/components/charts/stacked-bar.svelte';
	import LineChart from '$lib/components/charts/line-chart.svelte';

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

	// Project total cost compounding over 30 years
	const years = Array.from({ length: 30 }, (_, i) => `Year ${i + 1}`);
	const annualGrowthRate = 0.05; // 5% default
	const initialTotalCost = $derived(
		portfolio.holdings
			.filter((h) => h.investment.symbol !== 'CASH')
			.reduce((sum, h) => sum + h.cost, 0)
	);
	const totalCostProjection = $derived(
		Array.from({ length: 30 }, (_, i) => initialTotalCost * Math.pow(1 + annualGrowthRate, i))
	);
	const projectedDataset = $derived({
		label: 'Total Cost',
		data: totalCostProjection
	});
</script>

<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mt-4">
	<div class="w-full card">
		<h2 class="card-heading">Investment Costs</h2>
		<CostTable {portfolio} />
	</div>

	<div class="card">
		<h2 class="card-heading">Cost Breakdown</h2>
		<StackedBar
			enableTooltip
			showLegend
			{data}
			labels={['Total Cost']}
			formatter={formatAsCurrency}
		/>
	</div>
</div>

<div class="card mt-4">
	<h2 class="card-heading">Total Portfolio Cost Projection (30 Years)</h2>
	<LineChart
		datasets={[projectedDataset]}
		labels={years}
		formatter={formatAsCurrency}
		showLegend
		enableTooltip
	/>
</div>
