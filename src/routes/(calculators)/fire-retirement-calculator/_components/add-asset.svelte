<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import { v4 as uuid } from 'uuid';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import Label from '$ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import PercentageInput from '$lib/components/inputs/percentage-input.svelte';

	const assetTypes = ['Cash', 'Investment Property', 'Shares'];

	let calc = getCalculatorState();

	let open = $state(false);

	let asset = $state({
		id: uuid(),
		name: '',
		value: 0,
		type: 'Shares',
		expectedReturn: 0,
		rentalIncome: 0
	});

	function handleSave() {
		// Save the asset to the calculator state
		calc.investments.push(asset);
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="mb-2 w-full">
		<Button size="sm" variant="secondary" class="w-full mt-2" onclick={() => (open = true)}>
			Add Asset
		</Button>
	</Dialog.Trigger>

	<Dialog.Content>
		<h1>New Asset</h1>

		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="retirement-age">Name</Label>
				<Input id="asset-name" placeholder="Personal Portfolio" bind:value={asset.name} />
			</div>
			<div class="space-y-2">
				<Label for="asset-value">Value</Label>
				<CurrencyInput id="asset-value" placeholder="60,000" bind:value={asset.value} />
			</div>
			<div class="space-y-2">
				<Label for="asset-type">Type</Label>
				<Select.Root
					value={asset.type}
					onValueChange={(value) => (asset.type = value)}
					type="single"
				>
					<Select.Trigger id="asset-type" placeholder="Select asset type" value={asset.type}>
						{asset.type ? asset.type : 'Select'}
					</Select.Trigger>
					<Select.Content>
						{#each assetTypes as type}
							<Select.Item value={type}>{type}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="space-y-2">
				<Label for="expected-return">Expected Return (p.a)</Label>
				<PercentageInput
					id="expected-return"
					placeholder="Expected return"
					bind:value={asset.expectedReturn}
				/>
			</div>
			{#if asset.type === 'Investment Property'}
				<div class="space-y-2">
					<Label for="rental-income">Rental Income (p.a)</Label>
					<CurrencyInput
						id="rental-income"
						placeholder="Expected return"
						bind:value={asset.rentalIncome}
					/>
				</div>
			{/if}

			<Button onclick={handleSave} class="w-full mt-8">Save</Button>
		</div></Dialog.Content
	>
</Dialog.Root>
