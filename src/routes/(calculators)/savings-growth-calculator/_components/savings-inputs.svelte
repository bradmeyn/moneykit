<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageSlider from '$lib/components/inputs/percentage-slider.svelte';
	import FrequencySelect from '$lib/components/inputs/frequency-select.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import Label from '$ui/label/label.svelte';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import Explainer from '$ui/explainer.svelte';
	import Slider from '$ui/slider/slider.svelte';

	let calculator = getCalculatorState();
	let {
		fireMode = $bindable(false)
	}: {
		fireMode: boolean;
	} = $props();
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

				<Button class="w-full" variant="secondary" size="sm" onclick={() => (fireMode = !fireMode)}>
					{fireMode ? 'Savings Goal' : 'FIRE Mode'}
					<Explainer
						text={'FIRE (Financial Independence, Retire Early) is typically based on a multiple of your annual expenses by 25 assuming a 4% withdrawal rate.'}
					/>
				</Button>

				{#if fireMode}
					<div class="space-y-2">
						<div>
							<Label for="annual-expenses">Annual Expenses</Label>
							<CurrencyInput bind:value={calculator.annualExpenses} id="annual-expenses" />
						</div>
						<div>
							<Label for="withdrawal-rate">Withdrawal Rate</Label>
							<PercentageSlider
								label="Withdrawal Rate"
								bind:value={calculator.withdrawalRate}
								min={0.02}
								max={0.1}
								step={0.001}
								id="withdrawal-rate"
								explainer="Safe withdrawal rate for FIRE (usually 4%)"
								precision={2}
							/>
						</div>
						<div>
							<Label for="fire-multiplier">FIRE Multiplier</Label>
							<Input
								id="fire-multiplier"
								name="fire-multiplier"
								type="number"
								min="0"
								bind:value={calculator.fireMultiplier}
							/>

							<div>
								<div class="flex gap-2 mb-2 items-center">
									<Label class="mb-0" id="expense-multiple">Expense Multiple</Label>

									<Explainer
										text="The FIRE multiplier is used to estimate the total amount needed to retire based on your annual expenses."
									/>
								</div>

								<Slider
									type="single"
									bind:value={calculator.fireMultiplier}
									min={1}
									max={100}
									step={1}
									id="fire-multiplier"
								/>

								<div class="text-sm text-muted-foreground mt-1 flex justify-between">
									<span>{calculator.fireMultiplier}</span>
								</div>
							</div>
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
