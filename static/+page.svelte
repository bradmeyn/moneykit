<script lang="ts">
	import CalculatorCard from '../src/lib/components/calculator-card.svelte';
	import { calculators } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>MoneyKit</title>
	<meta name="description" content="Professional-grade personal finance toolkit." />
</svelte:head>

<main class="flex-1 container">
	<div class="text-center max-w-4xl mx-auto py-6 mt-4 mb-8">
		<h1 class="text-5xl md:text-8xl mb-6 text-white leading-none">
			Your personal finance
			<span class="relative">
				<span class="text-brand">toolkit</span>
			</span>
		</h1>
		<p class="text-xl md:text-2xl max-w-4xl mx-auto text-muted-foreground">
			Easy to use financial tools designed to help you make <span class="text-white"
				>smarter decisions</span
			> with your money.
		</p>
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto pb-24"
	>
		{#each calculators as calculator}
			<CalculatorCard {...calculator} />
		{/each}
	</div>
</main>
