<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header/header.svelte';
	import { type Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	const year = new Date().getFullYear();
	const description = 'A collection of personal finance tools';
</script>

<svelte:head>
	<title>MoneyKit</title>
	<meta name="description" content={description} />
	<meta name="og:description" content={description} />
</svelte:head>

<div class="antialiased min-h-screen flex flex-col dark:bg-background text-white">
	<Header />
	{@render children()}
	<footer class=" mt-auto items-center p-4 text-muted-foreground justify-center">
		<p class="text-xs text-center">
			Copyright © {year} - All right reserved
		</p>
	</footer>
</div>
