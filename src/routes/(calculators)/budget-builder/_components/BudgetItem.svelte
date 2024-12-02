<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { BudgetItem } from '../budgetBuilder.svelte';
	import FrequencyInput from '$lib/components/inputs/FrequencySelect.svelte';
	import { FREQUENCIES } from '$lib/constants/frequencies';

	let { budgetItem = $bindable() }: { budgetItem: BudgetItem } = $props();
</script>

<tr class="border-y border-y-slate-500">
	<td class="text-white p-2 text-sm w-56">{budgetItem.name}</td>
	<td class="text-white p-2 w-40">
		<CurrencyInput id="test" label="" bind:value={budgetItem.amount} />
	</td>
	<td class="text-white p-2 w-40">
		<FrequencyInput bind:value={budgetItem.frequency} id={budgetItem.name + 'frequency'} />
	</td>
	<td class="text-right min-w-[80px]"
		>{formatAsCurrency(budgetItem.amount * FREQUENCIES[budgetItem.frequency].value, false)}</td
	>
</tr>
