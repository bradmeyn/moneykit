<script lang="ts">
	export let viewOptions: { label: string; value: string }[] = [];
	export let selectedView: string = viewOptions.length > 0 ? viewOptions[0].value : '';

	// Function to handle option selection
	function selectOption(value: string) {
		selectedView = value;
	}
</script>

<div class="flex justify-center my-6">
	<div class="bg-slate-800 rounded p-2 w-64 flex gap-3 justify-between">
		{#each viewOptions as option}
			<button
				class={`text-sm font-semibold px-2 py-2 rounded flex-grow ${
					selectedView === option.value ? 'text-white bg-emerald-600' : 'hover:text-emerald-600'
				}`}
				on:click={() => selectOption(option.value)}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
