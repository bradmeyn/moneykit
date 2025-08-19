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
	import { TOOLTIP } from '$constants/chart-config';
	import { COLOURS } from '$constants/colours';

	let {
		data,
		datasets,
		formatter,
		showLegend = false
	}: {
		data?: { label: string; value: number }[];
		datasets?: {
			label: string;
			data: number[];
			backgroundColor?: string | string[];
			borderColor?: string | string[];
			borderWidth?: number;
			borderRadius?: number;
		}[];
		formatter: (value: number) => string;
		showLegend?: boolean;
	} = $props();

	// For backward compatibility with single dataset
	let labels = $derived(
		data ? data.map((item) => item.label) : datasets?.[0]?.data.map((_, i) => `Item ${i + 1}`) || []
	);

	let chartDatasets = $derived.by(() => {
		if (datasets) {
			return datasets.map((dataset, index) => ({
				label: dataset.label,
				data: dataset.data,
				backgroundColor: dataset.backgroundColor || COLOURS[index % COLOURS.length],
				borderColor:
					dataset.borderColor || dataset.backgroundColor || COLOURS[index % COLOURS.length],
				borderWidth: dataset.borderWidth || 0,
				borderRadius: dataset.borderRadius || 5
			}));
		} else if (data) {
			return [
				{
					data: data.map((item) => item.value),
					backgroundColor: COLOURS.slice(0, data.length),
					borderWidth: 0,
					borderRadius: 5
				}
			];
		}
		return [];
	});

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'bar',
			data: {
				labels,
				datasets: chartDatasets
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
							color: '#ffffff'
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
							color: '#333333'
						},
						stacked: false,
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: '#ffffff'
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
								const label = context.dataset.label || '';
								const value = formatter(context.parsed.y);
								return label ? `${label}: ${value}` : value;
							}
						}
					},
					legend: {
						display: showLegend,

						labels: {
							color: '#fff',
							font: { size: 16, family: 'sans-serif' },
							usePointStyle: true,
							pointStyle: 'circle',
							boxHeight: 8,
							boxWidth: 8
						}
					}
				}
			}
		});
	});

	$effect(() => {
		if (chart) {
			chart.data.labels = labels;
			chart.data.datasets = chartDatasets;
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] md:min-h-[500px] min-w-[200px] relative">
	<canvas class="w-full absolute min-h-full" bind:this={chartId}></canvas>
</div>
