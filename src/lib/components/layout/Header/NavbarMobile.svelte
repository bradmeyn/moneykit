<!-- @migration-task Error while migrating Svelte code: `<button>` is invalid inside `<button>` -->
<!-- @migration-task Error while migrating Svelte code: `<button>` is invalid inside `<button>` -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let {
		links,
		isOpen
	}: {
		links: { name: string; href: string }[];
		isOpen: boolean;
	} = $props();

	let resizeHandler: () => void;
	onMount(() => {
		if (browser) {
			// Check if the code is running in the browser
			resizeHandler = () => {
				if (window.innerWidth > 1024) isOpen = false;
			};
			window.addEventListener('resize', resizeHandler);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', resizeHandler);
		}
	});
</script>

{#if isOpen}
	<button class="fixed lg:hidden inset-0 bg-black/40 z-10" onclick={() => (isOpen = false)}>
		<div class="z-50 absolute left-0 top-0 w-full card">
			<div class="flex justify-between items-center z-10">
				<span class="text-white font-semibold text-xl"
					>Money<span
						class="text-transparent bg-clip-text bg-gradient-to-b from-primary-light to-primary"
						>Kit</span
					></span
				>
			</div>
			<nav>
				<ul class="py-4">
					{#each links as link}
						<!-- <NavLink {link} /> -->
					{/each}
				</ul>
			</nav>
		</div>
	</button>
{/if}
