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
					backgroundColor: colours[i],
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
						bodySpacing: 8,
						padding: 12,

						cornerRadius: 4,
						titleFont: {
							size: 16,
							family: "'Inter', sans-serif"
						},
						bodyFont: {
							size: 16,
							family: "'Inter', sans-serif"
						},
						bodyAlign: 'right',

						bodyColor: 'white',
						borderWidth: 1,
						borderColor: colors.gray[600],
						backgroundColor: colors.gray[900],
						boxPadding: 4,
						caretSize: 0,
						usePointStyle: true,
						multiKeyBackground: 'transparent',
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

	run(() => {
		if (chart) {
			chart.data.datasets = data.map((item, i) => ({
				label: item.label,
				data: [item.value],
				backgroundColor: colours[i],
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
