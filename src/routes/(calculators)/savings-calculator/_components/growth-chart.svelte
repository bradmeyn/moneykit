<script lang="ts">
	import { LineChart, Tooltip } from 'layerchart';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../calculator.svelte';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS, LC_AXIS_PROPS, LC_GRID } from '$constants/chart-config';

	let {
		annualData = [],
		savingsGoal,
		bandData = null
	}: {
		annualData: AnnualData[];
		savingsGoal: number;
		bandData?: { year: number; low: number; high: number }[] | null;
	} = $props();

	let chartData = $derived(
		annualData.map((item, i) => ({
			...item,
			goal: savingsGoal || null,
			bandLow: bandData?.[i]?.low ?? null,
			bandHigh: bandData?.[i]?.high ?? null
		}))
	);

	let series = $derived.by(() => {
		const baseColor = COLOURS[0];
		const goalColor = COLOURS[1];
		const bandColor = COLOURS[0];

		const result = [];

		if (bandData) {
			result.push(
				{
					key: 'bandHigh',
					label: 'Optimistic',
					color: bandColor,
					props: {
						style: `stroke: ${bandColor}; fill: none; stroke-dasharray: 4 4; opacity: 0.35;`,
						strokeWidth: 1.5
					}
				},
				{
					key: 'bandLow',
					label: 'Pessimistic',
					color: bandColor,
					props: {
						style: `stroke: ${bandColor}; fill: none; stroke-dasharray: 4 4; opacity: 0.35;`,
						strokeWidth: 1.5
					}
				}
			);
		}

		result.push({
			key: 'endingValue',
			label: 'Value',
			color: baseColor,
			props: {
				style: `stroke: ${baseColor}; fill: none; stroke-linecap: round; stroke-linejoin: round;`,
				strokeWidth: 3
			}
		});

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

<div class="h-100 relative md:h-80 lg:h-100 min-w-50 border overflow-hidden p-4 rounded-2xl">
	<LineChart
		data={chartData}
		x="year"
		y="endingValue"
		{series}
		grid={LC_GRID}
		legend={{ placement: 'top', variant: 'swatches' }}
		points={false}
		padding={{ left: 60, right: 20, top: 40, bottom: 40 }}
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
			legend: {
				classes: { label: 'text-foreground text-sm', swatch: 'size-2.5' }
			}
		}}
	>
		{#snippet tooltip({ context })}
			<Tooltip.Root {context} {...LC_TOOLTIP_PROPS.root}>
				{#snippet children({ payload })}
					<Tooltip.Header
						value={`Year ${Math.round(Number(payload[0]?.label))}`}
						{...LC_TOOLTIP_PROPS.header}
					/>
					<Tooltip.List>
						{#each payload as p, i (p.key ?? i)}
							<Tooltip.Item
								label={p.name}
								value={p.value}
								color={p.color}
								format={(v: unknown) => formatAsCurrency(Number(v), false)}
								valueAlign="right"
								{...LC_TOOLTIP_PROPS.item}
							/>
						{/each}
						{#if payload.length > 1}
							<Tooltip.Separator />
							<Tooltip.Item
								label="Total"
								value={payload.reduce((acc, p) => acc + Number(p.value ?? 0), 0)}
								format={(v: unknown) => formatAsCurrency(Number(v), false)}
								valueAlign="right"
								{...LC_TOOLTIP_PROPS.item}
							/>
						{/if}
					</Tooltip.List>
				{/snippet}
			</Tooltip.Root>
		{/snippet}
	</LineChart>
</div>
