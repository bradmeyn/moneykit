<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { convertToFrequency, type BudgetItem } from '../budgetState.svelte';
	import FrequencyInput from '$lib/components/inputs/FrequencySelect.svelte';
	import { Trash2 } from 'lucide-svelte';

	import { getBudgetState } from '../budgetState.svelte';

	let {
		budgetItem
	}: {
		budgetItem: BudgetItem;
	} = $props();

	const { frequency, removeItem, updateItem } = getBudgetState();
</script>

<tr class="">
	<td class="text-sm w-56">{budgetItem.name}</td>
	<td class="w-40">
		<CurrencyInput
			id="test"
			label=""
			onChange={(value) =>
				updateItem({
					...budgetItem,
					amount: value
				})}
			value={budgetItem.amount}
		/>
	</td>
	<td class="w-40">
		<FrequencyInput
			value={budgetItem.frequency}
			onChange={(frequency) =>
				updateItem({
					...budgetItem,
					frequency
				})}
			id={budgetItem.name + 'frequency'}
			name={budgetItem.name + '-frequency'}
		/>
	</td>
	<td class="text-right min-w-[80px] relative">
		<span
			>{formatAsCurrency(
				convertToFrequency(budgetItem.amount, budgetItem.frequency, frequency)
			)}</span
		>
	</td>
	<td class="text-right">
		<button
			class="p-2 hover:bg-ui-800 text-ui-500 hover:text-red-500 rounded"
			onclick={() => removeItem(budgetItem.id)}
		>
			<Trash2 class="size-4 " />
		</button>
	</td>
</tr>
