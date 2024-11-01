<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';

	
	interface Props {
		// props
		startingAmount: number;
		drawdown: number;
		interestRate: number;
	}

	let { startingAmount = $bindable(), drawdown = $bindable(), interestRate = $bindable() }: Props = $props();
</script>

<div class="space-y-3">
	<CurrencyInput label="Starting Amount" bind:value={startingAmount} />
	<CurrencyInput label="Annual Drawdown" bind:value={drawdown} />
	<PercentageInput label="Interest Rate" bind:value={interestRate} />
</div>
