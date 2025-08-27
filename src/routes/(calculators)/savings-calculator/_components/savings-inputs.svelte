<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageSlider from '$lib/components/inputs/percentage-slider.svelte';
	import FrequencySelect from '$lib/components/inputs/frequency-select.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';

	let calculator = getCalculatorState();
	let {
		isComparing = $bindable(false)
	}: {
		isComparing: boolean;
	} = $props();

	function toggleComparison() {
		calculator.toggleComparison(isComparing);
		isComparing = !isComparing;
	}

	function refreshVolatility() {
		calculator.recalculate();
	}
</script>

<aside class="max-w-[1000px] min-w-[300px]">
	<Accordion.Root type="single" class="w-full" value="inputs">
		<Accordion.Item value="inputs">
			<Accordion.Trigger class="border-b">
				<h2 class="card-heading">Inputs</h2>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 py-2">
				<div>
					<Label for="principal">Starting Amount</Label>
					<CurrencyInput bind:value={calculator.principal} id="principal" />
				</div>

				<div class="grid grid-cols-2 gap-2">
					<div>
						<Label for="contributions">Contributions</Label>
						<CurrencyInput
							id="contributions"
							onchange={(value) => calculator.updateBase({ contributionAmount: value })}
							value={calculator.baseScenario.contributionAmount}
						/>
					</div>
					<div>
						<Label for="frequency">Frequency</Label>
						<FrequencySelect
							value={calculator.baseScenario.contributionFrequency}
							onchange={(value) => calculator.updateBase({ contributionFrequency: value })}
							id="frequency"
							name="frequency"
						/>
					</div>
				</div>

				<PercentageSlider
					label="Investment Return (p.a.)"
					bind:value={calculator.baseScenario.interestRate}
					min={0.01}
					max={0.15}
					step={0.005}
					id="interest-rate"
					explainer="Expected annual return on investments"
					precision={1}
				/>

				<div>
					<Label for="years">Years Invested</Label>
					<Input
						id="years"
						name="years"
						type="number"
						min="0"
						bind:value={calculator.years}
						onfocus={(e) => e.currentTarget.select()}
					/>
				</div>

				<div>
					<Label for="savings-goal">Savings Goal</Label>
					<CurrencyInput bind:value={calculator.savingsGoal} id="savings-goal" />
				</div>

				<Button
					class="w-full"
					variant="secondary"
					size="sm"
					onclick={() => (calculator.useVolatility = !calculator.useVolatility)}
				>
					{calculator.useVolatility ? 'Hide' : 'Add'} Volatility
				</Button>

				{#if calculator.useVolatility}
					<h2 class="card-heading">Market Volatility</h2>

					<PercentageSlider
						label="Volatility (Standard Deviation)"
						bind:value={calculator.baseScenario.volatility}
						min={0.05}
						max={0.4}
						step={0.01}
						id="volatility"
						explainer="Higher values create more realistic but unpredictable returns. Stock markets typically have 15-20% volatility."
						precision={0}
					/>

					<Button variant="outline" size="sm" onclick={refreshVolatility} class="w-full">
						🎲 Generate New Random Returns
					</Button>
				{/if}

				<Button class="w-full" variant="secondary" size="sm" onclick={toggleComparison}>
					{isComparing ? 'Hide' : 'Add'} Comparison
				</Button>

				{#if isComparing}
					<h2 class="card-heading">Comparison</h2>

					<PercentageSlider
						label="Interest Rate"
						bind:value={calculator.comparisonScenario.interestRate}
						min={0.01}
						max={0.15}
						step={0.005}
						id="comparison-interest-rate"
						explainer="Expected annual return for comparison scenario"
						precision={1}
					/>

					{#if calculator.useVolatility}
						<PercentageSlider
							label="Volatility"
							bind:value={calculator.comparisonScenario.volatility}
							min={0.05}
							max={0.4}
							step={0.01}
							id="comparison-volatility"
							explainer="Volatility for comparison scenario"
							precision={0}
						/>
					{/if}

					<div class="grid grid-cols-2 gap-2">
						<div>
							<Label for="comparison-contributions">Contributions</Label>
							<CurrencyInput
								id="comparison-contributions"
								onchange={(value) => calculator.updateComparison({ contributionAmount: value })}
								value={calculator.comparisonScenario.contributionAmount}
							/>
						</div>

						<div>
							<Label for="comparison-frequency">Frequency</Label>
							<FrequencySelect
								value={calculator.comparisonScenario.contributionFrequency}
								onchange={(value) => calculator.updateComparison({ contributionFrequency: value })}
								id="comparison-frequency"
								name="frequency"
							/>
						</div>
					</div>
				{/if}
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</aside>
