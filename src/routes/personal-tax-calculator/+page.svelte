<script lang="ts">
	import Scenario from './_components/Scenario.svelte';
	import ScenarioTabs from '$lib/components/ui/ScenarioTabs.svelte';
	import { scenarios, results, addScenario } from './store';

	let activeScenarioId: number = $scenarios[0]?.id;

	function handleAddScenario() {
		addScenario();
		activeScenarioId = $scenarios[$scenarios.length - 1].id;
	}
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Personal Tax Calculator</h1>

	<!-- tabs -->
	<ScenarioTabs
		scenarioIds={$scenarios.map((s) => s.id)}
		bind:activeScenarioId
		onAdd={handleAddScenario}
	/>

	<!-- Active scenario -->
	{#each $results as result, i}
		{#if $scenarios[i].id === activeScenarioId}
			<Scenario {result} bind:scenario={$scenarios[i]} />
		{/if}
	{/each}

	<!-- Comparison -->
	{#if activeScenarioId === 0}
		<!-- <Comparison /> -->
		<div>
			<p>Comparison</p>
		</div>
	{/if}
</main>
