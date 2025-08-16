<script lang="ts">
	import BarChart from '$lib/components/charts/bar-chart.svelte';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';
	import { assetLabels } from '../../investments';
	import { COLOURS } from '$lib/constants/colours';
	import { formatAsPercentage } from '$utils/formatters';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();

	const assetKeys = [
		'ausEquities',
		'intEquities',
		'ausFixedInterest',
		'intFixedInterest',
		'cash',
		'alternatives'
	];

	let labels = assetKeys.map((key) => assetLabels[key]);

	let datasets = $derived([
		{
			label: 'Portfolio 1',
			data: assetKeys.map((key) => portfolio1?.assetAllocation?.[key] ?? 0),
			backgroundColor: COLOURS[0],
			borderRadius: 5,
			borderWidth: 0
		},
		{
			label: 'Portfolio 2',
			data: assetKeys.map((key) => portfolio2?.assetAllocation?.[key] ?? 0),
			backgroundColor: COLOURS[1],
			borderRadius: 5,
			borderWidth: 0
		}
	]);
</script>

<div class="card">
	<h2 class="card-heading">Portfolio Comparison</h2>

	<BarChart
		{datasets}
		formatter={formatAsPercentage}
		showLegend={true}
		data={labels.map((label, i) => ({
			label,
			value: datasets[0].data[i]
		}))}
	/>
</div>
