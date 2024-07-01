<script lang="ts">
	import LinkCard from './_components/LinkCard.svelte';
	import Icon from '@iconify/svelte';

	const links = [
		{
			name: 'Growth Calculator',
			href: 'growth-calculator',
			svgName: 'bar-chart.svg'
		},
		{
			name: 'Portfolio Builder',
			href: 'portfolio-builder',
			svgName: 'pie-chart.svg'
		},
		{
			name: 'Personal Tax Calculator',
			href: 'personal-tax-calculator',
			svgName: 'calculator.svg'
		}
	];
</script>

<main class="flex flex-col flex-1 container mx-auto">
	<h1
		class="text-4xl md:text-6xl lg:text-6xl text-center font-light p-3 my-12 md:my-16 lg:my-20 text-white"
	>
		<div>
			Tools to manage <span
				class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
				>money</span
			>
		</div>
		<div>
			& grow
			<span
				class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
			>
				wealth</span
			>
		</div>
	</h1>

	<div class="flex flex-col md:flex-row justify-center items-center flex-wrap gap-5">
		{#each links as link}
			<LinkCard {...link} />
		{/each}
	</div>
</main>
