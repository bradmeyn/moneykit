<script lang="ts">
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	export let labels: string[] = [];
	export let theme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
</script>

<div class={$$restProps.class}>
	{#each labels as label, i}
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2 py-2 px-2">
				<div class="size-3 rounded-xl" style="background-color: {colours[i]}" />
				<span>{label}</span>
			</div>
		</div>
	{/each}
</div>
