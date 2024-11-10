<script lang="ts">
	import { createCalculator } from './calculator.svelte';
	import Scenario from './_components/Scenario.svelte';
	import ScenarioTabs from '$lib/components/ui/ScenarioTabs.svelte';
	import Comparison from './_components/Comparison.svelte';

	let calculator = createCalculator();
	let activeScenarioId: number = $state(calculator.scenarios[0]?.id);

	function handleAddScenario() {
		calculator.addScenario();
		activeScenarioId = calculator.scenarios[calculator.scenarios.length - 1].id;
	}
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Growth Calculator</h1>

	<!-- tabs -->
	<ScenarioTabs
		scenarioIds={calculator.scenarios.map((s) => s.id)}
		bind:activeScenarioId
		{handleAddScenario}
	/>

	<!-- Active scenario -->
	{#each calculator.results as result, i}
		{#if calculator.scenarios[i].id === activeScenarioId}
			<Scenario {result} bind:scenario={calculator.scenarios[i]} />
		{/if}
	{/each}

	<!-- Comparison -->
	{#if activeScenarioId === 0}
		<Comparison scenarios={calculator.scenarios} results={calculator.results} />
	{/if}
</main>
