<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';

	// props
	export let income: number = 0;
	export let deductions: number = 0;
	export let hasInsurance: boolean = false;
	export let hasHelpDebt: boolean = false;
</script>

<h2 class="mb-2">Inputs</h2>

<div class="space-y-3">
	<CurrencyInput label="Income" bind:value={income} />
	<CurrencyInput label="Deductions" bind:value={deductions} />
	<Checkbox label="Private insurance" bind:checked={hasInsurance} name="private-insurance" />
	<Checkbox label="HELP Loan" bind:checked={hasHelpDebt} name="help-loan" />
</div>
