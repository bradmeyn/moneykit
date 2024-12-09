<script lang="ts">
	import { COLOURS } from '$lib/constants/colours';

	interface Props {
		labels?: string[];
		className?: string;
	}

	let { labels = [], className = '' }: Props = $props();
</script>

<div class={className}>
	{#each labels as label, i}
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2 py-2 px-2">
				<div class="size-3 rounded-xl" style="background-color: {COLOURS[i]}"></div>
				<span>{label}</span>
			</div>
		</div>
	{/each}
</div>
