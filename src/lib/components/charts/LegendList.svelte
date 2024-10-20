<script lang="ts">
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	export let data: { label: string; value: number }[];
	export let formatter: (value: number) => string;
	export let theme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
</script>

<div class={$$restProps.class}>
	{#each data as item, i}
		<div class="flex items-center justify-between border-b border-b-ui-600">
			<div class="flex items-center gap-2 py-2">
				<div class="size-3 rounded-xl" style="background-color: {colours[i]}" />
				<p class="text-ui-300 text-sm">{item.label}</p>
			</div>
			<p class="font-semibold text-white text-sm">
				{formatter(item.value)}
			</p>
		</div>
	{/each}
</div>
