<script>
	export let isOpen = false;
	import Icon from '@iconify/svelte';
</script>

<button
	class="block md:hidden text-white p-1 hover:text-brand-default z-40"
	on:click={() => {
		isOpen = !isOpen;
	}}
>
	{#if isOpen}
		<Icon icon="lucide:x" class="text-white size-6 hover:text-brand-default" />
	{:else}
		<Icon icon="lucide:menu" class="text-white size-6 hover:text-brand-default" />
	{/if}
</button>
