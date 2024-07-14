<script lang="ts">
	let isOpen = false;
	export let category = '';
	export let categoryTotal = 0;
	import { formatAsCurrency } from '$lib/utils/formatters';

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div>
	<button
		aria-expanded={isOpen}
		data-open={isOpen}
		class="flex justify-between px-4 py-2 data-[open=true]:bg-slate-700 items-center border-b border-b-slate-700 w-full rounded hover:bg-slate-700"
		on:click={toggle}
	>
		<div class="text-left">
			<h2 class="text-sm text-slate-400">{category}</h2>
			<p class="text-lg">{formatAsCurrency(categoryTotal, false)}</p>
		</div>

		<div class="flex gap-1 items-center">
			<!-- <span>
				{formatAsCurrency(categoryTotal, false)}
			</span> -->
			<span>
				{#if isOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 group-hover:text-brand-default"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
					</svg>
				{/if}
			</span>
		</div>
	</button>

	<div class={isOpen ? 'px-2 border border-slate-700' : 'hidden px-2'}>
		<slot name="table" />
	</div>
</div>
