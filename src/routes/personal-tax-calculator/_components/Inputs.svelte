<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { TAX_YEARS } from '$lib/constants';

	// props
	export let income: number = 0;
	export let deductions: number = 0;
	export let hasInsurance: boolean = false;
	export let financialYear: number = 2024;
</script>

<h2 class="mb-2">Inputs</h2>

<div class="space-y-3">
	<div>
		<label for="financial-year">Financial Year</label>
		<select id="financial-year" bind:value={financialYear}>
			{#each TAX_YEARS as option}
				<option value={option.value}>{option.name}</option>
			{/each}
		</select>
	</div>
	<CurrencyInput label="Income" bind:value={income} />
	<CurrencyInput label="Deductions" bind:value={deductions} />
	<Checkbox label="Private insurance" bind:checked={hasInsurance} name="private-insurance" />
</div>
