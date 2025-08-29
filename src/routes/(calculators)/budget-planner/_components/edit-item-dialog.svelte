<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import FrequencyInput from '$lib/components/inputs/frequency-select.svelte';
	import type { BudgetItem as BudgetItemType } from '../budget.svelte';
	import Input from '$ui/input/input.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { FREQUENCIES } from '$constants/frequencies';

	import { getBudgetState } from '../budget.svelte';

	import Label from '$ui/label/label.svelte';
	import { Pencil } from 'lucide-svelte';

	const {
		budgetItem
	}: {
		budgetItem: BudgetItemType;
	} = $props();

	const budget = getBudgetState();
	let open = $state(false);
	let editedItem = $state<BudgetItemType>({
		id: budgetItem.id,
		name: budgetItem.name,
		amount: budgetItem.amount,
		frequency: budgetItem.frequency,
		category: budgetItem.category,
		type: budgetItem.type,
		owner: budgetItem.owner
	});

	const isValid = $derived(editedItem.name.trim().length > 0 && editedItem.amount > 0);
	let categoryError = $state('');

	function handleSubmit() {
		if (isValid) {
			budget.updateItem({
				...editedItem,
				name: editedItem.name.trim(),
				category: editedItem.category
			});

			open = false;
		}
	}

	function handleCancel() {
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet children()}
			<button class="flex items-center gap-2">
				<Pencil />
				<span> Edit Item </span>
			</button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[500px] ">
		<Dialog.Header class="text-start">
			<Dialog.Title
				>Edit {budgetItem.type === 'income'
					? 'Income'
					: budgetItem.type === 'expense'
						? 'Expense'
						: 'Savings'} Item</Dialog.Title
			>
			<Dialog.Description>
				Edit {budgetItem.type === 'income'
					? 'income'
					: budgetItem.type === 'expense'
						? 'expense'
						: 'savings'} item in the {budgetItem.category} category.
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-4">
			<div class="space-y-2">
				<label for="item-name" class="text-sm font-medium">Name</label>
				<Input bind:value={editedItem.name} id="item-name" placeholder="Enter item name" />
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="item-amount" class="text-sm font-medium">Amount</Label>
					<CurrencyInput id="item-amount" bind:value={editedItem.amount} />
				</div>

				<div class="space-y-2">
					<label for="item-frequency" class="text-sm font-medium">Frequency</label>
					<FrequencyInput bind:value={editedItem.frequency} id="item-frequency" />
				</div>
				{#if budget.isJointBudget}
					<div class="space-y-2 col-span-2">
						<Label for="item-owner" class="text-sm font-medium">Owner</Label>
						<Select.Root
							type="single"
							bind:value={editedItem.owner}
							onValueChange={(value) => (editedItem.owner = value)}
						>
							<Select.Trigger class="w-full">
								{#if !editedItem.owner}
									<span>Select owner</span>
								{:else}
									<span>{editedItem.owner}</span>
								{/if}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each budget.owners as owner}
										<Select.Item value={owner} />
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
				{/if}
			</div>

			<div>
				<Label for="item-category" class="text-sm font-medium">Category</Label>
				<Select.Root
					type="single"
					bind:value={editedItem.category}
					onValueChange={(value) => (editedItem.category = value)}
				>
					<Select.Trigger class="w-full">
						{#if !editedItem.category}
							<span>Select a category</span>
						{:else}
							<span>{editedItem.category}</span>
						{/if}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each [...budget.categories[budgetItem.type]] as category}
								<Select.Item value={category} />
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<Dialog.Footer class="flex gap-2">
			<Button variant="outline" onclick={handleCancel}>Cancel</Button>
			<Button onclick={handleSubmit} disabled={!isValid}>Update Item</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
