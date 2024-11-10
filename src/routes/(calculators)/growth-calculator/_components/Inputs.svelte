<script lang="ts">
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { type GrowthScenario } from '../calculator.svelte';
	const { scenario = $bindable() }: { scenario: GrowthScenario } = $props();
</script>

<div class="space-y-3">
	<CurrencyInput bind:value={scenario.principal} id="principal" label="Principal" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<CurrencyInput bind:value={scenario.contributionAmount} label="Contributions" />
		<FrequencySelect bind:value={scenario.contributionFrequency} label="Frequency" />
	</div>
	<PercentageInput bind:value={scenario.interestRate} label="Interest Rate" />

	<div>
		<Label for="years">Years</Label>
		<Input
			id="years"
			type="number"
			min="0"
			bind:value={scenario.years}
			onfocus={(e) => e.currentTarget.select()}
		/>
	</div>
</div>
