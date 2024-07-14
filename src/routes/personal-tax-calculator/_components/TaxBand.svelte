<script lang="ts">
	import type { TaxRateConfiguration } from '../../portfolio-builder/types';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';

	export let taxRates: TaxRateConfiguration;
	export let taxableIncome: number;

	// Calculate the maximum defined range for bands not considering Infinity
	$: maxDefinedRange = Math.max(
		...taxRates.incomeTax.brackets.map((b) => (b.max !== Infinity ? b.max : 0))
	);

	// Reactive calculation for band widths and income fills
	$: bands = taxRates.incomeTax.brackets.map((band) => {
		const max = band.max === Infinity ? maxDefinedRange * 1.2 : band.max; // Extend the last band if it's Infinity
		const range = max - band.min;
		const totalRange = maxDefinedRange - taxRates.incomeTax.brackets[0].min;
		const widthPercent = (range / totalRange) * 100;

		// Calculate fill percentage within the band
		let fillPercent = 0;
		if (taxableIncome > band.min) {
			fillPercent = taxableIncome <= max ? ((taxableIncome - band.min) / range) * 100 : 100;
		}

		return { ...band, widthPercent, fillPercent };
	});
</script>

<div
	class="h-54 flex border-slate-500 flex-col-reverse mx-auto bg-slate-800 rounded-lg overflow-hidden shadow-lg"
>
	{#each bands as { min, max, rate, widthPercent, fillPercent }, i}
		<div
			class="tax-band border-t border-slate-400 last:border-t-transparent text-md text-left font-semibold p-4 relative"
			style="height: {widthPercent}%; background: linear-gradient(to top, #065F46 0%, #065F46 {fillPercent}%, transparent {fillPercent}%, transparent 100%)"
		>
			{#if max === Infinity}
				<div>Over {formatAsCurrency(min, false, true)}</div>
			{:else}
				<div>
					{formatAsCurrency(min, false, true)} - {formatAsCurrency(max, false, true)}
				</div>
			{/if}
			<div class="text-2xl">{formatAsPercentage(rate)}</div>
		</div>
	{/each}
</div>
