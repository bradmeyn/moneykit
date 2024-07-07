<script lang="ts">
	import Inputs from './Inputs.svelte';
	import TaxRateTable from './TaxRateTable.svelte';
	import { getTaxRates, calculatePersonalTax } from '$lib/utils/formatters';
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
		lowIncomeOffset: 0,
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

<div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
	<aside class="max-w-[600px] min-w-[300px]">
		<Inputs bind:income bind:deductions bind:hasInsurance bind:financialYear />
	</aside>
	<section class="w-full">
		{#if income > 0 && taxRates}
			<Results {results} {taxRates} />
		{:else if taxRates}
			<h2>Tax Rates for {taxRates.name}</h2>
			<TaxRateTable {taxRates} />
		{/if}
	</section>
</div>
