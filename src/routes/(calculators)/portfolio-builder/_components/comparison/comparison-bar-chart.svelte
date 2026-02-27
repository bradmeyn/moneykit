<script lang="ts">
	import { BarChart } from 'layerchart';
	import { assetLabels } from '../../investments';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';
	import type { PortfolioType } from '../../portfolio.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: PortfolioType;
		portfolio2: PortfolioType;
	} = $props();

	const assetKeys = [
		'ausEquities',
		'intEquities',
		'ausFixedInterest',
		'intFixedInterest',
		'cash',
		'alternatives'
	] as const;

	let chartData = $derived(
		assetKeys.map((key) => ({
			asset: assetLabels[key],
			p1: portfolio1?.assetAllocation?.[key] ?? 0,
			p2: portfolio2?.assetAllocation?.[key] ?? 0
		}))
	);

	const series = [
		{
			key: 'p1',
			label: 'Portfolio 1',
			color: COLOURS[0],
			props: { style: `fill: ${COLOURS[0]}` }
		},
		{
			key: 'p2',
			label: 'Portfolio 2',
			color: COLOURS[1],
			props: { style: `fill: ${COLOURS[1]}` }
		}
	];
</script>

<div class="h-[400px] md:h-[500px] min-w-[200px] lc-chart">
	<BarChart
		data={chartData}
		x="asset"
		{series}
		seriesLayout="group"
		grid={LC_GRID}
		legend={{ placement: 'top', variant: 'swatches' }}
		props={{
			bars: { radius: 3, strokeWidth: 0, class: 'stroke-transparent' },
			highlight: {
				area: { fill: 'transparent', class: 'pointer-events-none' }
			},
			xAxis: { ...LC_AXIS_PROPS, format: 'none' },
			yAxis: { ...LC_AXIS_PROPS, format: (v: unknown) => `${(Number(v) * 100).toFixed(0)}%` },
			tooltip: LC_TOOLTIP_PROPS,
			legend: {
				classes: { label: 'text-foreground text-sm', swatch: 'size-2.5' }
			}
		}}
	/>
</div>

<style>
	.lc-chart :global(svg) {
		font-family: var(--font-ui);
	}
</style>
