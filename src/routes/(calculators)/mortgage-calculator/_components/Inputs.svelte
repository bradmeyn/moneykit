<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import TabSelect from '$lib/components/inputs/TabSelect.svelte';
	import Separator from '$lib/components/Separator.svelte';

	let calc = getCalculatorState();

	const interestTypeOptions = [
		{ value: 'Variable', label: 'Variable' },
		{ value: 'Fixed', label: 'Fixed' }
	];

	const loanTypeOptions = [
		{ value: 'Principal & Interest', label: 'Principal & Interest' },
		{ value: 'Interest Only', label: 'Interest Only' }
	];

	const periodOptions = Array.from({ length: 7 }, (_, i) => ({
		value: (i + 1).toString(),
		label: (i + 1).toString()
	}));
</script>

<aside class="max-w-[1000px] min-w-[300px] space-y-4">
	<h2 class="card-heading">Inputs</h2>
	<CurrencyInput bind:value={calc.principal} id="principal" label="Principal" />

	<PercentageInput bind:value={calc.interestRate} label="Interest Rate" />
	<div>
		<Label for="term">Term</Label>
		<Input
			id="term"
			name="term"
			type="number"
			min="0"
			bind:value={calc.term}
			onfocus={(e) => e.currentTarget.select()}
		/>
	</div>
	<div>
		<Label for="loan-type">Loan Type</Label>
		<TabSelect bind:value={calc.loanType} options={loanTypeOptions} />
	</div>
	<div>
		<Label for="interest-type">Interest Type</Label>
		<TabSelect bind:value={calc.interestType} options={interestTypeOptions} />
	</div>
	{#if calc.interestType === 'Fixed' || calc.loanType === 'Interest Only'}
		<div class="space-y-2">
			<Label for="fixed-term">Fixed/Interest Only Period (Years)</Label>
			<TabSelect bind:value={calc.fixedTerm} options={periodOptions} />
		</div>
	{/if}
	<!-- <Separator /> -->
</aside>
