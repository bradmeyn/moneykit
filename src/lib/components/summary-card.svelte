<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		value,
		valueClass = '',
		children
	}: {
		/** Uppercase caption, e.g. "Net Worth". */
		label: string;
		/** Pre-formatted value, e.g. "$214,814,544". */
		value: string;
		/** Optional class for the value, e.g. text-emerald-600 for gains. */
		valueClass?: string;
		/** Optional content rendered below the value, e.g. a bar. */
		children?: Snippet;
	} = $props();
</script>

<div class="card">
	<p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
	<p class="mt-1 text-3xl font-medium tracking-tight tabular-nums {valueClass}">{value}</p>
	{@render children?.()}
</div>
