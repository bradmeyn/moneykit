<script lang="ts">
	import { LineChart } from 'layerchart';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../calculator.svelte';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';

	let {
		annualData = [],
		savingsGoal
	}: {
		annualData: AnnualData[];
		savingsGoal: number;
	} = $props();

	let chartData = $derived(
		annualData.map((item) => ({
			...item,
			goal: savingsGoal || null
		}))
	);

	let series = $derived.by(() => {
		const baseColor = COLOURS[0];
		const goalColor = COLOURS[1];

		const result = [
			{
				key: 'endingValue',
				label: 'Value',
				color: baseColor,
				props: {
					style: `stroke: ${baseColor}; fill: none; stroke-linecap: round; stroke-linejoin: round;`,
					strokeWidth: 3
				}
			}
		];

		if (savingsGoal) {
			result.push({
				key: 'goal',
				label: 'Goal',
				color: goalColor,
				props: {
					style: `stroke: ${goalColor}; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 7 6;`,
					strokeWidth: 2
				}
			});
		}

		return result;
	});
</script>

<div class="h-[400px] lg:h-[500px] growth-layerchart lc-chart">
	<LineChart
		data={chartData}
		x="year"
		y="endingValue"
		{series}
		grid={LC_GRID}
		legend={{ placement: 'top', variant: 'swatches' }}
		points={false}
		padding={{ top: 4, left: 80, bottom: 20, right: 4 }}
		props={{
			xAxis: {
				...LC_AXIS_PROPS,
				label: 'Year',
				format: (value: unknown) => String(Math.round(Number(value)))
			},
			yAxis: {
				...LC_AXIS_PROPS,
				format: (value: unknown) => formatAsCurrency(Number(value), false)
			},
			tooltip: LC_TOOLTIP_PROPS,
			legend: {
				classes: { label: 'text-foreground text-sm', swatch: 'size-2.5' }
			}
		}}
	/>
</div>
