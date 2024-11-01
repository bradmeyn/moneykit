<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import {
		Chart,
		DoughnutController,
		ArcElement,
		Tooltip,
		Legend,
		type ChartConfiguration
	} from 'chart.js';
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	

	interface Props {
		// Props
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
		[key: string]: any
	}

	let { data, formatter, theme = 'monochrome', ...rest }: Props = $props();
	const chartColors = theme === 'monochrome' ? MONOCHROME : COLOURFUL;

	let chartId: HTMLCanvasElement = $state();
	let doughnutChart: Chart = $state();

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
								return formatter(context.parsed);
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

	let labels = $derived(data.map((item) => item.label));
	let values = $derived(data.map((item) => item.value));
	// Update chart when props change
	run(() => {
		if (doughnutChart) {
			doughnutChart.data.labels = labels;
			doughnutChart.data.datasets[0].data = values;
			doughnutChart.data.datasets[0].backgroundColor = chartColors;
			doughnutChart.update();
		}
	});
</script>

<div class={`w-full relative min-h-[200px] md:min-h-[200px] min-w-[200px]  ${rest.class}`}>
	<canvas class="w-full absolute h-full" bind:this={chartId}></canvas>
</div>
