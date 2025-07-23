<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical, Trash, Download } from 'lucide-svelte';
	import Button from '$ui/button/button.svelte';
	import ClearAllDialog from './clear-all-dialog.svelte';
	import { downloadCsv } from '$utils/file-download';

	import { getBudgetState } from '../budget.svelte';
	const budget = getBudgetState();

	function downloadData(e: Event) {
		e.preventDefault();
		const data = budget.getDownloadData();
		downloadCsv(data, 'budget.csv');
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="ghost">
			<EllipsisVertical />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<DropdownMenu.Item onSelect={downloadData}>
				<Download /> <span>Download CSV</span>
			</DropdownMenu.Item>

			<DropdownMenu.Separator />

			<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
				<ClearAllDialog onDelete={budget.deleteItemsByType}>
					{#snippet trigger()}
						<div class="flex items-center gap-2">
							<Trash class="size-4" />
							<span>Clear budget</span>
						</div>
					{/snippet}
				</ClearAllDialog>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
