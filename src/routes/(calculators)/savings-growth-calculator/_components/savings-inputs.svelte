<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageSlider from '$lib/components/inputs/percentage-slider.svelte';
	import FrequencySelect from '$lib/components/inputs/frequency-select.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import Label from '$ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import Explainer from '$ui/explainer.svelte';
	import Slider from '$ui/slider/slider.svelte';

	let calculator = getCalculatorState();
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
						<CurrencyInput id="contributions" bind:value={calculator.contributionAmount} />
					</div>
					<div>
						<Label for="frequency">Frequency</Label>
						<FrequencySelect
							bind:value={calculator.contributionFrequency}
							id="frequency"
							name="frequency"
						/>
					</div>
				</div>

				<PercentageSlider
					label="Investment Return (p.a.)"
					bind:value={calculator.returnRate}
					min={0.01}
					max={0.15}
					step={0.005}
					id="interest-rate"
					explainer="Expected annual return on investments"
					precision={1}
				/>

				<div>
					<div class="flex gap-2 mb-2 items-center">
						<Label class="mb-0" id="years-invested">Years Invested</Label>

						<Explainer text="The number of years you plan to invest before reaching your goal." />
					</div>

					<Slider
						type="single"
						bind:value={calculator.years}
						min={1}
						max={100}
						step={1}
						id="years-invested"
					/>

					<div class="text-sm text-muted-foreground mt-1 flex justify-between">
						<span>{calculator.years}</span>
					</div>
				</div>

				<Button
					class="w-full"
					variant="secondary"
					size="sm"
					onclick={() => (calculator.fireMode = !calculator.fireMode)}
				>
					{calculator.fireMode ? 'Savings Goal' : 'FIRE Mode'}
					{#if calculator.fireMode}
						<Explainer
							text="Calculate how much you need to retire early based on your annual expenses and safe withdrawal rate."
						/>
					{:else}
						<Explainer text="Calculate how long it will take to reach your savings goal." />
					{/if}
				</Button>

				{#if calculator.fireMode}
					<div class="space-y-4">
						<div>
							<Label for="annual-expenses">Annual Expenses</Label>
							<CurrencyInput bind:value={calculator.annualExpenses} id="annual-expenses" />
						</div>
						<div>
							<PercentageSlider
								label="Withdrawal Rate"
								bind:value={calculator.withdrawalRate}
								min={0.02}
								max={0.1}
								step={0.005}
								id="withdrawal-rate"
								explainer="Safe withdrawal rate for FIRE (usually 4%)"
								precision={2}
							/>
						</div>
					</div>
				{:else}
					<div>
						<Label for="savings-goal">Savings Goal</Label>
						<CurrencyInput bind:value={calculator.savingsGoal} id="savings-goal" />
					</div>
				{/if}

				<Button
					class="w-full"
					variant="secondary"
					size="sm"
					onclick={() => (calculator.useVolatility = !calculator.useVolatility)}
				>
					{calculator.useVolatility ? 'Hide' : 'Add'} Volatility
					<Explainer
						text="Include market volatility in the calculations for more realistic returns."
					/>
				</Button>

				{#if calculator.useVolatility}
					<h2 class="card-heading">Market Volatility</h2>

					<PercentageSlider
						label="Volatility (Standard Deviation)"
						bind:value={calculator.volatility}
						min={0.05}
						max={0.4}
						step={0.01}
						id="volatility"
						explainer="Higher values create more realistic but unpredictable returns. Stock markets typically have 15-20% volatility."
						precision={0}
					/>

					<!-- <Button variant="outline" size="sm" class="w-full">🎲 Generate New Random Returns</Button> -->
				{/if}
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</aside>
