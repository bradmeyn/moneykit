<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import Button from '$ui/button/button.svelte';
	import TabSelect from '$lib/components/inputs/TabSelect.svelte';
	import Slider from '$ui/slider/slider.svelte';
	import { FREQUENCIES } from '$lib/constants/frequencies';
	import Separator from '$lib/components/Separator.svelte';
	let calc = getCalculatorState();

	const loanTypeOptions = [
		{ value: 'Principal & Interest', label: 'Principal & Interest' },
		{ value: 'Interest Only', label: 'Interest Only' }
	];

	const periodOptions = Array.from({ length: 5 }, (_, i) => ({
		value: (i + 1).toString(),
		label: (i + 1).toString()
	}));

	let includeProperty = $state(false);
	function toggleProperty() {
		calc.propertyValue = includeProperty ? 0 : 800000;
		includeProperty = !includeProperty;
	}
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
	<Separator />
	<div>
		<Label for="repayment-frequency">Repayment Frequency</Label>
		<Select.Root name="repayment-frequency" type="single" bind:value={calc.frequency}>
			<Select.Trigger id="repayment-frequency">
				{calc.frequency ? FREQUENCIES[calc.frequency].label : 'Select'}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value={'weekly'}>Weekly</Select.Item>
				<Select.Item value={'fortnightly'}>Fortnightly</Select.Item>
				<Select.Item value={'monthly'}>Monthly</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<CurrencyInput bind:value={calc.extraRepayments} id="extra-repayment" label="Extra Repayments" />
	<Separator />
	<div>
		<Label for="loan-type">Loan Type</Label>
		<TabSelect bind:value={calc.loanType} options={loanTypeOptions} name={'type'} />
	</div>

	{#if calc.loanType === 'Interest Only'}
		<PercentageInput bind:value={calc.ioRate} label="Interest Only Rate" />
		<div class="space-y-2">
			<Label for="io-term">Interest Only Period (years)</Label>
			<TabSelect bind:value={calc.ioTerm} options={periodOptions} name="io-period" />
		</div>
	{/if}

	<Separator />
	<Button class=" w-full" variant="secondary" size="sm" onclick={toggleProperty}>
		{includeProperty ? 'Hide Property' : 'Include Property'}</Button
	>
	{#if includeProperty}
		<CurrencyInput bind:value={calc.propertyValue} id="property-value" label="Property Value" />
		<PercentageInput
			bind:value={calc.propertyGrowthRate}
			id="property-growth"
			label="Property Growth Rate"
		/>
	{/if}
</aside>
