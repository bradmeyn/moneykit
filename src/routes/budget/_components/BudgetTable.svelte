<script lang="ts">
	import BudgetItem from './BudgetItem.svelte';
	import type { BudgetItem as Item } from '../types';
	import { formatAsCurrency } from '$lib/utils/formatters';

	export let items: Item[] = [];
</script>

<table class="w-full">
	<thead>
		<tr>
			<th class="text-left text-sm text-slate-400 p-2 border-t-transparent">Item</th>
			<th class="text-left text-sm text-slate-400 p-2 border-t-transparent">Amount</th>
			<th class="text-left text-sm text-slate-400 p-2 border-t-transparent">Frequency</th>
			<th class="text-right text-sm text-slate-400 p-2 border-t-transparent">Total</th>
		</tr>
	</thead>
	<tbody>
		{#each items as i (i.name)}
			<BudgetItem {i} />
		{/each}
	</tbody>
	<!-- <tfoot>
		<tr>
			<td class="text-left text-lg font-semibold text-white p-2 border-b-transparent">Total</td>
			<td class="text-left text-sm text-white p-2 border-b-transparent" />
			<td class="text-left text-sm text-white p-2 border-b-transparent" />
			<td class="text-right text-lg text-white font-semibold p-2 border-b-transparent">
				{formatAsCurrency(items.reduce((acc, i) => acc + i.amount, 0))}
			</td>
		</tr>
	</tfoot> -->
</table>
