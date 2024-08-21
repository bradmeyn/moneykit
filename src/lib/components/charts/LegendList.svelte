<script lang="ts">
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	export let data: { label: string; value: number }[];
	export let formatter: (value: number) => string;
	export let theme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
</script>

<div class={$$restProps.class}>
	{#each data as item, i}
		<div class="flex items-center justify-between border-b border-b-slate-600 text-sm">
			<div class="flex items-center gap-2 py-2">
				<div class="size-3 rounded-xl" style="background-color: {colours[i]}" />
				<span>{item.label}</span>
			</div>
			<div>
				{formatter(item.value)}
			</div>
		</div>
	{/each}
</div>
