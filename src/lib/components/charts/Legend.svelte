<script lang="ts">
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	interface Props {
		labels?: string[];
		theme?: 'monochrome' | 'colourful';
		[key: string]: any
	}

	let { labels = [], theme = 'monochrome', ...rest }: Props = $props();
	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
</script>

<div class={rest.class}>
	{#each labels as label, i}
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2 py-2 px-2">
				<div class="size-3 rounded-xl" style="background-color: {colours[i]}"></div>
				<span>{label}</span>
			</div>
		</div>
	{/each}
</div>
