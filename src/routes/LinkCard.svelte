<script>
	export let name = '';
	export let href = '';
	export let svgName = '';
	import barChart from '$lib/assets/bar-chart.svg';
	import pieChart from '$lib/assets/pie-chart.svg';

	let svg = svgName === 'bar-chart' ? barChart : pieChart;
</script>

<a
	class="dark:bg-slate-800 border-slate-200 dark:hover:border-emerald-500 hover:border-emerald-500 dark:border-slate-600 bg-slate-100 p-6 border w-80 text-center rounded"
	{href}
>
	<h2 class="text-2xl font-light dark:text-white text-slate-700 mb-3">{name}</h2>
	<div class="text-center p-2 text-2xl w-10 h-10 dark:bg-slate-900 bg-white rounded mx-auto">
		{#if svgName}
			<img class="w-10" src={svg} alt={`${name} logo`} />
		{/if}
	</div>
</a>
