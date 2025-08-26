<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { convertToFrequency, type BudgetItem } from '../budget.svelte';
	import FrequencyInput from '$lib/components/inputs/frequency-select.svelte';
	import { EllipsisVertical, Trash } from 'lucide-svelte';
	import { getBudgetState } from '../budget.svelte';
	import Button from '$ui/button/button.svelte';
	import { FREQUENCIES } from '$constants/frequencies';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import EditItemDialog from './edit-item-dialog.svelte';

	let {
		budgetItem
	}: {
		budgetItem: BudgetItem;
	} = $props();

	const budget = getBudgetState();
</script>

<tr class="hidden md:table-row">
	<td class="text-sm w-50 font-semibold">{budgetItem.name}</td>
	<td class="w-50">
		<CurrencyInput
			onchange={(value) =>
				budget.updateItem({
					...budgetItem,
					amount: value
				})}
			value={budgetItem.amount}
		/>
	</td>
	<td class="w-44">
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
	<td class="text-right px-0">
		<Button size="icon" variant="ghost" onclick={() => budget.removeItem(budgetItem.id)}>
			<Trash />
		</Button>
	</td>
</tr>

<tr class="md:hidden">
	<td class="text-sm">{budgetItem.name}</td>
	<td class="w-40">
		{formatAsCurrency(budgetItem.amount)} / {FREQUENCIES[budgetItem.frequency].singular}
	</td>

	<td class="text-right min-w-[80px] relative">
		<span
			>{formatAsCurrency(
				convertToFrequency(budgetItem.amount, budgetItem.frequency, budget.frequency)
			)}</span
		>
	</td>
	<td class="text-right px-0">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button size="icon" variant="ghost">
					<EllipsisVertical />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
						<EditItemDialog {budgetItem} />
					</DropdownMenu.Item>

					<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
						<button
							class="flex items-center gap-2"
							onclick={() => budget.removeItem(budgetItem.id)}
						>
							<Trash />
							<span> Delete Item </span>
						</button>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</td>
</tr>
