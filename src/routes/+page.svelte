<script lang="ts">
	import CalculatorCard from './_components/calculator-card.svelte';
	import { calculators } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>MoneyKit - Financial Tools</title>
	<meta name="description" content="Professional-grade personal finance toolkit." />
</svelte:head>

<main class="flex-1 container mx-auto px-4">
	<div class="text-center max-w-4xl mx-auto pt-16 pb-24">
		<h1 class="text-4xl md:text-8xl mb-6 text-white leading-none font-light">
			Your personal finance
			<span class="relative">
				<span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary"
					>toolkit</span
				>
			</span>
		</h1>
		<p class=" text-xl mb-12 max-w-2xl mx-auto">
			Professional-grade financial tools to help make <span class="text-white"
				>smarter decisions</span
			> with your money
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-24">
		{#each calculators as calculator}
			<CalculatorCard {...calculator} />
		{/each}
	</div>
</main>
