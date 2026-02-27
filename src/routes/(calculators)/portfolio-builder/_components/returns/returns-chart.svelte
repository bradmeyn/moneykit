<script lang="ts">
	import { BarChart } from 'layerchart';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';
	import { formatAsPercentage } from '$lib/utils/formatters';
	import type { PortfolioType } from '../../portfolio.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();

	let chartData = $derived.by(() => {
		const years = Object.keys(portfolio.returns.byYear)
			.map(Number)
			.sort((a, b) => a - b);

		return years.map((year) => ({
			year: year.toString(),
			growth: portfolio.returns.byYear[year].growth,
			distribution: portfolio.returns.byYear[year].distribution
		}));
	});

	const series = [
		{
			key: 'growth',
			label: 'Growth',
			color: COLOURS[0],
			props: { style: `fill: ${COLOURS[0]}` }
		},
		{
			key: 'distribution',
			label: 'Distribution',
			color: COLOURS[1],
			props: { style: `fill: ${COLOURS[1]}` }
		}
	];
</script>

<div class="h-[400px] relative lc-chart">
	<BarChart
		data={chartData}
		x="year"
		{series}
		seriesLayout="stack"
		grid={LC_GRID}
		legend={{ placement: 'top', variant: 'swatches' }}
		props={{
			bars: {
				strokeWidth: 0,
				class: 'stroke-transparent'
			},
			highlight: {
				area: { fill: 'transparent', class: 'pointer-events-none' }
			},
			xAxis: { ...LC_AXIS_PROPS, label: 'Year', format: 'none' },
			yAxis: { ...LC_AXIS_PROPS, label: 'Returns', format: (v: unknown) => formatAsPercentage(Number(v)) },
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
