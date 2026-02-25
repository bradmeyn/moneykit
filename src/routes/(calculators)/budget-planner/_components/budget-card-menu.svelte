<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical, Pencil, Plus, Trash } from 'lucide-svelte';
	import { type BudgetItem, getBudgetState } from '../budget.svelte';
	import Button from '$ui/button/button.svelte';
	import ClearAllDialog from './clear-all-dialog.svelte';
	import CategoryManager from './category-manager.svelte';

	let { type }: { type: BudgetItem['type'] } = $props();
	const budget = getBudgetState();
	const handleDelete = () => budget.deleteItemsByType(type);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50 h-9 w-9 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
	>
		<EllipsisVertical class="size-4" />
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
