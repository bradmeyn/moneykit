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
		datasets,
		labels,
		formatter,
		showLegend = false,
		enableTooltip = false
	}: {
		// Original single dataset format for backward compatibility
		data?: { label: string; value: number }[];
		// New multiple datasets format
		datasets?: {
			label: string;
			data: number[];
			backgroundColor?: string | string[];
			borderColor?: string | string[];
			borderWidth?: number;
			borderRadius?: number;
		}[];
		labels: string[];
		formatter: (value: number) => string;
		showLegend?: boolean;
		enableTooltip?: boolean;
	} = $props();

	let chartDatasets = $derived.by(() => {
		if (datasets) {
			return datasets.map((dataset, index) => ({
				label: dataset.label,
				data: dataset.data,
				backgroundColor: dataset.backgroundColor || COLOURS[index % COLOURS.length],
				borderColor:
					dataset.borderColor || dataset.backgroundColor || COLOURS[index % COLOURS.length],
				borderWidth: dataset.borderWidth || 0,
				borderRadius: dataset.borderRadius || 5,
				barThickness: 80
			}));
		} else if (data) {
			// Original format - each item becomes its own dataset with single value
			return data.map((item, i) => ({
				label: item.label,
				data: [item.value],
				backgroundColor: COLOURS[i % COLOURS.length],
				borderWidth: 0,
				borderRadius: 5,
				barThickness: 80
			}));
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
						enabled: enableTooltip,
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
							font: { size: 13, family: 'sans-serif' },
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
			chart.data.datasets = chartDatasets;
			chart.data.labels = labels || [];
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
