<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { convertToFrequency, type BudgetItem } from '../budget.svelte';
	import FrequencyInput from '$lib/components/inputs/frequency-select.svelte';
	import { Trash } from 'lucide-svelte';
	import { getBudgetState } from '../budget.svelte';
	import Button from '$ui/button/button.svelte';

	let {
		budgetItem
	}: {
		budgetItem: BudgetItem;
	} = $props();

	const budget = getBudgetState();
</script>

<tr>
	<td class="text-sm w-56">{budgetItem.name}</td>
	<td class="w-40">
		<CurrencyInput
			onchange={(value) =>
				budget.updateItem({
					...budgetItem,
					amount: value
				})}
			value={budgetItem.amount}
		/>
	</td>
	<td class="w-40">
		<FrequencyInput
			value={budgetItem.frequency}
			onchange={(frequency) =>
				budget.updateItem({
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
				convertToFrequency(budgetItem.amount, budgetItem.frequency, budget.frequency)
			)}</span
		>
	</td>
	<td class="text-right">
		<Button size="icon" variant="ghost" onclick={() => budget.removeItem(budgetItem.id)}>
			<Trash />
		</Button>
	</td>
</tr>
