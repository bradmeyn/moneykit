<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		PieController,
		ArcElement,
		Tooltip,
		Legend,
		type ChartConfiguration
	} from 'chart.js';
	import { formatAsCurrency } from '$lib/utils/formatters';

	// Props
	export let labels: string[];
	export let dataValues: number[];
	export let backgroundColors: string[] = ['#065F46', '#10B981', '#A7F3D0', '#6EE7B7', '#34D399'];
	export let legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	// Register the necessary Chart.js components
	Chart.register(PieController, ArcElement, Tooltip, Legend);

	onMount(() => {
		const config: ChartConfiguration = {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: dataValues,
						backgroundColor: backgroundColors,
						borderWidth: 0,
						borderColor: '#fff'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					tooltip: {
						callbacks: {
							label: function (context) {
								return formatAsCurrency(context.parsed, false, true);
							}
						},
						boxPadding: 5
					},
					legend: {
						position: legendPosition,

						labels: {
							font: {
								size: 16
							},
							color: '#fff',
							boxWidth: 18
						}
					}
				}
			}
		};

		chart = new Chart(chartId, config);
	});

	// Update chart when props change
	$: if (chart) {
		chart.data.labels = labels;
		chart.data.datasets[0].data = dataValues;
		chart.data.datasets[0].backgroundColor = backgroundColors;
		chart.update();
	}
</script>

<div class="w-full bg-slate-800 rounded relative min-h-[300px] max-h-[500px] p-4">
	<canvas class="w-full absolute" bind:this={chartId} />
</div>
