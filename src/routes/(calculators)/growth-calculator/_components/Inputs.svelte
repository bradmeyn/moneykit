<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$ui/separator/separator.svelte';

	let calculator = getCalculatorState();
	let {
		isComparing = $bindable(false)
	}: {
		isComparing: boolean;
	} = $props();

	function toggleComparison() {
		calculator.toggleComparison(isComparing);
		isComparing = !isComparing;
	}
</script>

<aside class="max-w-[1000px] min-w-[300px] space-y-4">
	<h2 class="card-heading">Inputs</h2>
	<CurrencyInput bind:value={calculator.principal} id="principal" label="Principal" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<CurrencyInput
			onChange={(value) => calculator.updateBase({ contributionAmount: value })}
			label="Contributions"
			value={calculator.baseScenario.contributionAmount}
		/>
		<FrequencySelect
			value={calculator.baseScenario.contributionFrequency}
			onChange={(value) => calculator.updateBase({ contributionFrequency: value })}
			label="Frequency"
			id="frequency"
			name="frequency"
		/>
	</div>
	<PercentageInput
		onChange={(value) => calculator.updateBase({ interestRate: value })}
		value={calculator.baseScenario.interestRate}
		label="Interest Rate"
	/>
	<div>
		<Label for="years">Years</Label>
		<Input
			id="years"
			name="years"
			type="number"
			min="0"
			bind:value={calculator.years}
			onfocus={(e) => e.currentTarget.select()}
		/>
	</div>
	<Separator />
	<div>
		<CurrencyInput bind:value={calculator.savingsGoal} label="Savings Goal" id="savings-goal" />
	</div>
	<Separator />
	<Button class=" w-full" variant="secondary" size="sm" onclick={toggleComparison}>
		{isComparing ? 'Hide' : 'Compare'}</Button
	>
	{#if isComparing}
		<h2 class="card-heading">Comparison</h2>
		<PercentageInput
			onChange={(value) => calculator.updateComparison({ interestRate: value })}
			value={calculator.comparisonScenario.interestRate}
			label="Interest Rate"
			id="comparison-interest-rate"
		/>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<CurrencyInput
				onChange={(value) => calculator.updateComparison({ contributionAmount: value })}
				label="Contributions"
				value={calculator.comparisonScenario.contributionAmount}
				id="comparison-contributions"
			/>
			<FrequencySelect
				value={calculator.comparisonScenario.contributionFrequency}
				onChange={(value) => calculator.updateComparison({ contributionFrequency: value })}
				label="Frequency"
				id="comparison-frequency"
				name="frequency"
			/>
		</div>
	{/if}
</aside>
