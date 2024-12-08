<script>
	import { X, Menu } from 'lucide-svelte';
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [isOpen]
	 */

	/** @type {Props} */
	let { isOpen = $bindable(false) } = $props();
</script>

<button
	class="block md:hidden text-white p-1 hover:text-primary"
	onclick={() => {
		isOpen = !isOpen;
	}}
>
	{#if isOpen}
		<X class="size-6" />
	{:else}
		<Menu class="size-6" />
	{/if}
</button>
