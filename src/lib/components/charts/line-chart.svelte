<script lang="ts">
	import { LineChart } from 'layerchart';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';
	import { browser } from '$app/environment';

	let {
		datasets,
		labels,
		formatter,
		showLegend = false,
		enableTooltip = false
	}: {
		datasets: {
			label: string;
			data: number[];
			borderColor?: string;
			backgroundColor?: string;
			borderWidth?: number;
		}[];
		labels: string[];
		formatter: (value: number) => string;
		showLegend?: boolean;
		enableTooltip?: boolean;
	} = $props();

	let chartData = $derived(
		labels.map((label, i) => {
			const row: Record<string, unknown> = { x: label };
			datasets.forEach((ds) => {
				row[ds.label] = ds.data[i] ?? 0;
			});
			return row;
		})
	);

	let series = $derived(
		datasets.map((ds, i) => {
			const color = ds.borderColor ?? ds.backgroundColor ?? COLOURS[i % COLOURS.length];
			return {
				key: ds.label,
				label: ds.label,
				color,
				props: {
					style: `stroke: ${color}; fill: none; stroke-linecap: round; stroke-linejoin: round;`,
					strokeWidth: ds.borderWidth ?? 2
				}
			};
		})
	);
</script>

{#if browser}
<div class="h-[400px] relative lc-chart">
	<LineChart
		data={chartData}
		x="x"
		{series}
		grid={LC_GRID}
		points={false}
		legend={showLegend ? { placement: 'top', variant: 'swatches' } : false}
		props={{
			xAxis: { ...LC_AXIS_PROPS, format: 'none' },
			yAxis: { ...LC_AXIS_PROPS, format: (v: unknown) => formatter(Number(v)) },
			tooltip: enableTooltip ? LC_TOOLTIP_PROPS : { root: { class: 'hidden' } },
			legend: {
				classes: { label: 'text-foreground text-sm', swatch: 'size-2.5' }
			}
		}}
	/>
</div>
{/if}

<style>
	.lc-chart :global(svg) {
		font-family: var(--font-ui);
	}
</style>
