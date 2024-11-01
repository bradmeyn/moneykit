<script lang="ts">
	let isOpen = $state(false);
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	interface Props {
		category?: string;
		categoryTotal?: number;
		table?: import('svelte').Snippet;
	}

	let { category = '', categoryTotal = 0, table }: Props = $props();
	const toggle = () => (isOpen = !isOpen);
</script>

<div>
	<button
		aria-expanded={isOpen}
		data-open={isOpen}
		class="flex justify-between px-4 py-2 data-[open=true]:bg-ui-700 items-center border-b border-b-ui-700 w-full rounded hover:bg-ui-700"
		onclick={toggle}
	>
		<div class="text-left">
			<h3 class="text-sm text-ui-400">{category}</h3>
			<p class="text-lg">{formatAsCurrency(categoryTotal, false)}</p>
		</div>

		<div class="flex gap-1 items-center">
			<span>
				{#if isOpen}
					<ChevronUp size="24" class="size-6 group-hover:text-brand-default" />
				{:else}
					<ChevronDown size="24" class="size-6 group-hover:text-brand-default" />
				{/if}
			</span>
		</div>
	</button>

	<div class={isOpen ? 'px-2 border border-ui-700' : 'hidden px-2'}>
		{@render table?.()}
	</div>
</div>
