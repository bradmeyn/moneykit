<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Icon from '@iconify/svelte';
	import { FREQUENCY_OPTIONS } from '$lib/constants';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import FrequencyInput from '$lib/components/inputs/FrequencySelect.svelte';

	// props
	export let principal: number;
	export let contributionAmount: number;
	export let interestRate: number;
	export let contributionFrequency: number;
	export let years: number;
</script>

<div class="space-y-3">
	<CurrencyInput label="Starting Amount" bind:value={principal} inputClass={'mb-3'} />

	<div class="flex gap-2 items-center">
		<CurrencyInput label="Contributions" bind:value={contributionAmount} inputClass={'w-full'} />
		<FrequencyInput bind:value={contributionFrequency} name={'frequency'} />
	</div>

	<PercentageInput label="Interest Rate" bind:value={interestRate} />

	<div>
		<label class="mb-1 block" for="years">Years</label>
		<input
			id={'years'}
			bind:value={years}
			type="number"
			class="relative px-2 rounded-md sm:text-sm flex bg-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-brand-default w-full"
		/>
	</div>
</div>
