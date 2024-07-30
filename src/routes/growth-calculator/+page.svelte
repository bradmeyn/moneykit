<script lang="ts">
	import { scenarios, results, addScenario } from './store';
	import Scenario from './_components/Scenario.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import ScenarioTabs from '$lib/components/ui/ScenarioTabs.svelte';
	import Comparison from './_components/Comparison.svelte';

	let activeScenarioId: number = $scenarios[0]?.id;

	function handleAddScenario() {
		addScenario();
		activeScenarioId = $scenarios[$scenarios.length - 1].id;
	}
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Growth Calculator</h1>

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
		<Comparison />
	{/if}
</main>
