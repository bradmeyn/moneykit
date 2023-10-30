<script lang="ts">
	import { Label, Input, Select, NumberInput } from 'flowbite-svelte';
	import { FREQUENCY_OPTIONS } from '$lib/const';
	import Icon from '@iconify/svelte';

	// props
	export let principal: number;
	export let contributionAmount: number;
	export let interestRate: number;
	export let contributionFrequency: number;
	export let years: number;
</script>

<aside class="max-w-[1000px] min-w-[300px] p-3">
	<h2 class="text-2xl bold mb-2">Inputs</h2>
	<Label class="space-y-1 mb-3">
		<span>Starting amount</span>
		<Input let:props class="rounded-none" size="lg">
			<Icon icon="carbon:currency-dollar" slot="left" class="w-4 h-4" />
			<input type="number" {...props} bind:value={principal} />
		</Input>
	</Label>

	<Label class="space-y-1 mb-3">
		<span>Contributions</span>
		<div class="flex items-center">
			<Input let:props class="rounded-none" size="lg">
				<Icon icon="carbon:currency-dollar" slot="left" class="w-4 h-4" />
				<input type="number" {...props} bind:value={contributionAmount} />
			</Input>
			<Select
				class="rounded-none w-32"
				items={FREQUENCY_OPTIONS}
				bind:value={contributionFrequency}
			/>
		</div>
	</Label>

	<Label class="space-y-1 mb-3">
		<span>Annual Return</span>
		<Input let:props class="rounded-none" size="lg">
			<Icon icon="carbon:percentage" slot="right" class="w-4 h-4" />
			<input type="number" {...props} bind:value={interestRate} />
		</Input>
	</Label>

	<Label class="space-y-1 mb-3">
		<span>Years</span>
		<NumberInput class="rounded-none" bind:value={years} size="lg" />
	</Label>
</aside>
