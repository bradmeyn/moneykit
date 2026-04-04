<script lang="ts">
	import { page } from '$app/state';
	import { calculators } from '$lib/constants/calculators';
	let activeUrl = $derived(page.url.pathname);
</script>

<nav class="hidden md:flex gap-8">
	{#each calculators as calculator}
		<a
			href={calculator.href}
			class="block text-left w-fit text-sm transition-colors duration-200 {activeUrl ===
			calculator.href
				? 'text-primary font-medium'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{calculator.name}
		</a>
	{/each}
</nav>
