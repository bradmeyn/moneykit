<script lang="ts">
	import * as colors from 'tailwindcss/colors';
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip,
		Filler
	} from 'chart.js';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../calculator.svelte';
	import { COLOURS } from '$lib/constants/colours';
	import { TOOLTIP } from '$lib/constants/chartConfig';

	let {
		baseData = [],
		comparisonData = [],
		savingsGoal,
		isComparing
	}: {
		baseData: AnnualData[];
		comparisonData: AnnualData[];
		savingsGoal: number;
		isComparing: boolean;
	} = $props();

	let years = $derived(baseData.map((item) => item.year));
	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip,
		Filler
	);

	// Helper function to create dataset
	function createDataset(data: AnnualData[], color: string, label: string, options = {}) {
		return {
			label,
			data: Array.from({ length: years.length }, (_, i) => data[i].endingValue),
			borderColor: color,
			backgroundColor: color + '40',
			fill: true,
			borderWidth: 2,
			pointRadius: 0,
			pointHoverRadius: 4,
			pointBackgroundColor: color,
			...options
		};
	}

	function createGoalDataset(value: number, color: string) {
		return {
			label: 'Goal',
			data: Array.from({ length: years.length }, () => value),
			borderColor: color,
			backgroundColor: 'transparent',
			fill: false,
			borderWidth: 2,
			borderDash: [5, 5],
			pointRadius: 0,
			pointHoverRadius: 4,
			pointBackgroundColor: color
		};
	}

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'line',
			data: {
				labels: years,
				datasets: [
					createDataset(baseData, COLOURS[0], 'Value'),
					...(isComparing ? [createDataset(comparisonData, COLOURS[1], 'Comparison')] : []),
					...(savingsGoal ? [createGoalDataset(savingsGoal, COLOURS[2])] : [])
				]
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						grid: { display: false },
						title: {
							display: true,
							text: 'Year',
							font: { size: 16, family: 'sans-serif' },
							color: colors.slate[200]
						},
						ticks: {
							font: { size: 14, family: 'sans-serif' },
							color: colors.slate[200]
						}
					},
					y: {
						type: 'linear',
						display: true,
						stacked: false,
						position: 'left',
						grid: {
							display: true,
							color: colors.slate[600]
						},
						beginAtZero: true,
						ticks: {
							callback: (value) => formatAsCurrency(+value, false),
							font: { size: 14, family: 'sans-serif' },
							color: colors.slate[200]
						},
						title: {
							display: true,
							text: 'Balance',
							font: { size: 16, family: 'sans-serif' },
							color: colors.slate[200]
						}
					}
				},
				plugins: {
					tooltip: {
						position: 'average',
						mode: 'index',
						bodyAlign: 'right',
						intersect: false,
						...TOOLTIP,
						callbacks: {
							title: (tooltip) => `Year ${tooltip[0].label}`,
							label: (context) => {
								const label = context.dataset.label || '';
								const value = context.parsed.y || 0;
								return `${label}: ${formatAsCurrency(value)}`;
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
			// Always start with base dataset
			chart.data.datasets = [createDataset(baseData, COLOURS[0], 'Value')];

			// Add comparison if active
			if (isComparing) {
				chart.data.datasets.push(createDataset(comparisonData, COLOURS[1], 'Comparison'));
			}

			// Add goal if exists
			if (savingsGoal) {
				chart.data.datasets.push(createGoalDataset(savingsGoal, COLOURS[2]));
			}

			// Update labels
			chart.data.labels = years;

			chart.update();
		}
	});
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
