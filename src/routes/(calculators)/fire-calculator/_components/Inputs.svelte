<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$ui/separator/separator.svelte';
	import Explainer from '$lib/components/Explainer.svelte';

	let calculator = getCalculatorState();
	let baristaFi = $state(false);

	function onclick() {
		baristaFi = !baristaFi;
		calculator.secondaryIncome = 0;
	}
</script>

<aside class="max-w-[1000px] min-w-[300px] space-y-4">
	<h2 class="card-heading">Inputs</h2>
	<div>
		<Label for="age">Age</Label>

		<Input id="age" name="age" bind:value={calculator.age} type="number" />
	</div>
	<CurrencyInput
		bind:value={calculator.currentInvestments}
		id="current-investments"
		label="Current Investments"
	/>
	<CurrencyInput
		bind:value={calculator.contributions}
		id="contributions"
		label="Monthly Contributions"
	/>
	<PercentageInput bind:value={calculator.growthRate} id="growth-rate" label="Investment Growth" />
	<PercentageInput bind:value={calculator.inflationRate} id="inflation-rate" label="Inflation" />
	<CurrencyInput bind:value={calculator.expenses} id="expenses" label="Annual Expenses" />

	<div>
		<div class="flex gap-2 mb-2 items-center">
			<Label class="mb-0" for="withdrawal-rate">Withdrawal Rate</Label>
			<Explainer
				text="Balance withdrawal percentage for retirement e.g $1,000,000 @ 4.00% = $40,000"
			/>
		</div>
		<PercentageInput bind:value={calculator.withdrawalRate} id="withdrawal-rate" />
	</div>

	<Separator />
	<Button class=" w-full " variant="secondary" size="sm" {onclick}>
		<div>
			{baristaFi ? 'FIRE' : 'Barista/Coast FI'}
		</div>
		{#if !baristaFi}
			<Explainer text="Incorporates a secondary income to supplement withdrawals" />
		{/if}
	</Button>
	{#if baristaFi}
		<div>
			<CurrencyInput
				label="Secondary Income"
				bind:value={calculator.secondaryIncome}
				id="secondary-income"
			/>
		</div>
	{/if}
</aside>
