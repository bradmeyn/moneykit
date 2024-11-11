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
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';
	import colors from 'tailwindcss/colors';

	interface Props {
		// props
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
	}

	let { data, formatter, theme = 'monochrome' }: Props = $props();

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
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
						backgroundColor: colours,
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
							color: colors.slate[100]
						},
						ticks: {
							font: {
								size: 11,
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
						bodySpacing: 8,
						padding: 12,
						titleFont: {
							size: 16
						},
						bodyFont: {
							size: 16
						},
						bodyColor: 'white',
						borderWidth: 1,
						borderColor: colors.gray[600],
						backgroundColor: colors.gray[800],
						boxPadding: 4,
						caretSize: 0,
						usePointStyle: true,
						multiKeyBackground: 'transparent',

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
			chart.data.datasets[0].backgroundColor = colours;

			chart.update();
		}
	});
</script>

<div class="min-h-[400px] md:min-h-[500px] min-w-[200px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
