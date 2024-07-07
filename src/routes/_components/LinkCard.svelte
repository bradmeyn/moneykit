<script lang="ts">
	export let name = '';
	export let href = '';

	import CardIcon from './CardIcon.svelte';

	let src = '';

	// $: {
	// 	if (name === 'Portfolio Builder') {
	// 		src = pieChart;
	// 	} else if (name === 'Growth Calculator' || name === 'Budget') {
	// 		src = barChart;
	// 	} else if (name === 'Personal Tax Calculator') {
	// 		src = taxCalculator;
	// 	}
	// }
</script>

<a
	class="bg-slate-800 hover:border-brand-default dark:border-slate-600 p-4 gap-4 border w-full md:w-[400px] rounded flex items-center justify-start transition-colors duration-300 ease-in-out"
	{href}
>
	<CardIcon {name} />
	<h2 class="text-xl font-light mb-0 text-white">{name}</h2>
</a>
