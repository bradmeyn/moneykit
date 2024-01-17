<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';

	// props
	export let income: number = 0;
</script>

<aside class="max-w-[1000px] min-w-[300px] p-3">
	<h2 class="text-2xl bold mb-2">Inputs</h2>
	<CurrencyInput label="Income" bind:value={income} />
</aside>
