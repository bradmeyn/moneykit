<script lang="ts">
	import { scenarios, results, addScenario } from './store';
	import Portfolio from './_components/Portfolio.svelte';
	import Comparison from './_components/Comparison.svelte';
	import ScenarioTabs from '$lib/components/ui/ScenarioTabs.svelte';

	let activeScenarioId: number = $state($scenarios[0]?.id);

	function handleAddScenario() {
		addScenario();
		activeScenarioId = $scenarios[$scenarios.length - 1].id;
	}
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Portfolio Builder</h1>

	<!-- Tabs -->
	<ScenarioTabs
		scenarioIds={$scenarios.map((s) => s.id)}
		bind:activeScenarioId
		onAdd={handleAddScenario}
	/>

	<!-- Active scenario -->
	{#each $results as result, i}
		{#if $scenarios[i].id === activeScenarioId}
			<Portfolio scenario={$scenarios[i]} {result} />
		{/if}
	{/each}

	<!-- Comparison -->
	{#if activeScenarioId === 0}
		<Comparison />
	{/if}
</main>
