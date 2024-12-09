<script lang="ts">
	import { run } from 'svelte/legacy';

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
	import colors from 'tailwindcss/colors';
	import { TOOLTIP } from '$lib/constants/chartConfig';

	let {
		data,
		formatter
	}: {
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
	} = $props();

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'bar',
			data: {
				labels: ['Total Tax'],
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
							color: colors.slate[100]
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
							color: colors.slate[600]
						},
						stacked: true,
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: colors.slate[100]
						}
					}
				},
				plugins: {
					tooltip: {
						position: 'average',
						mode: 'index',
						intersect: false,
						...TOOLTIP,
						callbacks: {
							title: (context) => context[0].dataset.label,
							label: function (context) {
								return formatter(context.parsed.y);
							}
						}
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
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
