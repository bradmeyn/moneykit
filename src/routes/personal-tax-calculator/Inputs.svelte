<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { Label, Input, Select, NumberInput } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { frequencyOptions } from '$lib/utils';

	// props
	export let principal: number;
	export let contributionAmount: number;
	export let interestRate: number;
	export let contributionFrequency: number;
	export let years: number;
</script>

<aside class="max-w-[1000px] min-w-[300px] p-3">
	<h2 class="text-2xl bold mb-2">Inputs</h2>
	<CurrencyInput label="Starting Amount" bind:value={principal} />
</aside>
