<script lang="ts">
	import { onMount } from 'svelte';
	import { scenarios, addScenario } from './scenariosStore';
	import type { Scenario as ScenarioType } from './scenariosStore';
	import Scenario from './Scenario.svelte';

	let activeScenario: ScenarioType;

	onMount(() => {
		// Set the initial active scenario
		if ($scenarios.length > 0) {
			activeScenario = $scenarios[0];
		}
	});

	const setActiveScenario = (scenario: ScenarioType) => {
		activeScenario = scenario;
	};
</script>

<main class="flex flex-col flex-1 container mx-auto border border-sky-800">
	<h1 class="text-3xl font-bold p-3">Investment Growth Calculator</h1>

	<div class="flex gap-3">
		{#each $scenarios as scenario}
			<button
				on:click={() => setActiveScenario(scenario)}
				class="bg-slate-700 text-white rounded p-3 mx-2"
			>
				{scenario.id}
			</button>
		{/each}

		<button on:click={addScenario}> Add Scenario </button>
	</div>

	<!-- Render the active scenario details -->
	{#if activeScenario}
		<div>
			<h2 class="text-8xl">{activeScenario.id}</h2>
		</div>
	{/if}
</main>
