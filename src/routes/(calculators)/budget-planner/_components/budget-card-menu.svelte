<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical, Pencil, Plus, Trash } from 'lucide-svelte';
	import { type BudgetItem, getBudgetState } from '../budget.svelte';
	import Button from '$ui/button/button.svelte';
	import ClearAllDialog from './clear-all-dialog.svelte';
	import CategoryManager from './category-manager.svelte';
	import AddItemDialog from './add-item-dialog.svelte';

	let { type }: { type: BudgetItem['type'] } = $props();
	const budget = getBudgetState();
	const handleDelete = () => budget.deleteItemsByType(type);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="ghost">
			<EllipsisVertical />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
				<CategoryManager {type} categories={budget.categories[type]}>
					{#snippet trigger()}
						<div class="flex items-center gap-2">
							<Pencil />
							<span> Manage Categories </span>
						</div>
					{/snippet}
				</CategoryManager>
			</DropdownMenu.Item>
			<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
				<ClearAllDialog onDelete={handleDelete}>
					{#snippet trigger()}
						<div class="flex items-center gap-2">
							<Trash />
							<span> Delete Items </span>
						</div>
					{/snippet}
				</ClearAllDialog>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
