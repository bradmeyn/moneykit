<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import FrequencyInput from '$lib/components/inputs/frequency-select.svelte';
	import type { BudgetItem as BudgetItemType } from '../budget.svelte';
	import Input from '$ui/input/input.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { FREQUENCIES } from '$constants/frequencies';
	import { v4 as uuidv4 } from 'uuid';
	import { getBudgetState } from '../budget.svelte';
	import BudgetItem from './budget-item.svelte';

	const {
		category,
		type
	}: {
		category: string;
		type: BudgetItemType['type'];
	} = $props();

	const calc = getBudgetState();

	let showForm = $state(false);
	let newItem = $state<BudgetItemType>({
		id: uuidv4(),
		name: '',
		amount: 0,
		frequency: 'monthly',
		category,
		type
	});

	const isValid = $derived(newItem.name.trim().length > 0 && newItem.amount > 0);

	function handleSubmit() {
		if (isValid) {
			calc.addItem({
				...newItem,
				name: newItem.name.trim()
			});

			// Reset form
			newItem = {
				id: uuidv4(),
				name: '',
				amount: 0,
				frequency: 'monthly',
				category,
				type
			};
			showForm = false;
		}
	}

	function handleCancel() {
		showForm = false;
	}
</script>

{#if showForm}
	<div class="flex items-center">
		<div class="text-white p-2 text-sm w-56">
			<Input bind:value={newItem.name} id="new-item-name" placeholder="Enter item name" />
		</div>
		<div class="text-white p-2 w-40">
			<CurrencyInput id="new-item-amount" bind:value={newItem.amount} />
		</div>
		<div class="text-white p-2 w-40">
			<FrequencyInput bind:value={newItem.frequency} id="new-item-frequency" />
		</div>
		<div class="text-right min-w-[80px] flex-1 p-2">
			{formatAsCurrency(newItem.amount * FREQUENCIES[newItem.frequency].value, false)}
		</div>
	</div>
	<div class="flex max-w-xs space-x-2 mx-2">
		<Button variant="secondary" size="sm" onclick={handleSubmit} disabled={!isValid}>Save</Button>
		<Button variant="ghost" size="sm" onclick={handleCancel}>Cancel</Button>
	</div>
{:else}
	<Button class="m-2" variant="secondary" size="sm" onclick={() => (showForm = true)}
		>Add Item</Button
	>
{/if}
