<script lang="ts">
	export let name = '';
	export let href = '';

	import CardIcon from './CardIcon.svelte';
</script>

<a
	class=" hover:border-brand-default card p-3 gap-4 border w-full md:w-[400px] rounded flex items-center justify-start transition-colors duration-300 ease-in-out"
	{href}
>
	<CardIcon {name} />
	<p class="text-xl mb-0 text-white font-semibold">{name}</p>
</a>
