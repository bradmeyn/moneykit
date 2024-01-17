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
	<h2 class="text-2xl bold mb-2">Details</h2>
	<CurrencyInput label="Starting Amount" bind:value={principal} />

	<Label class="space-y-1 mb-3">
		<span>Contributions</span>
		<div class="flex items-center">
			<Input let:props class="rounded-r-none rounded-l">
				<Icon icon="carbon:currency-dollar" slot="left" class="w-5 h-5 text-emerald-300" />
				<input type="number" {...props} bind:value={contributionAmount} />
			</Input>
			<Select
				class="rounded-l-none rounded-r w-32 h-full"
				items={frequencyOptions}
				bind:value={contributionFrequency}
			/>
		</div>
	</Label>

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
