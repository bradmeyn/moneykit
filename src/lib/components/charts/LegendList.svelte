<script lang="ts">
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	export let data: { label: string; value: number }[];
	export let formatter: (value: number) => string;
	export let theme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
</script>

<div class={$$restProps.class}>
	{#each data as item, i}
		<div class="flex items-center justify-between border-b border-b-slate-600">
			<div class="flex items-center gap-3 py-2">
				<div class="size-4 rounded-xl" style="background-color: {colours[i]}" />
				<span class="text-slate-300">{item.label}</span>
			</div>
			<div class="font-semibold">
				{formatter(item.value)}
			</div>
		</div>
	{/each}
</div>
