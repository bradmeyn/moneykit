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
	<footer class=" mt-auto items-center py-4 text-muted-foreground justify-center container">
		<div class="container text-sm mb-8 space-y-2">
			<!-- <h3 class=" font-medium text-white">Important Information</h3>
			<p>
				This calculator is for informational purposes only and should not be considered financial
				advice. Please consult with a financial advisor for personalised advice.
			</p>
			<p>
				MoneyKit is a personal project and is not affiliated with or endorsed by any financial
				institution. The information provided is based on publicly available data and may not be
				accurate or up-to-date. Users should verify all information independently before making any
				financial decisions.
			</p> -->
			<p class="text-xs text-center mt-2">
				Copyright © {year} - All right reserved
			</p>
		</div>
	</footer>
</div>
