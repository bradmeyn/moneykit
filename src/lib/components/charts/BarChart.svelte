<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip
	} from 'chart.js';

	// props
	export let data: { label: string; value: number }[];
	export let chartColors: string[] = ['#065F46', '#10B981', '#A7F3D0'];
	export let formatter: (value: number) => string;
	$: labels = data.map((item) => item.label);
	$: values = data.map((item) => item.value);

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						data: data.map((item) => item.value),
						backgroundColor: chartColors,
						borderWidth: 0,
						borderRadius: 5
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						stacked: false,
						grid: {
							display: false
						},
						title: {
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: '#E2E8F0'
						},
						ticks: {
							color: '#CBD5E1'
						}
					},
					y: {
						stacked: true,
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: {
								size: 12,
								family: 'sans-serif'
							},
							color: '#CBD5E1'
						}
					}
				},
				plugins: {
					tooltip: {
						callbacks: {
							// label: function (context) {
							// 	return formatter(context.parsed);
							// }
						},
						boxPadding: 5
					},
					legend: {
						display: false
						// labels: {
						// 	font: {
						// 		family: 'sans-serif',
						// 		size: 12
						// 	}
						// }
					}
				}
			}
		});
	});

	$: if (chart) {
		chart.data.labels = labels;
		chart.data.datasets[0].data = values;
		chart.data.datasets[0].backgroundColor = chartColors;

		chart.update();
	}
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId} />
</div>
