<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical, Download } from 'lucide-svelte';
	import Button from '$ui/button/button.svelte';

	import { downloadCsv, type CsvData } from '$utils/file-download';
	import type { Snippet } from 'svelte';

	let {
		getCsvData,
		items,
		filename
	}: { getCsvData: () => CsvData; items?: Snippet; filename: string } = $props();

	function downloadData(e: Event) {
		e.preventDefault();
		downloadCsv(getCsvData(), filename);
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

			{@render items?.()}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
