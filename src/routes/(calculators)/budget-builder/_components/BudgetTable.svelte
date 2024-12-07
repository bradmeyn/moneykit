<script lang="ts">
	import { FREQUENCIES } from '$constants/frequencies';

	import { getContext } from 'svelte';
	import type { BudgetItem as Item } from '../budgetBuilder.svelte';
	import BudgetItem from './BudgetItem.svelte';
	let { items }: { items: Item[] } = $props();
	import type { BudgetContext } from '../budgetBuilder.svelte';

	const { getFrequency } = getContext<BudgetContext>('budget');
</script>

<table class="w-full">
	<thead>
		<tr>
			<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Item</th>
			<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Amount</th>
			<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
			<th class="text-right text-sm text-ui-400 p-2 border-t-transparent"
				>{FREQUENCIES[getFrequency()].label} Total</th
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
