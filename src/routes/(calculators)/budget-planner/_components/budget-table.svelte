<script lang="ts">
	import { FREQUENCIES } from '$constants/frequencies';
	import { getBudgetState } from '../budget.svelte';
	import type { BudgetItem as Item } from '../budget.svelte';
	import BudgetItem from './budget-item.svelte';
	let { items }: { items: Item[] } = $props();
	const budget = getBudgetState();
</script>

{#if items.length > 0}
	<table class="w-full">
		<thead>
			<tr>
				<th>Item</th>
				<th>Amount</th>
				<th class=" hidden md:block">Frequency</th>
				<th class:hidden={!budget.isJointBudget}>Owner</th>
				<th class="text-right">Total</th>
				<th class="text-right"> </th>
			</tr>
		</thead>
		<tbody>
			{#each items as budgetItem (budgetItem.id)}
				<BudgetItem {budgetItem} />
			{/each}
		</tbody>
	</table>
{:else}
	<p class="p-2 text-muted-foreground text-center">No items in this category</p>
{/if}
