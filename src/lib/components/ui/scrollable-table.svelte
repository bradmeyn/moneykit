<script lang="ts">
	import ScrollArea from '$ui/scroll-area/scroll-area.svelte';

	let {
		columns,
		rows = [],
		height = '600px'
	}: {
		columns: string[];
		rows: any[][]; // Array of arrays
		height?: string;
	} = $props();

	const getAlignment = (index: number) => {
		if (index === 0) return 'text-left';
		return 'text-right';
	};
</script>

<ScrollArea class="h-[{height}] w-full">
	<table class="w-full">
		<thead class="sticky top-0">
			<tr>
				{#each columns as column, i}
					<th class="{getAlignment(i)} p-2">{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					{#each row as cell, i}
						<td class="p-2 {getAlignment(i)}">
							{cell}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</ScrollArea>
