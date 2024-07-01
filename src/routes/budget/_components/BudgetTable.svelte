<script lang="ts">
	import BudgetItem from './BudgetItem.svelte';
	import type { BudgetItem as Item } from '../types';

	export let items: Item[] = [];
</script>

<table class="w-full mb-4">
	<thead>
		<tr>
			<th class="text-left text-sm text-slate-400 p-2">Item</th>
			<th class="text-left text-sm text-slate-400 p-2">Amount</th>
			<th class="text-left text-sm text-slate-400 p-2">Frequency</th>
			<th class="text-right text-sm text-slate-400 p-2">Total</th>
		</tr>
	</thead>
	<tbody>
		{#each items as i (i.name)}
			<BudgetItem {i} />
		{/each}
	</tbody>
</table>
