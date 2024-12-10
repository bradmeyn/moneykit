<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	let {
		income = $bindable(0),
		deductions = $bindable(0),
		hasInsurance = $bindable(false),
		hasHelpDebt = $bindable(false)
	}: {
		income?: number;
		deductions?: number;
		hasInsurance?: boolean;
		hasHelpDebt?: boolean;
	} = $props();
</script>

<div class="space-y-3">
	<CurrencyInput label="Income" bind:value={income} />
	<CurrencyInput label="Deductions" bind:value={deductions} />

	<div class="items-top flex space-x-2">
		<Checkbox bind:checked={hasInsurance} name="has-private-health" id="has-private-health" />
		<div class="grid gap-1.5 leading-none">
			<Label
				for="has-private-health"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Private Health Insurance
			</Label>
		</div>
	</div>

	<div class="items-top flex space-x-2">
		<Checkbox bind:checked={hasHelpDebt} />
		<div class="grid gap-1.5 leading-none">
			<Label
				for="terms1"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				HELP
			</Label>
		</div>
	</div>
</div>
