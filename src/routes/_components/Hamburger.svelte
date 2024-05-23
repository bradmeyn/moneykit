<script>
	export let isOpen = false;
</script>

<button
	class="block lg:hidden text-white size-10 p-2 hover:text-emerald-600"
	on:click={() => {
		isOpen = !isOpen;
	}}
>
	{#if isOpen}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="icon {isOpen ? 'rotate' : ''}"
		>
			<path stroke-linejoin="round" color="white" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="icon hover:opacity-75 {isOpen ? 'rotate' : ''}"
		>
			<path stroke-width="2" color="white" d="M4 6h20M4 12h20M4 18h20" />
		</svg>
	{/if}
</button>

<style>
	.icon {
		transition: transform 0.3s ease;
	}

	.rotate {
		transform: rotate(180deg);
	}
</style>
