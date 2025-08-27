<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip
	} from 'chart.js';
	import { COLOURS } from '$lib/constants/colours';
	import { TOOLTIP } from '$constants/chart-config';

	let {
		datasets,
		labels,
		formatter,
		showLegend = false,
		enableTooltip = false
	}: {
		datasets: {
			label: string;
			data: number[];
			borderColor?: string;
			backgroundColor?: string;
			borderWidth?: number;
			pointRadius?: number;
			fill?: boolean;
		}[];
		labels: string[];
		formatter: (value: number) => string;
		showLegend?: boolean;
		enableTooltip?: boolean;
	} = $props();

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip
	);

	function getLineDatasets() {
		return datasets.map((dataset, index) => ({
			label: dataset.label,
			data: dataset.data,
			borderColor: dataset.borderColor || COLOURS[index % COLOURS.length],
			backgroundColor: dataset.backgroundColor || COLOURS[index % COLOURS.length],
			borderWidth: dataset.borderWidth || 2,
			pointRadius: dataset.pointRadius ?? 3,
			fill: dataset.fill ?? false
		}));
	}

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'line',
			data: {
				labels,
				datasets: getLineDatasets()
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						grid: { display: false },
						title: {
							font: { size: 16, family: 'sans-serif' },
							color: '#ffffff'
						},
						ticks: {
							font: { size: 14, family: 'sans-serif' },
							color: '#ffffff'
						}
					},
					y: {
						grid: { display: true, color: '#333333' },
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: { size: 14, family: 'sans-serif' },
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
			chart.data.datasets = getLineDatasets();
			chart.data.labels = labels || [];
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
