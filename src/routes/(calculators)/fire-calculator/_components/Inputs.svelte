<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$ui/separator/separator.svelte';

	let calculator = getCalculatorState();
	let baristaFi = $state(false);
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
	<PercentageInput
		bind:value={calculator.withdrawalRate}
		id="withdrawal-rate"
		label="Withdrawal Rate"
	/>

	<Separator />
	<Button class=" w-full" variant="secondary" size="sm" onclick={() => (baristaFi = !baristaFi)}>
		{baristaFi ? 'FIRE' : 'BaristaFI'}</Button
	>
	{#if baristaFi}
		<h2 class="card-heading">BaristaFI</h2>

		<div>
			<CurrencyInput label="Secondary Income" value={0} id="secondary-income" />
		</div>
	{/if}
</aside>
