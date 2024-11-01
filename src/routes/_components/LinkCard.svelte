<script lang="ts">

	import CardIcon from './CardIcon.svelte';
	interface Props {
		name?: string;
		href?: string;
	}

	let { name = '', href = '' }: Props = $props();
</script>

<a
	class=" hover:border-brand-default card p-3 gap-4 border w-full md:w-[400px] rounded flex items-center justify-start transition-colors duration-300 ease-in-out"
	{href}
>
	<CardIcon {name} />
	<p class="text-xl mb-0 text-white">{name}</p>
</a>
