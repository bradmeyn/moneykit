<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import Label from '$ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import Button from '$ui/button/button.svelte';
	import TabSelect from '$lib/components/inputs/TabSelect.svelte';
	import Slider from '$ui/slider/slider.svelte';
	import { FREQUENCIES } from '$lib/constants/frequencies';
	import Separator from '$lib/components/Separator.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tabs from '$lib/components/ui/tabs';
	import Input from '$ui/input/input.svelte';

	let calc = getCalculatorState();
</script>

<aside class="space-y-4">
	<h2 class="card-heading">Inputs</h2>

	<Accordion.Root type="multiple" class="w-full" value={['personal-details']}>
		<!-- Personal Details Section -->
		<Accordion.Item value="personal-details">
			<Accordion.Trigger
				class="flex justify-between w-full px-4 py-2 text-left font-medium bg-ui-900 hover:bg-ui-700 rounded"
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
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Financial Details Section -->
		<Accordion.Item value="financial-details">
			<Accordion.Trigger
				class="flex justify-between w-full px-4 py-2 text-left font-medium bg-ui-900 hover:bg-ui-700 rounded"
			>
				Financial Details
			</Accordion.Trigger>
			<Accordion.Content class="px-4 pt-2 pb-4">
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="super-balance">Superannuation Balance</Label>
						<CurrencyInput id="super-balance" bind:value={calc.superannuationBalance} />
					</div>
					<div class="space-y-2">
						<Label for="salary1">Annual Salary</Label>
						<CurrencyInput id="salary1" placeholder="60,000" bind:value={calc.currentIncome} />
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Market Assumptions Section -->
		<Accordion.Item value="market-assumptions">
			<Accordion.Trigger
				class="flex justify-between w-full px-4 py-2 text-left font-medium bg-ui-900 hover:bg-ui-700 rounded"
			>
				Market Assumptions
			</Accordion.Trigger>
			<Accordion.Content class="px-4 pt-2 pb-4">
				<div class="space-y-4">
					<div>
						<Label for="growth-rate">Accumulation Return</Label>
						<PercentageInput value={calc.accumulationReturn} id="growth-rate" />
					</div>
					<div>
						<Label for="growth-rate">Pension Return</Label>
						<PercentageInput value={calc.retirementReturn} id="growth-rate" />
					</div>
					<div>
						<Label for="inflation-rate">Inflation Rate</Label>
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
