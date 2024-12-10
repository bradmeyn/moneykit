<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { type Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>MoneyKit</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="antialiased bg-gradient-to-b from-slate-800 min-h-screen flex flex-col">
	<Header />
	{@render children()}
	<Footer />
</div>
