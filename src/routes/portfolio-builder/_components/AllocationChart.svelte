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
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';

	// props
	export let labels: string[];
	export let datasets: number[][];
	export let formatter: (value: number) => string;
	export let theme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	$: formattedDatasets = datasets.map((dataset, i) => ({
		data: dataset,
		backgroundColor: colours[i],
		borderWidth: 0,
		borderRadius: 5
	}));

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId, {
			type: 'bar',
			data: {
				labels,
				datasets: formattedDatasets
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
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: '#ffffff'
						}
					},
					y: {
						stacked: false,
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: '#CBD5E1'
						}
					}
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: function (context) {
								return formatter(context.parsed.y);
							}
						},
						boxPadding: 5
					},
					legend: {
						display: false
					}
				}
			}
		});
	});

	$: if (chart) {
		chart.data.labels = labels;
		chart.data.datasets = formattedDatasets;

		chart.update();
	}
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId} />
</div>
