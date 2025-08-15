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
	import { COLOURS } from '$lib/constants/colours';
	import { TOOLTIP } from '$constants/chart-config';

	let {
		data,
		labels,
		formatter
	}: {
		data: { label: string; value: number }[];
		labels: string[];
		formatter: (value: number) => string;
	} = $props();

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'bar',

			data: {
				labels,
				datasets: data.map((item, i) => ({
					label: item.label,
					data: [item.value],
					backgroundColor: COLOURS[i],
					borderWidth: 0,
					borderRadius: 5
				}))
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						stacked: true,
						grid: {
							display: false
						},
						title: {
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: '#ffffff'
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
						grid: {
							display: true,
							color: '#333333'
						},
						stacked: true,
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: '#ffffff'
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: false
					},
					legend: {
						display: false
					}
				}
			}
		});
	});

	$effect(() => {
		if (chart) {
			chart.data.datasets = data.map((item, i) => ({
				label: item.label,
				data: [item.value],
				backgroundColor: COLOURS[i],
				borderWidth: 0,
				borderRadius: 5,
				barThickness: 80
			}));
			chart.data.labels = labels || [];
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
