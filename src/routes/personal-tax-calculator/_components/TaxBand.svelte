<script lang="ts">
	import type { TaxRateConfiguration } from '$lib/types';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils';

	export let taxRates: TaxRateConfiguration;
	export let taxableIncome: number;

	// Calculate the total range of the tax brackets, taking care to handle the Infinity value for the upper bound.
	const totalRange = taxRates.incomeTax.brackets.reduce((acc, curr) => {
		const max = curr.max === Infinity ? taxableIncome : curr.max;
		return acc + max - curr.min;
	}, 0);

	// Get the width of each band as a percentage of the total range
	const getBandWidth = (band) => {
		const bandRange = band.max === Infinity ? totalRange : band.max - band.min;
		return (100 * bandRange) / totalRange;
	};

	// Define colors for each tax rate bracket
	const colors = ['rgb(30 41 59', '#10B981', '#A7F3D0', '#065F46', '#065F46'];
</script>

<div class="tax-band-container w-full bg-slate-800">
	{#each taxRates.incomeTax.brackets as band, i}
		<div class="tax-band p-4" style="background: {colors[i]}; width: {getBandWidth(band)}%">
			<div>{formatAsCurrency(band.max, false, true)}</div>

			<div>{formatAsPercentage(band.rate)}</div>
		</div>
	{/each}
</div>

<style>
	.tax-band-container {
		display: flex;

		overflow: hidden;
	}

	.tax-band {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		flex-direction: column;
		transition: width 2s ease;
	}
</style>
