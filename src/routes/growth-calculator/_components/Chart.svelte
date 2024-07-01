<script lang="ts">
	import Card from '$lib/components/Card.svelte';
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
	import { formatAsCurrency } from '$lib/utils';

	// props
	export let chartYears: number[];
	export let interestByYear: number[];
	export let contributionsByYear: number[];
	export let startingByYear: number[];

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId, {
			type: 'bar',
			data: {
				labels: chartYears,
				datasets: [
					{
						label: 'Principal',
						data: startingByYear,
						backgroundColor: '#065F46',

						borderRadius: 5
					},
					{
						label: 'Contributions',
						data: contributionsByYear,
						backgroundColor: '#10B981',
						borderRadius: 5
					},
					{
						label: 'Interest',
						data: interestByYear,
						backgroundColor: '#A7F3D0',
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
							color: '#E2E8F0'
						},
						ticks: {
							color: '#CBD5E1'
						}
					},
					y: {
						stacked: true,
						beginAtZero: true,
						ticks: {
							callback: (value) => formatAsCurrency(+value, false, true),
							font: {
								size: 12,
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

								return `${label}: ${formatAsCurrency(value, false, true)}`;
							}
						}
					},
					legend: {
						display: true,
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
		chart.data.labels = chartYears;
		chart.data.datasets[0].data = startingByYear;
		chart.data.datasets[1].data = contributionsByYear;
		chart.data.datasets[2].data = interestByYear;
		chart.update();
	}
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId} />
</div>
