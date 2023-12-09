<script lang="ts">
	export let isChartView: boolean = true;
</script>

<div class="flex justify-center my-6">
	<div class=" bg-slate-800 rounded p-2 w-64 flex gap-3 justify-between">
		<button
			class={`text-sm font-semibold px-2 py-2 rounded flex-grow ${
				isChartView ? 'text-white bg-emerald-600' : 'text-emerald-600 '
			}`}
			on:click={() => (isChartView = true)}
		>
			Chart
		</button>
		<button
			class={` text-sm font-semibold px-2 py-2 rounded flex-grow ${
				!isChartView ? 'text-white bg-emerald-600' : 'text-emerald-600 '
			}`}
			on:click={() => (isChartView = false)}>Table</button
		>
	</div>
</div>
