<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { Checkbox, Select, Label } from 'flowbite-svelte';
	import { TAX_YEARS } from '$lib/constants';

	// props
	export let income: number = 0;
	export let deductions: number = 0;
	export let hasInsurance: boolean = false;
	export let financialYear: number = 2024;
</script>

<h2 class="text-2xl bold mb-2">Inputs</h2>

<Label defaultClass="mb-4 space-y-1 block">
	<div class="text-sm text-slate-200">Financial Year</div>
	<Select class="h-full  rounded" items={TAX_YEARS} bind:value={financialYear} />
</Label>

<CurrencyInput label="Income" bind:value={income} inputClass={'mb-4'} />
<CurrencyInput label="Deductions" bind:value={deductions} inputClass={'mb-4'} />
<Checkbox label="Private insurance" bind:checked={hasInsurance}>Private insurance</Checkbox>
