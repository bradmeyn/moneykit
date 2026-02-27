<script lang="ts">
	import { BarChart } from 'layerchart';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';

	let {
		data,
		datasets,
		labels,
		formatter,
		showLegend = false,
		enableTooltip = false,
		legendPlacement = 'top',
		hideTooltipTotal = false
	}: {
		data?: { label: string; value: number }[];
		datasets?: {
			label: string;
			data: number[];
			backgroundColor?: string | string[];
		}[];
		labels: string[];
		formatter: (value: number) => string;
		showLegend?: boolean;
		enableTooltip?: boolean;
		legendPlacement?: 'top' | 'bottom' | 'left' | 'right';
		hideTooltipTotal?: boolean;
	} = $props();

	let tooltipProps = $derived.by(() => {
		if (!enableTooltip) {
			return { root: { class: 'hidden' } };
		}
		return {
			...LC_TOOLTIP_PROPS,
			hideTotal: hideTooltipTotal,
			item: {
				...LC_TOOLTIP_PROPS.item,
				format: (v: unknown) => formatter(Number(v))
			}
		};
	});

	let chartData = $derived.by(() => {
		if (datasets) {
			return labels.map((label, i) => {
				const row: Record<string, unknown> = { x: label };
				datasets.forEach((ds) => {
					row[ds.label] = ds.data[i] ?? 0;
				});
				return row;
			});
		}
		if (data) {
			const row: Record<string, unknown> = { x: labels[0] ?? 'Total' };
			data.forEach((d) => {
				row[d.label] = d.value;
			});
			return [row];
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
			return data.map((d, i) => {
				const color = COLOURS[i % COLOURS.length];
				return {
					key: d.label,
					label: d.label,
					color,
					props: { style: `fill: ${color}` }
				};
			});
		}
		return [];
	});
</script>

<div class="h-[400px] relative lc-chart">
	<BarChart
		data={chartData}
		x="x"
		{series}
		seriesLayout="stack"
		grid={LC_GRID}
		legend={showLegend ? { placement: legendPlacement, variant: 'swatches' } : false}
		props={{
			bars: {
				strokeWidth: 0,
				class: 'stroke-transparent'
			},
			highlight: {
				area: { fill: 'transparent', class: 'pointer-events-none' }
			},
			xAxis: { ...LC_AXIS_PROPS, format: 'none' },
			yAxis: { ...LC_AXIS_PROPS, format: (v: unknown) => formatter(Number(v)) },
			tooltip: tooltipProps,
			legend: {
				classes: { label: 'text-foreground text-sm', swatch: 'size-2.5' }
			}
		}}
	/>
</div>
