<script lang="ts">
	import {
		formatAsCurrency,
		parseCurrency,
		formatAsPercentage,
		parsePercentage
	} from '$lib/utils/formatters';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import type { FrequencyType } from '$lib/constants/frequencies';
	import { FREQUENCIES, FREQUENCY_ENUM } from '$lib/constants/frequencies';

	type Props = {
		principal: number;
		contributionAmount: number;
		interestRate: number;
		contributionFrequency: FrequencyType;
		years: number;
	};

	let {
		principal = $bindable(),
		contributionAmount = $bindable(),
		interestRate = $bindable(),
		contributionFrequency = $bindable(),
		years = $bindable()
	}: Props = $props();

	// State for input display values
	let principalInput = $state(formatAsCurrency(principal));
	let contributionInput = $state(formatAsCurrency(contributionAmount));
	let rateInput = $state(formatAsPercentage(interestRate * 100));

	function handleCurrencyInput(event: Event, field: 'principal' | 'contributionAmount') {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value;
		const numericValue = parseCurrency(rawValue);

		if (field === 'principal') {
			principal = numericValue;
		} else {
			contributionAmount = numericValue;
		}
	}

	function handleCurrencyBlur(field: 'principal' | 'contributionAmount') {
		if (field === 'principal') {
			principalInput = formatAsCurrency(principal);
		} else {
			contributionInput = formatAsCurrency(contributionAmount);
		}
	}

	function handleRateInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value.replace(/[^\d.]/g, '');
		const numericValue = parsePercentage(rawValue);
		if (!isNaN(numericValue)) {
			interestRate = numericValue;
		}
	}

	function handleRateBlur() {
		rateInput = formatAsPercentage(interestRate * 100);
	}
</script>

<div class="space-y-3">
	<div>
		<Label for="principal">Principal</Label>
		<Input
			id="principal"
			value={principalInput}
			onchange={(e) => handleCurrencyInput(e, 'principal')}
			onblur={() => handleCurrencyBlur('principal')}
			onfocus={(e) => e.currentTarget.select()}
		/>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<div>
			<Label for="contributionAmount">Contributions</Label>
			<Input
				id="contributionAmount"
				value={contributionInput}
				onchange={(e) => handleCurrencyInput(e, 'contributionAmount')}
				onblur={() => handleCurrencyBlur('contributionAmount')}
				onfocus={(e) => e.currentTarget.select()}
			/>
		</div>

		<div>
			<Label for="frequency">Frequency</Label>
			<Select.Root onValueChange={(value) => (contributionFrequency = value)}>
				<Select.Trigger>{FREQUENCIES[contributionFrequency].label}</Select.Trigger>
				<Select.Content>
					{#each FREQUENCY_ENUM as freq}
						<Select.Item value={freq}>{FREQUENCIES[freq].label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>

	<div>
		<Label for="interestRate">Interest Rate</Label>
		<Input
			id="interestRate"
			value={rateInput}
			onchange={handleRateInput}
			onblur={handleRateBlur}
			onfocus={(e) => e.currentTarget.select()}
		/>
	</div>

	<div>
		<Label for="years">Years</Label>
		<Input
			id="years"
			type="number"
			min="0"
			bind:value={years}
			onfocus={(e) => e.currentTarget.select()}
		/>
	</div>
</div>
