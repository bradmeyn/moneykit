<script lang="ts">
	import LinkCard from './LinkCard.svelte';

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
		}
	];
</script>

<main class="flex flex-col flex-1">
	<h1
		class="text-4xl md:text-6xl lg:text-6xl text-center font-light p-3 my-12 md:my-16 lg:my-20 text-white"
	>
		<div>
			Tools to manage <span
				class="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500"
			>
				money</span
			>
		</div>
		<div>
			& grow
			<span class="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500">
				wealth</span
			>
		</div>
	</h1>

	<div class="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-10">
		{#each links as link}
			<LinkCard {...link} />
		{/each}
	</div>
</main>
