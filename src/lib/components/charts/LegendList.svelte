<script lang="ts">
	import { COLOURS } from '$lib/constants/colours';

	interface Props {
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
		[key: string]: any;
	}

	let { data, formatter, theme = 'monochrome', ...rest }: Props = $props();
</script>

<div class={rest.class}>
	{#each data as item, i}
		<div class="flex items-center justify-between border-b border-b-ui-600">
			<div class="flex items-center gap-2 py-2">
				<div class="size-3 rounded-xl" style="background-color: {COLOURS[i]}"></div>
				<p class="text-ui-300 text-sm">{item.label}</p>
			</div>
			<p class="font-semibold text-white text-sm">
				{formatter(item.value)}
			</p>
		</div>
	{/each}
</div>
