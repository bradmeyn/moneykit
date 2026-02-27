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

<div class="antialiased min-h-screen flex flex-col bg-background text-foreground app-shell">
	<Header />
	{@render children()}
	<footer class="mt-auto items-center py-6 text-muted-foreground justify-center container">
		<div class="container text-sm mb-8 space-y-2">
			<p class="text-xs text-center mt-2">
				Copyright © {year} - All right reserved
			</p>
		</div>
	</footer>
</div>
