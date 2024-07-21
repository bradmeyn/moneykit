<script lang="ts">
	import { scenarios, results, addScenario } from './store';
	import Scenario from './Scenario.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import ScenarioTabs from '$lib/components/ui/ScenarioTabs.svelte';

	let activeScenarioId: number = $scenarios[0]?.id;

	function handleAddScenario() {
		addScenario();
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
</main>
