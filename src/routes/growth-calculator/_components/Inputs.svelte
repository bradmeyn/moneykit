<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';

	// props
	export let principal: number;
	export let contributionAmount: number;
	export let interestRate: number;
	export let contributionFrequency: number;
	export let years: number;

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = parseInt(input.value);
		if (!isNaN(value) && value >= 0) {
			years = value;
		} else {
			input.value = '';
		}
	}
</script>

<div class="space-y-3">
	<CurrencyInput label="Starting Amount" bind:value={principal} inputClass={'mb-3'} />
	<div class="grid grid-cols-2 gap-2">
		<div class="col-span-2 md:col-span-1">
			<CurrencyInput label="Contributions" bind:value={contributionAmount} inputClass={'w-full'} />
		</div>
		<div class="col-span-2 md:col-span-1">
			<FrequencySelect bind:value={contributionFrequency} name={'Frequency'} />
		</div>
	</div>
	<PercentageInput label="Interest Rate" bind:value={interestRate} />
	<div>
		<label for="years">Years</label>
		<input
			id={'years'}
			on:input={handleInput}
			value={years}
			class="input-base"
			type="number"
			min="0"
		/>
	</div>
</div>
