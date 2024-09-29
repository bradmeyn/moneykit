<script>
	export let isOpen = false;
	import { X, Menu } from 'lucide-svelte';
</script>

<button
	class="block md:hidden text-white p-1 hover:text-brand-default"
	on:click={() => {
		isOpen = !isOpen;
	}}
>
	{#if isOpen}
		<X class="size-6" />
	{:else}
		<Menu class="size-6" />
	{/if}
</button>
