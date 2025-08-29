<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import FrequencyInput from '$lib/components/inputs/frequency-select.svelte';
	import type { BudgetItem as BudgetItemType } from '../budget.svelte';
	import Input from '$ui/input/input.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { getBudgetState } from '../budget.svelte';
	import type { Snippet } from 'svelte';
	import Label from '$ui/label/label.svelte';

	const {
		category = 'uncategorised',
		type,
		trigger
	}: {
		category?: string;
		type: BudgetItemType['type'];
		trigger?: Snippet;
	} = $props();

	const budget = getBudgetState();
	let open = $state(false);
	let newItem = $state<BudgetItemType>({
		id: uuidv4(),
		name: '',
		amount: 0,
		frequency: 'monthly',
		category: category === 'uncategorised' ? '' : category,
		type,
		owner: budget.owners[0]
	});

	const title: Record<BudgetItemType['type'], string> = {
		income: 'Income',
		expense: 'Expense'
	};

	const addingNewCategory = $derived(newItem.category === 'New Category');
	let newCategoryName = $state('');

	const isValid = $derived(
		newItem.name.trim().length > 0 &&
			newItem.amount > 0 &&
			(category !== 'uncategorised' || newItem.category.trim().length > 0)
	);
	let categoryError = $state('');

	function validateCategory() {
		if (addingNewCategory) {
			if (!newCategoryName.trim()) {
				categoryError = 'Category name cannot be empty.';
				return false;
			}
			if (budget.categories[type].includes(newCategoryName.trim())) {
				categoryError = 'Category already exists.';
				return false;
			}
			categoryError = '';
			if (newCategoryName.trim() === 'New Category') {
				categoryError = 'Please choose a different name for the new category.';
				return false;
			}
		}
		return true;
	}
	function handleSubmit() {
		if (isValid) {
			// Validate category if it's a new category
			if (addingNewCategory && !validateCategory()) {
				return;
			}

			// If adding a new category, add it first
			if (newCategoryName.trim()) {
				budget.addCategory(type, newCategoryName.trim());
				newItem.category = newCategoryName.trim();
			}

			budget.addItem({
				...newItem,
				name: newItem.name.trim(),
				category: newItem.category.trim()
			});

			resetForm();
			open = false;
		}
	}

	function handleCancel() {
		resetForm();
		open = false;
	}

	function resetForm() {
		newItem = {
			id: uuidv4(),
			name: '',
			amount: 0,
			frequency: 'monthly',
			category: category === 'uncategorised' ? '' : category,
			type,
			owner: budget.owners[0]
		};
		newCategoryName = '';
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="w-full md:w-fit">
		{#snippet children()}
			{#if trigger}
				{@render trigger()}
			{:else}
				<Button class="w-full md:w-fit">Add {title[type]}</Button>
			{/if}
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[500px]">
		<Dialog.Header class="text-start">
			<Dialog.Title
				>Add New {type === 'income' ? 'Income' : type === 'expense' ? 'Expense' : 'Savings'} Item</Dialog.Title
			>
			<Dialog.Description>
				{#if category === 'uncategorised'}
					Add a new {type === 'income' ? 'income' : type === 'expense' ? 'expense' : 'savings'} item
					and assign it to a category.
				{:else}
					Add a new {type === 'income' ? 'income' : type === 'expense' ? 'expense' : 'savings'} item
					to the {category} category.
				{/if}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-4">
			<div class="space-y-2">
				<label for="item-name" class="text-sm font-medium">Name</label>
				<Input bind:value={newItem.name} id="item-name" placeholder="Enter item name" />
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="item-amount" class="text-sm font-medium">Amount</Label>
					<CurrencyInput id="item-amount" bind:value={newItem.amount} />
				</div>

				<div class="space-y-2">
					<label for="item-frequency" class="text-sm font-medium">Frequency</label>
					<FrequencyInput bind:value={newItem.frequency} id="item-frequency" />
				</div>
				{#if budget.isJointBudget}
					<div class="space-y-2 col-span-2">
						<Label for="item-owner" class="text-sm font-medium">Owner</Label>
						<Select.Root
							type="single"
							bind:value={newItem.owner}
							onValueChange={(value) => (newItem.owner = value)}
						>
							<Select.Trigger class="w-full">
								{#if !newItem.owner}
									<span>Select owner</span>
								{:else}
									<span>{newItem.owner}</span>
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
				{#if category === 'uncategorised'}
					<Label for="item-category" class="text-sm font-medium">Category</Label>
					<Select.Root
						type="single"
						bind:value={newItem.category}
						onValueChange={(value) => (newItem.category = value)}
					>
						<Select.Trigger class="w-full">
							{#if !newItem.category}
								<span>Select a category</span>
							{:else}
								<span>{newItem.category}</span>
							{/if}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each [...budget.categories[type], 'New Category'] as category}
									<Select.Item value={category} />
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{/if}
			</div>
			{#if addingNewCategory}
				<div>
					<Label for="new-category-name">New Category Name</Label>
					<Input
						id="new-category-name"
						bind:value={newCategoryName}
						onblur={validateCategory}
						onfocus={() => (categoryError = '')}
						placeholder="Enter new category name"
					/>
					{#if categoryError}
						<small class="text-red-500">{categoryError}</small>
					{/if}
				</div>
			{/if}
		</div>

		<Dialog.Footer>
			<Button variant="outline" onclick={handleCancel}>Cancel</Button>
			<Button onclick={handleSubmit} disabled={!isValid}>Save Item</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
