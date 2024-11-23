<script lang="ts">
	import BudgetItem from './BudgetItem.svelte';
	import type { BudgetItem as Item } from '../budgetBuilder.svelte';
	import { FREQUENCIES, type FrequencyType } from '$constants/frequencies';
	let { items = [], frequency }: { items?: Item; frequency: FrequencyType } = $props();
</script>

<table class="w-full">
	<thead>
		<tr>
			<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Item</th>
			<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Amount</th>
			<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
			<th class="text-right text-sm text-ui-400 p-2 border-t-transparent"
				>{FREQUENCIES[frequency].label} Total</th
			>
		</tr>
	</thead>
	<tbody>
		{#each items as budgetItem (budgetItem.name)}
			<BudgetItem {budgetItem} />
		{/each}
	</tbody>
</table>
