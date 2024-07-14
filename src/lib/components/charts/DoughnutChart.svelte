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
	import { formatAsPercentage } from '$lib/utils/formatters';

	// Props
	export let data: { label: string; value: number }[];

	$: labels = data.map((item) => item.label);
	$: values = data.map((item) => item.value);

	export let chartColors: string[] = ['#065F46', '#10B981', '#A7F3D0'];

	let chartId: HTMLCanvasElement;
	let doughnutChart: Chart;

	// Register the necessary Chart.js components
	Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

	onMount(() => {
		const config: ChartConfiguration = {
			type: 'doughnut',

			data: {
				labels,
				datasets: [
					{
						data: data.map((item) => item.value),
						backgroundColor: chartColors,
						borderWidth: 0
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
						display: false,

						labels: {
							font: {
								family: 'sans-serif',
								size: 12
							}
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
		doughnutChart.data.datasets[0].data = values;
		doughnutChart.data.datasets[0].backgroundColor = chartColors;
		doughnutChart.update();
	}
</script>

<div class={`w-full relative min-h-[200px] md:min-h-[200px] min-w-[200px]  ${$$restProps.class}`}>
	<canvas class="w-full absolute h-full" bind:this={chartId} />
</div>
