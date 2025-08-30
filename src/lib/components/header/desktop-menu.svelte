<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown } from 'lucide-svelte';
	import { calculators } from '$lib/constants/calculators';
	let activeUrl = $derived(page.url.pathname);
</script>

<nav class="hidden md:flex gap-8 ml-10">
	{#each calculators as calculator}
		<a
			href={calculator.href}
			class="block text-left border-b-2 w-fit text-muted-foreground {activeUrl === calculator.href
				? 'text-white border-b-2 border-b-brand'
				: 'text-card-foreground  hover:text-white border-b-transparent'}"
		>
			{calculator.name}
		</a>
	{/each}
</nav>
