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
</script>

<aside class="max-w-[1000px] min-w-[300px]">
	<Accordion.Root type="single" class="w-full" value="inputs">
		<Accordion.Item value="inputs">
			<Accordion.Trigger class="border-b ">
				<h2 class="card-heading">Inputs</h2>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 py-2">
				<div>
					<Label for="principal">Starting Amount</Label>
					<CurrencyInput bind:value={calculator.principal} id="principal" />
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
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

				<Button class="w-full" variant="secondary" size="sm" onclick={toggleComparison}>
					{isComparing ? 'Hide' : 'Compare'}
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

					<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
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
