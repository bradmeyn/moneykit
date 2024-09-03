<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';

	// props
	export let startingAmount: number;
	export let drawdown: number;
	export let interestRate: number;
</script>

<div class="space-y-3">
	<CurrencyInput label="Starting Amount" bind:value={startingAmount} />
	<CurrencyInput label="Annual Drawdown" bind:value={drawdown} />
	<PercentageInput label="Interest Rate" bind:value={interestRate} />
</div>
