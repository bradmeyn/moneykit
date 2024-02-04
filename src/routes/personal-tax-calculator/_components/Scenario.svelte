<script lang="ts">
	import Inputs from './Inputs.svelte';
	import TaxRateTable from './TaxRateTable.svelte';
	import { getTaxRates, calculateCompoundInterest, calculatePersonalTax } from '$lib/utils';
	import Results from './Results.svelte';

	// Inputs
	let financialYear = 2023;
	let income = 0;
	let deductions = 0;
	let hasInsurance = false;

	$: taxRates = getTaxRates(financialYear);

	// Results
	let results = {
		income: 0,
		deductions: 0,
		incomeTax: 0,
		medicareLevy: 0,
		medicareLevySurcharge: 0,
		totalTax: 0
	};

	$: {
		results = calculatePersonalTax({
			income,
			deductions,
			hasInsurance,
			//@ts-ignore - Can only get rates from taxRates if it exists
			taxRates
		});
	}
</script>

<div class="md:flex gap-10">
	<aside class="max-w-[1000px] min-w-[300px]">
		<Inputs bind:income bind:deductions bind:hasInsurance bind:financialYear />
	</aside>
	<section class="w-full flex flex-col">
		{#if income > 0}
			<Results {results} />
		{:else if taxRates}
			<TaxRateTable {taxRates} />
		{/if}
	</section>
</div>
