<script lang="ts">
	import { Plus } from 'lucide-svelte';
	interface Props {
		scenarioIds: number[];
		activeScenarioId?: number;
		maxScenarios?: number;
		handleAddScenario: () => void;
	}

	let {
		scenarioIds,
		activeScenarioId = $bindable(),
		maxScenarios = 2,
		handleAddScenario
	}: Props = $props();
</script>

<div class="flex items-center mb-4">
	<div class="flex gap-3 p-2 text-sm border-ui-400">
		{#each scenarioIds as id}
			<button
				class={` ${activeScenarioId === id ? 'border-b-2 border-b-brand-default ' : 'text-ui-400'}`}
				onclick={() => (activeScenarioId = id)}
			>
				Scenario {id}
			</button>
		{/each}
		{#if scenarioIds.length > 1}
			<button
				class={` ${activeScenarioId === 0 ? 'border-b-2 border-b-brand-default ' : 'text-ui-400'}`}
				onclick={() => (activeScenarioId = 0)}
			>
				Compare
			</button>
		{/if}
	</div>
	{#if scenarioIds.length < maxScenarios}
		<button
			class="flex gap-1 p-1 items-center text-sm justify-center text-ui-400 hover:text-brand-default hover:bg-ui-700 rounded-full"
			onclick={handleAddScenario}
		>
			<Plus class="size-4" />
		</button>
	{/if}
</div>
