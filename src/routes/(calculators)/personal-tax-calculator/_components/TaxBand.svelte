<script lang="ts">
	import { run } from 'svelte/legacy';

	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { INCOME_TAX_BRACKETS } from '../taxRates';

	interface Props {
		taxableIncome: number;
	}

	let { taxableIncome }: Props = $props();

	// Calculate the maximum defined range for bands not considering Infinity
	let maxDefinedRange = $derived(
		Math.max(...INCOME_TAX_BRACKETS.map((b) => (b.max !== Infinity ? b.max : 0)))
	);

	// Dynamic calculation of income ranges
	let incomeRanges = $derived(
		INCOME_TAX_BRACKETS.map((band, index, arr) => {
			const min = index === 0 ? 0 : arr[index - 1].max;
			const max = band.max === Infinity ? maxDefinedRange * 1.2 : band.max;
			return max - min;
		})
	);

	// Calculate total range for percentage calculations
	let totalRange = $derived(incomeRanges.reduce((sum, range) => sum + range, 0));

	run(() => {
		if (incomeRanges.length > 1) {
			const lastIndex = incomeRanges.length - 1;
			incomeRanges[lastIndex] = incomeRanges[lastIndex - 1] * 0.4; // Make last bracket 50% of previous
		}
	});

	// Reactive calculation for band widths and income fills
	let bands = $derived(
		INCOME_TAX_BRACKETS.map((band, index) => {
			const max = band.max === Infinity ? maxDefinedRange * 1.2 : band.max;
			const range = incomeRanges[index];
			const widthPercent = (range / totalRange) * 100;

			// Calculate fill percentage within the band
			let fillPercent = 0;
			if (taxableIncome > band.min) {
				if (index === INCOME_TAX_BRACKETS.length - 1 || taxableIncome >= max) {
					fillPercent = 100; // Fill completely if it's the highest bracket or taxable income exceeds max
				} else {
					fillPercent = Math.min(((taxableIncome - band.min) / range) * 100, 100);
				}
			}

			return { ...band, widthPercent, fillPercent };
		})
	);
</script>

<div class="space-y-2">
	<div class="h-full rounded flex items-end">
		{#each bands as { min, max, rate, widthPercent }, i}
			<div
				class="border-r border-ui-600 last:border-r-0 text-baseline text-left p-2 relative"
				style="width: {widthPercent}%;"
			>
				{#if max === Infinity}
					<div class="text-ui-300 text-sm">Over</div>
					<div class="text-ui-300 text-sm">{formatAsCurrency(min - 1, false)}</div>
				{:else}
					<div class="text-sm text-ui-300">{formatAsCurrency(min, false)} -</div>
					<div class="text-sm text-ui-300">{formatAsCurrency(max, false)}</div>
				{/if}
				<div class="text-lg font-semibold">{formatAsPercentage(rate)}</div>
			</div>
		{/each}
	</div>

	<div class="border border-ui-600 h-6 rounded flex overflow-hidden">
		{#each bands as { fillPercent, widthPercent }, i}
			<div class="relative h-full" style="width: {widthPercent}%;">
				<div class="absolute inset-0 bg-brand" style="width: {fillPercent}%;"></div>
			</div>
		{/each}
	</div>
</div>
