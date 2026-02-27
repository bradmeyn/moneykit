<script lang="ts">
	import { page } from '$app/state';
	import { calculators } from '$lib/constants/calculators';
	let activeUrl = $derived(page.url.pathname);
</script>

<nav class="hidden md:flex gap-8">
	{#each calculators as calculator}
		<a
			href={calculator.href}
			class="block text-left border-b-2 w-fit text-muted-foreground text-base transition-colors duration-200 {activeUrl ===
			calculator.href
				? 'text-foreground border-b-2 border-b-brand'
				: 'text-muted-foreground  hover:text-foreground border-b-transparent'}"
		>
			{calculator.name}
		</a>
	{/each}
</nav>
