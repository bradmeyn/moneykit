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
</script>

<svelte:head>
	<title>MoneyKit</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="antialiased bg-ui-900 min-h-screen flex flex-col">
	<Header />
	{@render children()}
	<footer
		class=" mt-auto items-center p-4 bg-neutral text-neutral-content justify-center text-muted"
	>
		<p class="text-xs text-center">
			Copyright © {year} - All right reserved
		</p>
	</footer>
</div>
