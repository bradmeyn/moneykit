<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { Label, Input, Select, NumberInput } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { FREQUENCY_OPTIONS } from '$lib/constants';

	// props
	export let principal: number;
	export let contributionAmount: number;
	export let interestRate: number;
	export let contributionFrequency: number;
	export let years: number;
</script>

<aside class="max-w-[1000px] min-w-[300px] p-3">
	<h2 class="text-2xl bold mb-2">Details</h2>
	<CurrencyInput label="Starting Amount" bind:value={principal} inputClass={'mb-3'} />

	<div class="flex items-center mb-3">
		<CurrencyInput label="Contributions" bind:value={contributionAmount} inputClass={'w-full'} />
		<Label defaultClass="ml-2 space-y-1">
			<div class="text-sm text-slate-200">Frequency</div>
			<Select
				class="w-32 h-full  rounded"
				items={FREQUENCY_OPTIONS}
				bind:value={contributionFrequency}
			/>
		</Label>
	</div>

	<Label class="space-y-1 mb-3">
		<span>Annual Return</span>
		<Input let:props class="rounded">
			<Icon icon="carbon:percentage" slot="right" class="w-5 h-5 text-emerald-300" />
			<input type="number" {...props} bind:value={interestRate} />
		</Input>
	</Label>

	<Label class="space-y-1 mb-3">
		<span>Years</span>
		<NumberInput bind:value={years} class="rounded" />
	</Label>
</aside>
