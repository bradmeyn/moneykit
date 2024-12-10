<script lang="ts">
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
	import { COLOURS } from '$lib/constants/colours';
	import colors from 'tailwindcss/colors';
	import type { AnnualData, Result } from '../types';

	let {
		formatter,
		results
	}: {
		formatter: (value: number) => string;
		results: Result[];
	} = $props();

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
				borderColor: COLOURS[results.indexOf(result)],
				backgroundColor: COLOURS[results.indexOf(result)] + '40',
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

	$effect(() => {
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
