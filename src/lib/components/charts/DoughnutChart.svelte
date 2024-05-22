<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		DoughnutController,
		ArcElement,
		Tooltip,
		Legend,
		type ChartConfiguration
	} from 'chart.js';
	import { formatAsPercentage } from '$lib/utils';

	// Props
	export let labels: string[];
	export let dataValues: number[];
	export let backgroundColors: string[] = ['#065F46', '#10B981', '#A7F3D0'];
	export let legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

	let chartId: HTMLCanvasElement;
	let doughnutChart: Chart;

	// Register the necessary Chart.js components
	Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

	onMount(() => {
		const config: ChartConfiguration = {
			type: 'doughnut',

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
								return formatAsPercentage(context.parsed);
							}
						},
						boxPadding: 5
					},
					legend: {
						position: legendPosition,

						labels: {
							font: {
								family: 'sans-serif',
								size: 16
							},
							color: '#fff',
							boxWidth: 18
						}
					}
				}
			}
		};

		doughnutChart = new Chart(chartId, config);
	});

	// Update chart when props change
	$: if (doughnutChart) {
		doughnutChart.data.labels = labels;
		doughnutChart.data.datasets[0].data = dataValues;
		doughnutChart.data.datasets[0].backgroundColor = backgroundColors;
		doughnutChart.update();
	}
</script>

<div class="p-3 w-full relative h-full min-h-[300px] md:min-h-[400px]">
	<canvas class="w-full absolute h-full" bind:this={chartId} />
</div>
