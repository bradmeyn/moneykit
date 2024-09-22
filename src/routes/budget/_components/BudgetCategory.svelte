<script lang="ts">
	let isOpen = false;
	export let category = '';
	export let categoryTotal = 0;
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	const toggle = () => (isOpen = !isOpen);
</script>

<div>
	<button
		aria-expanded={isOpen}
		data-open={isOpen}
		class="flex justify-between px-4 py-2 data-[open=true]:bg-slate-700 items-center border-b border-b-slate-700 w-full rounded hover:bg-slate-700"
		on:click={toggle}
	>
		<div class="text-left">
			<h3 class="text-sm text-slate-400">{category}</h3>
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

	<div class={isOpen ? 'px-2 border border-slate-700' : 'hidden px-2'}>
		<slot name="table" />
	</div>
</div>
