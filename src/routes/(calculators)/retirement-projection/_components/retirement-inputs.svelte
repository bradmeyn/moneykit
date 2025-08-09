<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/percentage-input.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import Label from '$ui/label/label.svelte';

	import * as Accordion from '$lib/components/ui/accordion';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import Input from '$ui/input/input.svelte';
	import AddAsset from './add-asset.svelte';
	import { formatAsCurrency } from '$utils/formatters';
	import Button from '$ui/button/button.svelte';
	import { Trash2 } from 'lucide-svelte';

	let calc = getCalculatorState();
</script>

<aside class="space-y-4">
	<h2 class="card-heading">Inputs</h2>

	<Accordion.Root type="multiple" class="w-full" value={['retirement-details']}>
		<!-- Personal Details Section -->
		<Accordion.Item value="retirement-details">
			<Accordion.Trigger
				class="flex justify-between w-full px-4 py-2 text-left font-medium border-b rounded"
			>
				Personal Details
			</Accordion.Trigger>
			<Accordion.Content class="px-4 pt-2 pb-4">
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="age">Current Age</Label>
						<Input id="age" placeholder="Your age" type="number" bind:value={calc.age} />
					</div>
					<div class="space-y-2">
						<Label for="retirement-age">Retirement Age</Label>
						<Input
							id="retirement-age"
							placeholder="Planned retirement age"
							type="number"
							bind:value={calc.retirementAge}
						/>
					</div>
					<div class="space-y-2">
						<Label for="target-income">Target Retirement Income</Label>
						<CurrencyInput
							id="target-income"
							placeholder="60,000"
							bind:value={calc.retirementIncome}
						/>
					</div>
					<div class="space-y-2">
						<Label for="super-balance">Superannuation Balance</Label>
						<CurrencyInput id="super-balance" bind:value={calc.superannuationBalance} />
					</div>
					<div class="space-y-2">
						<Label for="salary1">Annual Salary</Label>
						<CurrencyInput id="salary1" placeholder="60,000" bind:value={calc.currentIncome} />
					</div>
					<Label class="flex items-center space-x-2 px-2 text-white">
						<Checkbox bind:checked={calc.isHomeOwner} name="is-home-owner" id="is-home-owner" />
						<span
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Home Owner
						</span>
					</Label>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Financial Details Section -->
		<Accordion.Item value="financial-details">
			<Accordion.Trigger
				class="flex justify-between w-full px-4 py-2 text-left font-medium border-b rounded"
			>
				Other Assets
			</Accordion.Trigger>
			<Accordion.Content class="px-4 pt-2 pb-4">
				<div>
					{#each calc.investments as investment}
						<div class=" border-b py-2 flex items-center justify-between">
							<div>
								<small class="text-sm">{investment.name}</small>
								<div>{formatAsCurrency(investment.value)}</div>
							</div>

							<Button
								size="icon"
								variant="ghost"
								class="text-muted-foreground hover:text-red-500"
								onclick={() => calc.removeInvestment(investment.id)}
							>
								<Trash2 class="size-4" />
							</Button>
						</div>
					{/each}

					<AddAsset />
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Market Assumptions Section -->
		<Accordion.Item value="market-assumptions">
			<Accordion.Trigger
				class="flex justify-between w-full px-4 py-2 text-left font-medium border-b rounded"
			>
				Assumptions
			</Accordion.Trigger>
			<Accordion.Content class="px-4 pt-2 pb-4">
				<div class="space-y-4">
					<div>
						<Label for="growth-rate">Pre-Retirement Return (p.a.)</Label>
						<PercentageInput value={calc.accumulationReturn} id="growth-rate" />
					</div>
					<div>
						<Label for="growth-rate">Retirement Return (p.a.)</Label>
						<PercentageInput value={calc.retirementReturn} id="growth-rate" />
					</div>
					<div>
						<Label for="inflation-rate">Inflation Rate (p.a.)</Label>
						<PercentageInput bind:value={calc.inflationRate} id="inflation-rate" />
					</div>
					<div>
						<Label for="sg-rate">Super Guarantee Rate</Label>
						<PercentageInput bind:value={calc.sgRate} id="sg-rate" />
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</aside>
