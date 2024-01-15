<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { Label, Input, Select, NumberInput } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	// props
	export let income: number;
</script>

<aside class="max-w-[1000px] min-w-[300px] p-3">
	<h2 class="text-2xl bold mb-2">Details</h2>
	<CurrencyInput label="Starting Amount" bind:value={income} />
</aside>
