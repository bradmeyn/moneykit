<script lang="ts">
	import * as colors from 'tailwindcss/colors';
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
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../types';
	import { MONOCHROME } from '$lib/constants/colours';

	// props
	export let data: AnnualData[] = [];

	$: years = data.map((item) => item.year);

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId, {
			type: 'bar',
			data: {
				labels: years,
				datasets: [
					{
						label: 'Principal',
						data: Array.from({ length: years.length }, (_, i) => data[0].startingValue),
						backgroundColor: MONOCHROME[0],
						borderRadius: 5
					},
					{
						label: 'Contributions',
						data: data.map((item) => item.totalContributions),
						backgroundColor: MONOCHROME[1],
						borderRadius: 5
					},
					{
						label: 'Interest',
						data: data.map((item) => item.totalInterest),
						backgroundColor: MONOCHROME[2],
						borderRadius: 5
					}
				]
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
						stacked: true,
						grid: {
							display: true,
							color: colors.slate[600]
						},
						beginAtZero: true,
						ticks: {
							callback: (value) => formatAsCurrency(+value, false),
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

								return `${label}: ${formatAsCurrency(value, false)}`;
							}
						}
					},
					legend: {
						display: false,
						labels: {
							font: {
								size: 14,
								family: 'Inter'
							},
							color: 'white',
							boxWidth: 15
						}
					}
				}
			}
		});
	});

	$: if (chart) {
		chart.data.labels = years;
		(chart.data.datasets[0].data = Array.from(
			{ length: years.length },
			(_, i) => data[0].startingValue
		)),
			(chart.data.datasets[1].data = data.map((item) => item.totalContributions));
		chart.data.datasets[2].data = data.map((item) => item.totalInterest);
		chart.update();
	}
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId} />
</div>
