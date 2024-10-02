<script lang="ts">
	import LinkCard from './_components/LinkCard.svelte';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
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

<div class="bg-gradient-to-b from-ui-800 to-ui-950 min-h-screen flex flex-col">
	<Header />
	<main class="flex flex-col flex-1 container mx-auto">
		<h1
			class="text-4xl md:text-6xl lg:text-6xl text-center font-light p-3 my-12 md:my-16 lg:my-20 text-white"
		>
			<div>
				Tools for managing <span
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
