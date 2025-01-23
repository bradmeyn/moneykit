<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';

	import TabSelect from '$lib/components/inputs/TabSelect.svelte';
	import Slider from '$ui/slider/slider.svelte';

	let calc = getCalculatorState();

	const interestTypeOptions = [
		{ value: 'Variable', label: 'Variable' },
		{ value: 'Fixed', label: 'Fixed' }
	];

	const loanTypeOptions = [
		{ value: 'Principal & Interest', label: 'Principal & Interest' },
		{ value: 'Interest Only', label: 'Interest Only' }
	];

	const periodOptions = Array.from({ length: 5 }, (_, i) => ({
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
		<div class="pb-1">{calc.term} {calc.term > 1 ? 'years' : 'year'}</div>
		<Slider type="single" bind:value={calc.term} max={30} min={1} step={1} />
	</div>
	<div>
		<Label for="loan-type">Loan Type</Label>
		<TabSelect bind:value={calc.loanType} options={loanTypeOptions} name={'type'} />
	</div>
	{#if calc.loanType === 'Interest Only'}
		<div class="space-y-2">
			<Label for="io-term">Interest Only Period (years)</Label>
			<TabSelect bind:value={calc.ioTerm} options={periodOptions} name="io-period" />
		</div>
	{/if}
	<div>
		<Label for="interest-type">Interest Type</Label>
		<TabSelect bind:value={calc.interestType} options={interestTypeOptions} name="interest-type" />
	</div>
	{#if calc.interestType === 'Fixed'}
		<div class="space-y-2">
			<Label for="fixed-term">Fixed Term (years)</Label>
			<TabSelect bind:value={calc.fixedTerm} options={periodOptions} name="fixed-term" />
		</div>
	{/if}
	<!-- <Separator /> -->
</aside>
