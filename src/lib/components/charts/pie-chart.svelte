<script lang="ts">
	import { PieChart } from 'layerchart';
	import { COLOURS } from '$lib/constants/colours';
	import { LC_TOOLTIP_PROPS } from '$constants/chart-config';

	let {
		data,
		formatter
	}: {
		data: { label: string; value: number }[];
		formatter?: (value: number) => string;
	} = $props();

	let cRange = $derived(data.map((_, i) => COLOURS[i % COLOURS.length]));
</script>

<div class="w-full relative h-[220px] md:h-[260px] min-w-[200px] lc-chart">
	<PieChart
		{data}
		key="label"
		value="value"
		{cRange}
		cornerRadius={3}
		padAngle={0.02}
		props={{
			tooltip: {
				...LC_TOOLTIP_PROPS,
				...(formatter
					? {
							item: {
								...LC_TOOLTIP_PROPS.item,
								format: (value: unknown) => formatter(Number(value))
							}
						}
					: {})
			}
		}}
	/>
</div>

<style>
	.lc-chart :global(svg) {
		font-family: var(--font-ui);
	}
</style>
