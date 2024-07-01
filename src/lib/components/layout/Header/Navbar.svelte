<script lang="ts">
	import NavLink from './NavLink.svelte';

	export let links;
</script>

<nav class="hidden md:block">
	<ul class="flex gap-2 items-center">
		{#each links as link}
			<NavLink {link} />
		{/each}
	</ul>
</nav>
