<script lang="ts">
	export let showingChart: boolean = true;
</script>

<div class="flex justify-center p-3">
	<div class="border border-slate-300 bg-slate-200 rounded p-1 w-64 flex gap-3 justify-between">
		<button
			class={`text-sm font-semibold px-2 py-2 rounded flex-grow ${
				showingChart ? 'text-white bg-sky-800' : 'text-sky-800 '
			}`}
			on:click={() => (showingChart = true)}
		>
			Chart
		</button>
		<button
			class={` text-sm font-semibold px-2 py-2 rounded flex-grow ${
				!showingChart ? 'text-white bg-sky-800' : 'text-sky-800 '
			}`}
			on:click={() => (showingChart = false)}>Table</button
		>
	</div>
</div>
