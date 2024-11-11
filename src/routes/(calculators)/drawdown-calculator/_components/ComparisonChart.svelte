<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import {
		Chart,
		LineElement,
		PointElement,
		LineController,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip
	} from 'chart.js';
	import { COLOURFUL, MONOCHROME } from '$lib/constants/colours';
	import colors from 'tailwindcss/colors';

	import type { AnnualData, Result } from '../types';

	interface Props {
		// props
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
		results: Result[];
	}

	let { formatter, theme = 'monochrome', results }: Props = $props();

	const colours = theme === 'monochrome' ? MONOCHROME : COLOURFUL;
	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	// determine longest data set
	let longests = results.reduce((acc, result) => {
		return result.annualData.length > acc ? result.annualData.length : acc;
	}, 0);
	let labels = $derived(Array.from({ length: longests }, (_, i) => i + 1));
	let datasets = $derived(
		results.map((result) => {
			return {
				label: `Scenario ${result.id}`,
				data: result.annualData.map((item: AnnualData) => item.endingBalance),
				borderColor: colours[results.indexOf(result)],
				backgroundColor: colours[results.indexOf(result)] + '40',
				fill: true
			};
		})
	);

	// Register the necessary components for a line chart
	Chart.register(
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip
	);

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'line',
			data: {
				labels,
				datasets
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						grid: {
							display: false
						},
						title: {
							display: true,
							text: 'Year',
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: colors.slate[100]
						},
						ticks: {
							color: colors.slate[100]
						}
					},
					y: {
						grid: {
							display: true,
							color: colors.slate[600]
						},
						beginAtZero: true,
						ticks: {
							callback: (value) => formatter(+value),
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: colors.slate[100]
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: true,
						position: 'nearest',
						mode: 'index',
						intersect: false,
						bodyAlign: 'right',
						titleFont: {
							size: 18
						},
						bodyFont: {
							size: 12,
							family: 'Inter'
						},
						padding: {
							top: 16,
							bottom: 16,
							left: 16,
							right: 16
						},
						bodyColor: 'white',
						callbacks: {
							title: (tooltip) => `After ${tooltip[0].label} Years`,
							label: (context) => {
								const label = context.dataset.label || '';
								const value = context.parsed.y || 0;
								return `${label}: ${formatter(value)}`;
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
			chart.data.datasets = datasets;
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
