<script lang="ts">
	import { getCalculatorState } from '../../calculator.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import PercentageSlider from '$lib/components/inputs/percentage-slider.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import Explainer from '$ui/explainer.svelte';

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

	<div>
		<Label for="current-investments">Current Investments</Label>
		<CurrencyInput bind:value={calculator.currentInvestments} id="current-investments" />
	</div>

	<div>
		<Label for="contributions">Monthly Contributions</Label>
		<CurrencyInput bind:value={calculator.contributions} id="contributions" />
	</div>

	<PercentageSlider
		label="Investment Return (p.a.)"
		bind:value={calculator.growthRate}
		min={0.03}
		max={0.12}
		step={0.005}
		id="growth-rate"
		explainer="Expected annual return on investments. Historical stock market average is ~7-10%"
		precision={1}
	/>

	<PercentageSlider
		label="Inflation Rate (p.a.)"
		bind:value={calculator.inflationRate}
		min={0.01}
		max={0.05}
		step={0.001}
		id="inflation-rate"
		explainer="Expected annual inflation. Historical average is ~2-3%"
		precision={1}
	/>

	<div>
		<Label for="expenses">Annual Expenses</Label>
		<CurrencyInput bind:value={calculator.expenses} id="expenses" />
	</div>

	<PercentageSlider
		label="Withdrawal Rate"
		bind:value={calculator.withdrawalRate}
		min={0.02}
		max={0.06}
		step={0.0025}
		id="withdrawal-rate"
		explainer="Balance withdrawal percentage for retirement e.g $1,000,000 @ 4.00% = $40,000"
		precision={2}
	/>

	<hr />

	<Button class="w-full" variant="secondary" size="sm" {onclick}>
		<div class="flex items-center gap-2">
			<span>{baristaFi ? 'Switch to FIRE' : 'Enable Barista/Coast FI'}</span>
			{#if !baristaFi}
				<Explainer text="Incorporates a secondary income to supplement withdrawals" />
			{/if}
		</div>
	</Button>

	{#if baristaFi}
		<div>
			<Label for="secondary-income">Secondary Income</Label>
			<CurrencyInput bind:value={calculator.secondaryIncome} id="secondary-income" />
		</div>
	{/if}
</aside>
