<script lang="ts">
	import { onMount } from 'svelte';
	import { formatCurrency } from '$lib/utils';
	import {
		Chart,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip
	} from 'chart.js';

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
						label: 'Initial Investment',
						data: startingByYear,
						backgroundColor: '#224970'
					},
					{
						label: 'Contribution',
						data: contributionsByYear,
						backgroundColor: '#4186cc'
					},
					{
						label: 'Interest Earned',
						data: interestByYear,
						backgroundColor: '#93c8fc'
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
								family: 'Inter'
							}
						}
					},
					y: {
						stacked: true,
						beginAtZero: true,
						ticks: {
							callback: function (value) {
								return '$' + value; // Modify as per your needs
							},
							font: {
								size: 12,
								family: 'Inter',
								weight: '300'
							}
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: true,
						position: 'nearest',

						mode: 'index',
						intersect: false,
						titleAlign: 'center',
						bodyAlign: 'right',
						titleFont: {
							size: 15
						},
						bodyFont: {
							size: 12
						},
						padding: {
							top: 10,
							bottom: 10,
							left: 10,
							right: 10
						},

						callbacks: {
							title: (tooltip) => `After ${tooltip[0].label} Years`,
							label: (context) => {
								const label = context.dataset.label || '';
								const value = context.parsed.y !== null ? context.parsed.y : context.raw;

								return `${label}: ${value}`;

								// // You need to implement or import the formatCurrency function
								// return `${label}: ${formatCurrency(value)}`;
							}
						}
					},
					legend: {
						display: true,
						labels: {
							font: {
								size: 14,
								family: 'Inter',
								weight: '300'
							}
						}
					}
				}
			}
		});
	});
</script>
