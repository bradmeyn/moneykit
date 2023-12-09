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
						backgroundColor: '#065F46'
					},
					{
						label: 'Contributions',
						data: contributionsByYear,
						backgroundColor: '#10B981'
					},
					{
						label: 'Interest',
						data: interestByYear,
						backgroundColor: '#A7F3D0'
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
							callback: function (value) {
								return '$ ' + value;
							},
							font: {
								size: 12,
								family: 'Inter',
								weight: '300'
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
						bodyColor: 'white',

						callbacks: {
							title: (tooltip) => `After ${tooltip[0].label} Years`,
							label: (context) => {
								const label = context.dataset.label || '';
								const value = context.parsed.y !== null ? context.parsed.y : context.raw;

								return `${label}: ${value}`;
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

<div class="p-3 w-full relative min-h-[400px] md:min-h-[500px]">
	<canvas class="w-full absolute h-full" bind:this={chartId} />
</div>
