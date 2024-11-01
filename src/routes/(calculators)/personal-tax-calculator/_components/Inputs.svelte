<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';

	
	interface Props {
		// props
		income?: number;
		deductions?: number;
		hasInsurance?: boolean;
		hasHelpDebt?: boolean;
	}

	let {
		income = $bindable(0),
		deductions = $bindable(0),
		hasInsurance = $bindable(false),
		hasHelpDebt = $bindable(false)
	}: Props = $props();
</script>

<div class="space-y-3">
	<CurrencyInput label="Income" bind:value={income} />
	<CurrencyInput label="Deductions" bind:value={deductions} />
	<Checkbox label="Private insurance" bind:checked={hasInsurance} name="private-insurance" />
	<Checkbox label="HELP Loan" bind:checked={hasHelpDebt} name="help-loan" />
</div>
