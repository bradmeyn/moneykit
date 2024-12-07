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

	import colors from 'tailwindcss/colors';
	import { TOOLTIP } from '$lib/constants/chartConfig';

	interface Props {
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
	}

	let { data, formatter, theme = 'monochrome' }: Props = $props();

	let labels = $derived(data.map((item) => item.label));
	let values = $derived(data.map((item) => item.value));

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						data: data.map((item) => item.value),
						backgroundColor: [colors.blue[500], colors.rose[500], colors.emerald[500]],
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
								size: 14,
								family: 'sans-serif'
							},
							color: colors.slate[100]
						},
						ticks: {
							font: {
								size: 14,
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
								size: 14,
								family: 'sans-serif'
							},
							color: '#CBD5E1'
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: true,
						position: 'average',
						mode: 'index',
						intersect: false,
						bodyAlign: 'right',
						...TOOLTIP,
						callbacks: {
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

	run(() => {
		if (chart) {
			chart.data.labels = labels;
			chart.data.datasets[0].data = values;
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] md:min-h-[500px] min-w-[200px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
