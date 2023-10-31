<script lang="ts">
	export let showingChart: boolean = true;
</script>

<div class="flex justify-center p-3">
	<div class="border border-sky-700 rounded p-1 w-72 flex gap-3 justify-between">
		<button
			class={`text-white text-lg font-semibold px-3 py-2 rounded flex-grow ${
				showingChart ? 'bg-sky-800' : 'text-sky-800 bg-white'
			}`}
			on:click={() => (showingChart = true)}
		>
			Chart
		</button>
		<button
			class={`text-white text-lg font-semibold px-3 py-2 rounded flex-grow ${
				!showingChart ? 'bg-sky-800' : 'text-sky-800 bg-white'
			}`}
			on:click={() => (showingChart = false)}>Table</button
		>
	</div>
</div>
