<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Icon from '@iconify/svelte';
	import { FREQUENCY_OPTIONS } from '$lib/constants';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';

	// props
	export let principal: number;
	export let contributionAmount: number;
	export let interestRate: number;
	export let contributionFrequency: number;
	export let years: number;
</script>

<div class="space-y-3">
	<CurrencyInput label="Starting Amount" bind:value={principal} inputClass={'mb-3'} />

	<div class="grid grid-cols-2 gap-2">
		<div class="col-span-2 lg:col-span-1">
			<CurrencyInput label="Contributions" bind:value={contributionAmount} inputClass={'w-full'} />
		</div>
		<div class="col-span-2 md:col-span-1">
			<FrequencySelect bind:value={contributionFrequency} name={'Frequency'} />
		</div>
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
