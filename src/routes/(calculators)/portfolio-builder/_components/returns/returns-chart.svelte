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
	import { formatAsPercentage } from '$lib/utils/formatters';
	import type { PortfolioType } from '../../portfolio.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	// Register Chart.js components
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	// Prepare data for the chart
	let chartData = $derived.by(() => {
		const years = Object.keys(portfolio.returns.byYear)
			.map(Number)
			.sort((a, b) => a - b); // Chronological order

		return {
			labels: years.map((year) => year.toString()),
			growthData: years.map((year) => portfolio.returns.byYear[year].growth),
			distributionData: years.map((year) => portfolio.returns.byYear[year].distribution)
		};
	});

	onMount(() => {
		if (!chartId) return;

		chart = new Chart(chartId, {
			type: 'bar',
			data: {
				labels: chartData.labels,
				datasets: [
					{
						label: 'Growth',
						data: chartData.growthData,
						backgroundColor: COLOURS[0],
						borderWidth: 0,
						borderRadius: 3
					},
					{
						label: 'Distribution',
						data: chartData.distributionData,
						backgroundColor: COLOURS[1],
						borderWidth: 0,
						borderRadius: 3
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
						stacked: true,
						grid: {
							display: true,
							color: '#333333'
						},
						title: {
							display: true,
							text: 'Returns',
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: '#ffffff'
						},
						ticks: {
							callback: (value) => formatAsPercentage(+value),
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
						mode: 'index',
						intersect: false,
						...TOOLTIP,
						footerFont: {
							size: 16
						},
						callbacks: {
							title: (context) => `${context[0].label}`,
							label: function (context) {
								return `${context.dataset.label}: ${formatAsPercentage(context.parsed.y)}`;
							},
							footer: function (context) {
								const total = context.reduce((sum, item) => sum + item.parsed.y, 0);
								return `Total: ${formatAsPercentage(total)}`;
							}
						}
					},
					legend: {
						display: true,
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
			chart.data.labels = chartData.labels;
			chart.data.datasets[0].data = chartData.growthData;
			chart.data.datasets[1].data = chartData.distributionData;
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] relative h-full">
	<canvas class="w-full absolute min-h-full p-2" bind:this={chartId}></canvas>
</div>
