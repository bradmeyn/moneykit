<script lang="ts">
	import Scenario from './Scenario.svelte';
	import { scenarios } from './scenariosStore';
</script>

<main class="flex flex-col flex-1 container mx-auto border border-sky-800">
	<h1 class="text-3xl font-bold p-3">Investment Growth Calculator</h1>

	{#each $scenarios as scenario}
		<Scenario {scenario} />
	{/each}
</main>
