<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { browser } from '$app/environment';
	export let isOpen = false;
	$: activeUrl = $page.url.pathname;
	import type { Link } from './Header.svelte';
	import NavLink from './NavLink.svelte';

	export let links: Link[];

	let resizeHandler: () => void;
	onMount(() => {
		if (browser) {
			// Check if the code is running in the browser
			resizeHandler = () => {
				if (window.innerWidth > 1024) {
					isOpen = false;
				}
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
	<div class="container">
		<Card classes="relative lg:hidden z-30 -top-14 bg-slate-900 flex flex-col w-full">
			<div class=" flex justify-between items-center">
				<span class="text-white font-semibold text-xl"
					>Wealth<span
						class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
						>Kit</span
					></span
				>
				<slot />
			</div>
			<nav>
				<ul>
					{#each links as link}
						<NavLink {link} />
					{/each}
				</ul>
			</nav>
		</Card>
	</div>
	{#if isOpen}
		<button class="fixed lg:hidden inset-0 bg-black/50 z-10" on:click={() => (isOpen = false)} />
	{/if}
{/if}
