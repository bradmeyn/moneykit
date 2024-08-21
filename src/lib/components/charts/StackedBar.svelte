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
	import colors from 'tailwindcss/colors';

	// props
	export let labels: string[];
	export let data: { label: string; value: number }[];
	export let formatter: (value: number) => string;
	export let theme: 'monochrome' | 'colourful' = 'monochrome';

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
	let chartId: HTMLCanvasElement;
	let chart: Chart;

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId, {
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
</script>

<div class="min-h-[400px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId} />
</div>
