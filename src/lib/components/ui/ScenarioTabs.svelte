<script lang="ts">
	import { CirclePlus } from 'lucide-svelte';
	export let scenarioIds: number[];
	export let activeScenarioId = 1;
	export let onAdd;

	// Assuming $scenarios is a reactive store, you might need to use it directly or ensure it's passed correctly from the parent component
</script>

<div class="flex items-center mb-4">
	<div class="flex gap-3 p-2 text-sm border-slate-400">
		{#each scenarioIds as id}
			<button
				class={` ${
					activeScenarioId === id ? 'border-b-2 border-b-brand-default ' : 'text-slate-400'
				}`}
				on:click={() => (activeScenarioId = id)}
			>
				Scenario {id}
			</button>
		{/each}
		{#if scenarioIds.length > 1}
			<button
				class={` ${
					activeScenarioId === 0 ? 'border-b-2 border-b-brand-default ' : 'text-slate-400'
				}`}
				on:click={() => (activeScenarioId = 0)}
			>
				Compare
			</button>
		{/if}
	</div>
	{#if scenarioIds.length < 3}
		<button
			class="flex gap-1 p-2 items-center rounded-lg text-sm justify-center text-white"
			on:click={onAdd}
		>
			<CirclePlus class="size-5 text-brand-default" />
		</button>
	{/if}
</div>
