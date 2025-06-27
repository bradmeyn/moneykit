<!-- DownloadButton.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';

	interface DownloadData {
		headers: string[];
		rows: (string | number)[][];
	}

	let { data, filename = 'download.csv' } = $props<{
		data: DownloadData;
		filename?: string;
	}>();

	function downloadCsv() {
		const csvContent = [data.headers, ...data.rows]
			.map((row) =>
				row
					.map((cell: string | number) =>
						typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
					)
					.join(',')
			)
			.join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
	}
</script>

<Button size="icon" variant="outline" class="hover:bg-primary" onclick={downloadCsv}>
	<Download />
</Button>
