<script>
	import '../app.css';
	import Header from './_components/Header.svelte';
	import Footer from './_components/Footer.svelte';
</script>

<svelte:head>
	<title>Wealthkit | Portfolio Builder</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<Header />
<slot />
<Footer />
