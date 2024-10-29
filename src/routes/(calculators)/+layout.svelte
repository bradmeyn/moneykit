<script lang="ts">
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	onMount(() => {
		console.log('LAYOUT DATA', data);
	});

	const { isLoggedIn } = data;
</script>

<svelte:head>
	<title>Wealthkit</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="bg-ui-950 min-h-screen flex flex-col">
	<Header {isLoggedIn} />
	{@render children?.()}
	<Footer />
</div>
