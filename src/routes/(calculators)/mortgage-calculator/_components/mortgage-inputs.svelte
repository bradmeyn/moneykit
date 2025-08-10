<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageSlider from '$lib/components/inputs/percentage-slider.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import Label from '$ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import Button from '$ui/button/button.svelte';
	import TabSelect from '$lib/components/inputs/tab-select.svelte';
	import Slider from '$ui/slider/slider.svelte';
	import { FREQUENCIES } from '$lib/constants/frequencies';

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

	<div>
		<Label for="principal">Principal</Label>
		<CurrencyInput bind:value={calc.principal} id="principal" />
	</div>

	<PercentageSlider
		label="Interest Rate"
		bind:value={calc.interestRate}
		min={0.01}
		max={0.15}
		step={0.0025}
		id="interest-rate"
		explainer="Annual interest rate on your mortgage"
		precision={2}
	/>

	<div>
		<Label for="term">Term</Label>

		<Slider type="single" bind:value={calc.term} max={30} min={1} step={1} id="term" />
		<div class="text-sm text-muted-foreground">
			{calc.term}
			{calc.term > 1 ? 'years' : 'year'}
		</div>
	</div>

	<hr />

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

	<div>
		<Label for="extra-repayment">Extra Repayments</Label>
		<CurrencyInput bind:value={calc.extraRepayments} id="extra-repayment" />
	</div>

	<hr />
	<div>
		<Label for="loan-type">Loan Type</Label>
		<TabSelect bind:value={calc.loanType} options={loanTypeOptions} name={'type'} />
	</div>

	{#if calc.loanType === 'Interest Only'}
		<PercentageSlider
			label="Interest Only Rate"
			bind:value={calc.ioRate}
			min={0.01}
			max={0.15}
			step={0.0025}
			id="io-rate"
			explainer="Interest rate during interest-only period"
			precision={2}
		/>

		<div class="space-y-2">
			<Label for="io-term">Interest Only Period (years)</Label>
			<TabSelect bind:value={calc.ioTerm} options={periodOptions} name="io-period" />
		</div>
	{/if}

	<hr />

	<Button class="w-full" variant="secondary" size="sm" onclick={toggleProperty}>
		{includeProperty ? 'Hide Property' : 'Include Property'}
	</Button>

	{#if includeProperty}
		<div>
			<Label for="property-value">Property Value</Label>
			<CurrencyInput bind:value={calc.propertyValue} id="property-value" />
		</div>

		<PercentageSlider
			label="Property Growth (p.a.)"
			bind:value={calc.propertyGrowthRate}
			min={0.0}
			max={0.1}
			step={0.005}
			id="property-growth"
			explainer="Expected annual property value growth"
			precision={1}
		/>
	{/if}
</aside>
