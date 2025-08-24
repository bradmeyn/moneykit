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
				<th class="text-left text-sm text-card-foreground p-2 border-t-transparent">Item</th>
				<th class="text-left text-sm text-card-foreground p-2 border-t-transparent">Amount</th>
				<th class="text-left text-sm text-card-foreground p-2 border-t-transparent hidden md:block"
					>Frequency</th
				>
				<th class="text-right text-sm text-card-foreground p-2 border-t-transparent">Total</th>
				<th class="text-right text-sm text-card-foreground p-2 border-t-transparent"> </th>
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
