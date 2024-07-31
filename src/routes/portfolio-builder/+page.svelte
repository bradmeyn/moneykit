<script lang="ts">
	import { addPortfolio, portfolios } from './store';
	import Portfolio from './_components/Portfolio.svelte';

	import ScenarioTabs from '$lib/components/ui/ScenarioTabs.svelte';

	let activeScenarioId: number = $portfolios[0]?.id;

	function handleAddScenario() {
		addPortfolio();
		activeId = $portfolios[$portfolios.length - 1].id;
	}
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Portfolio Builder</h1>

	<!-- tabs -->
	<ScenarioTabs
		scenarioIds={$portfolios.map((s) => s.id)}
		bind:activeScenarioId
		onAdd={handleAddScenario}
	/>

	<!-- Active scenario -->
	{#each $results as result, i}
		{#if $portfolios[i].id === activeScenarioId}
		<Portfolio
			portfolio={$portfolios[i]}
			results={$results[i]}
			{...$portfolios[i]}
		/>
		{/if}
	{/each}

	<!-- Comparison -->
	{#if activeId === 0}
		<Comparison />
	{/if}
</main>
