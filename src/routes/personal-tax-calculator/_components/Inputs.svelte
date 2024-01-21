<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { Checkbox, Select, Label } from 'flowbite-svelte';
	import { FINANCIAL_YEARS } from '$lib/constants';

	// props
	export let income: number = 0;
	export let deductions: number = 0;
	export let hasInsurance: boolean = false;
	export let financialYear: number = 2024;
</script>

<aside class="max-w-[1000px] min-w-[300px] p-3">
	<h2 class="text-2xl bold mb-2">Inputs</h2>

	<Label defaultClass="mb-4 space-y-1 block">
		<div class="text-sm text-slate-200">Financial Year</div>
		<Select class="h-full  rounded" items={FINANCIAL_YEARS} bind:value={financialYear} />
	</Label>

	<CurrencyInput label="Taxable Income" bind:value={income} inputClass={'mb-4'} />
	<CurrencyInput label="Deductions" bind:value={deductions} inputClass={'mb-4'} />
	<Checkbox label="Private insurance" bind:checked={hasInsurance}>Private insurance</Checkbox>
</aside>
