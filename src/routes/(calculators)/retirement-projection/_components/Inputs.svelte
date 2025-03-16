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

	import * as Tabs from '$lib/components/ui/tabs';
	import Input from '$ui/input/input.svelte';

	let selectedPerson = $state('person1');
	let hasPartner = $state(false);

	function addPartner() {
		hasPartner = true;
	}
</script>

<aside class="max-w-[1000px] min-w-[300px] space-y-4">
	<h2 class="card-heading">Inputs</h2>

	<Tabs.Root value={selectedPerson} onValueChange={(value) => (selectedPerson = value)}>
		<Tabs.List
			class="w-full border-b border-ui-700 bg-transparent rounded-none flex justify-start p-0"
		>
			<Tabs.Trigger
				value="person1"
				class="bg-transparent px-4 py-2 data-[state=active]:border-b data-[state=active]:bg-transparent border-b-white rounded-none"
				>Person 1</Tabs.Trigger
			>

			{#if hasPartner}
				<Tabs.Trigger
					value="person2"
					class="bg-transparent px-4 py-2 data-[state=active]:border-b data-[state=active]:bg-transparent border-b-white rounded-none"
					>Person 2</Tabs.Trigger
				>
			{/if}

			{#if !hasPartner}
				<Button variant="ghost" size="icon" onclick={addPartner}>+</Button>
			{/if}
		</Tabs.List>
	</Tabs.Root>

	<Tabs.Root value={selectedPerson} onValueChange={(value) => (selectedPerson = value)}>
		<Tabs.Content value="person1">
			<div class="space-y-4">
				<div class="space-y-2">
					<Label for="age1">Current Age</Label>
					<Input id="age1" placeholder="Your age" type="number" value={50} />
				</div>
				<div class="space-y-2">
					<Label for="age1">Retirement Age</Label>
					<Input id="age1" placeholder="Planned retirement age" type="number" value={65} />
				</div>

				<div class="space-y-2">
					<Label for="age2">Superannuation Balance</Label>
					<CurrencyInput id="age2" value={500000} />
				</div>

				<div>
					<Label for="growth-rate">Growth Rate</Label>
					<PercentageInput value={0.075} id="growth-rate" />
				</div>

				<div class="space-y-2">
					<Label for="salary1">Annual Salary</Label>
					<CurrencyInput id="salary1" placeholder="60,000" value={10000} />
				</div>
				<div class="space-y-2">
					<Label for="salary1">Target Retirement Income</Label>
					<CurrencyInput id="salary1" placeholder="60,000" value={10000} />
				</div>
				<div>
					<Label for="retirement-age1">Retirement Age</Label>
					<PercentageInput value={0.075} id="growth-rate" />
				</div>

				<div>
					<Label for="inflation-rate">Inflation Rate</Label>
					<PercentageInput value={0.025} id="inflation-rate" />
				</div>
			</div>
		</Tabs.Content>

		<!-- {#if hasPartner}
			<Tabs.Content value="person2" class="space-y-4 pt-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="age2">Age</Label>
						<CurrencyInput id="age2" placeholder="30" value={10000} />
					</div>

					<div class="space-y-2">
						<Label for="salary2">Annual Salary</Label>
						<CurrencyInput id="salary2" placeholder="60,000" value={10000} />
					</div>

					<div class="space-y-2">
						<Label for="retirement-age2">Retirement Age</Label>
						<CurrencyInput id="retirement-age2" placeholder="65" value={10000} />
					</div>

					<div class="space-y-2">
						<Label for="contributions2">Monthly Contributions</Label>
						<CurrencyInput id="contributions2" placeholder="500" value={10000} />
					</div>
				</div>
			</Tabs.Content>
		{/if} -->
	</Tabs.Root>
</aside>
