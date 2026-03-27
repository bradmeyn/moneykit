<script lang="ts">
	import { BarChart } from 'layerchart';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';
	import { browser } from '$app/environment';

	let {
		data,
		datasets,
		formatter,
		showLegend = false
	}: {
		data?: { label: string; value: number }[];
		datasets?: {
			label: string;
			data: number[];
			backgroundColor?: string | string[];
		}[];
		formatter: (value: number) => string;
		showLegend?: boolean;
	} = $props();

	let chartData = $derived.by(() => {
		if (datasets) {
			const labels =
				data?.map((d) => d.label) ?? datasets[0]?.data.map((_, i) => `Item ${i + 1}`) ?? [];
			return labels.map((label, i) => {
				const row: Record<string, unknown> = { x: label };
				datasets.forEach((ds) => {
					row[ds.label] = ds.data[i] ?? 0;
				});
				return row;
			});
		}
		if (data) {
			return data.map((d) => ({ x: d.label, value: d.value }));
		}
		return [];
	});

	let series = $derived.by(() => {
		if (datasets) {
			return datasets.map((ds, i) => {
				const color =
					(typeof ds.backgroundColor === 'string'
						? ds.backgroundColor
						: ds.backgroundColor?.[0]) ?? COLOURS[i % COLOURS.length];
				return {
					key: ds.label,
					label: ds.label,
					color,
					props: { style: `fill: ${color}` }
				};
			});
		}
		if (data) {
			const color = COLOURS[0];
			return [{ key: 'value', label: '', color, props: { style: `fill: ${color}` } }];
		}
		return undefined;
	});
</script>

{#if browser}
<div class="h-[400px] md:h-[500px] min-w-[200px] lc-chart">
	<BarChart
		data={chartData}
		x="x"
		{series}
		seriesLayout="group"
		grid={LC_GRID}
		legend={showLegend ? { placement: 'top', variant: 'swatches' } : false}
		props={{
			bars: { radius: 3, strokeWidth: 0, class: 'stroke-transparent' },
			highlight: {
				area: { fill: 'transparent', class: 'pointer-events-none' }
			},
			xAxis: { ...LC_AXIS_PROPS, format: 'none' },
			yAxis: { ...LC_AXIS_PROPS, format: (v: unknown) => formatter(Number(v)) },
			tooltip: LC_TOOLTIP_PROPS,
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
