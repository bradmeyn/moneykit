<script lang="ts">
	import { FREQUENCIES } from '$constants/frequencies';
	import { getBudgetState } from '../budgetState.svelte';
	import type { BudgetItem as Item } from '../budgetState.svelte';
	import BudgetItem from './BudgetItem.svelte';
	let { items }: { items: Item[] } = $props();
	const { frequency } = getBudgetState();
</script>

{#if items.length > 0}
	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Item</th>
				<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Amount</th>
				<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
				<th class="text-right text-sm text-ui-400 p-2 border-t-transparent"
					>{FREQUENCIES[frequency].label} Total</th
				>
				<th class="text-right text-sm text-ui-400 p-2 border-t-transparent"> </th>
			</tr>
		</thead>
		<tbody>
			{#each items as budgetItem (budgetItem.id)}
				<BudgetItem {budgetItem} />
			{/each}
		</tbody>
	</table>
{:else}
	<p class="p-2">No items</p>
{/if}
