<script lang="ts">
	export let name = '';
	export let href = '';

	import barChart from '$lib/assets/bar-chart.svg';
	import pieChart from '$lib/assets/pie-chart.svg';
	import taxCalculator from '$lib/assets/tax-calculator.svg';

	let src = '';

	$: {
		if (name === 'Portfolio Builder') {
			src = pieChart;
		} else if (name === 'Growth Calculator') {
			src = barChart;
		} else if (name === 'Personal Tax Calculator') {
			src = taxCalculator;
		}
	}
</script>

<a
	class="bg-slate-800 dark:hover:border-emerald-500 hover:border-emerald-500 dark:border-slate-600 p-6 border w-80 text-center rounded"
	{href}
>
	<h2 class="text-2xl font-light text-white mb-3">{name}</h2>
	<div class="text-center p-2 text-2xl w-10 h-10 bg-slate-900 rounded mx-auto">
		<img class="w-10" {src} alt={`${name} logo`} />
	</div>
</a>
