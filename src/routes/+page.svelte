<script lang="ts">
	import '../app.css';
	import LinkCard from './_components/LinkCard.svelte';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const links = [
		{
			name: 'Growth Calculator',
			href: 'growth-calculator'
		},
		{
			name: 'Budget',
			href: 'budget'
		},
		{
			name: 'Portfolio Builder',
			href: 'portfolio-builder'
		},
		{
			name: 'Personal Tax Calculator',
			href: 'personal-tax-calculator'
		},
		{
			name: 'Drawdown Calculator',
			href: 'drawdown-calculator'
		}
	];
</script>

<svelte:head>
	<title>Wealthkit</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="bg-gradient-to-b from-ui-800 to-ui-950 min-h-screen flex flex-col">
	<Header isLoggedIn={data.isLoggedIn} />
	<main class="flex flex-col flex-1 container mx-auto">
		<h1
			class="text-4xl md:text-6xl lg:text-6xl text-center font-light p-3 my-12 md:my-16 lg:my-20 text-white"
		>
			<div>
				All the tools for managing your <span
					class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
					>money</span
				>
			</div>
		</h1>

		<div class="flex flex-col justify-center items-center flex-wrap gap-5">
			{#each links as link}
				<LinkCard {...link} />
			{/each}
		</div>
	</main>
	<Footer />
</div>
