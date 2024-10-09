<script>
	import '../../app.css';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<svelte:head>
	<title>Wealthkit | Portfolio Builder</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="bg-ui-950 min-h-screen flex flex-col">
	<Header />
	<slot />
	<Footer />
</div>
