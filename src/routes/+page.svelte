<script lang="ts">
	import CalculatorCard from './_components/CalculatorCard.svelte';

	import { calculators } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>MoneyKit - Smart Financial Tools</title>
	<meta
		name="description"
		content="All the tools you need to manage your money and build wealth effectively."
	/>
	<meta
		name="og:description"
		content="All the tools you need to manage your money and build wealth effectively."
	/>
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<main class="flex-1 container mx-auto px-4">
	<!-- Hero Section -->
	<div class="text-center max-w-4xl mx-auto pt-16 pb-24">
		<h1 class="text-4xl md:text-7xl font-light mb-6 text-white leading-tight">
			Your financial planning
			<span class="relative">
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary"
					>toolkit</span
				>
				<!-- Decorative underline -->
			</span>
		</h1>
		<p class="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
			Professional-grade financial tools to help you make smarter decisions with your money
		</p>
	</div>

	<!-- Tools Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-24">
		{#each calculators as calculator}
			<CalculatorCard {...calculator} />
		{/each}
	</div>
</main>
