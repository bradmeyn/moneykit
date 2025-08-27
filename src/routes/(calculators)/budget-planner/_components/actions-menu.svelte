<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Trash, Save, RefreshCcw } from 'lucide-svelte';
	import ClearAllDialog from './clear-all-dialog.svelte';
	import { getBudgetState } from '../budget.svelte';
	import CalculatorActions from '$lib/components/calculator-actions.svelte';
	const budget = getBudgetState();
</script>

<CalculatorActions getCsvData={() => budget.getDownloadData()} filename="budget.csv">
	{#snippet items()}
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			onSelect={(e) => {
				e.preventDefault();
				budget.saveToStorage();
			}}
		>
			<Save class="size-4" />
			<span>Save Budget</span>
		</DropdownMenu.Item>

		<DropdownMenu.Separator />
		<DropdownMenu.Item
			onSelect={(e) => {
				e.preventDefault();
				budget.resetBudget();
			}}
		>
			<RefreshCcw />
			<span>Reset Budget</span>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
			<ClearAllDialog onDelete={() => budget.deleteItemsByType()}>
				{#snippet trigger()}
					<div class="flex items-center gap-2">
						<Trash />
						<span>Delete Items</span>
					</div>
				{/snippet}
			</ClearAllDialog>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />

		<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
			<ClearAllDialog onDelete={() => budget.clearBudget()}>
				{#snippet trigger()}
					<div class="flex items-center gap-2">
						<Trash />
						<span>Clear Budget</span>
					</div>
				{/snippet}
			</ClearAllDialog>
		</DropdownMenu.Item>
	{/snippet}
</CalculatorActions>
