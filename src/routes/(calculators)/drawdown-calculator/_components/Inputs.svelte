<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';

	let {
		startingAmount = $bindable(),
		drawdown = $bindable(),
		interestRate = $bindable()
	}: {
		startingAmount: number;
		drawdown: number;
		interestRate: number;
	} = $props();
</script>

<div class="space-y-3">
	<CurrencyInput label="Starting Amount" bind:value={startingAmount} />
	<CurrencyInput label="Annual Drawdown" bind:value={drawdown} />
	<PercentageInput label="Interest Rate" bind:value={interestRate} />
</div>
