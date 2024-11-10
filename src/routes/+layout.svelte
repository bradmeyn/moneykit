<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Wealthkit</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="bg-gradient-to-b from-ui-800 to-ui-950 min-h-screen flex flex-col">
	<Header />
	{@render children?.()}
	<Footer />
</div>
