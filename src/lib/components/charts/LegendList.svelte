<script lang="ts">
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	export let data: { label: string; value: number }[];
	export let formatter: (value: number) => string;
	export let colourTheme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = colourTheme === 'monochrome' ? MONOCHROME : COLOURFUL;
</script>

<div>
	{#each data as item, i}
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3 py-2 px-2">
				<div class="size-3 rounded-xl" style="background-color: {colours[i]}" />
				<span>{item.label}</span>
			</div>
			<div>
				{formatter(item.value)}
			</div>
		</div>
		{#if i < data.length - 1}
			<div class="border-b border-slate-600 w-full" />
		{/if}
	{/each}
</div>
