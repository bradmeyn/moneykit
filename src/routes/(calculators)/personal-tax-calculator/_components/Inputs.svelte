<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { getCalculatorState } from '../calculator.svelte';

	const calculator = getCalculatorState();
</script>

<div class="space-y-4">
	<div>
		<Label for="income">Income</Label>
		<CurrencyInput id="income" bind:value={calculator.income} />
	</div>

	<div>
		<Label for="deductions">Deductions</Label>
		<CurrencyInput id="deductions" bind:value={calculator.deductions} />
	</div>

	<Label class="flex items-center space-x-2 px-2">
		<Checkbox
			bind:checked={calculator.hasInsurance}
			name="has-private-health"
			id="has-private-health"
		/>
		<span
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Private Health Insurance
		</span>
	</Label>

	<Label class="flex items-center space-x-2 px-2">
		<Checkbox bind:checked={calculator.hasHelpDebt} id="help-debt" />
		<span
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			HELP Loan
		</span>
	</Label>
</div>
