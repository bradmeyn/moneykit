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
	import { BRAND_DARK, BRAND_DEFAULT, BRAND_LIGHT } from '$lib/constants/colours';
	import type { AnnualData } from '../calculator.svelte';
	import { TOOLTIP } from '$lib/constants/chartConfig';

	let { data = [] }: { data: AnnualData[] } = $props();
	let years = $derived(data.map((item) => item.year));
	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	// Register the BarController and BarElement
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'bar',

			data: {
				labels: years,
				datasets: [
					{
						label: 'Principal',
						data: Array.from({ length: years.length }, (_, i) => data[0].startingValue),
						backgroundColor: BRAND_DARK,
						borderRadius: 5
					},
					{
						label: 'Contributions',
						data: data.map((item) => item.totalContributions),
						backgroundColor: BRAND_DEFAULT,
						borderRadius: 5
					},
					{
						label: 'Interest',
						data: data.map((item) => item.totalInterest),
						backgroundColor: BRAND_LIGHT,
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
							display: true
						},
						title: {
							display: true,
							text: 'Year',
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: colors.gray[200]
						},
						ticks: {
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: colors.gray[200]
						}
					},
					y: {
						stacked: true,
						grid: {
							display: true,
							color: colors.gray[600]
						},
						beginAtZero: true,
						ticks: {
							callback: (value) => formatAsCurrency(+value, false),
							font: {
								size: 16,
								family: 'sans-serif'
							},
							color: colors.gray[200]
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: true,
						position: 'average',
						mode: 'index',
						...TOOLTIP,
						bodyAlign: 'right',
						footerAlign: 'right',
						boxHeight: 20,
						footerFont: {
							size: 16,
							family: "'Inter', sans-serif"
						},
						footerMarginTop: 8,

						callbacks: {
							title: (tooltip) => `After ${tooltip[0].label} Years`,
							label: (context) => {
								const value = context.parsed.y || 0;
								return ` ${formatAsCurrency(value)}`;
							},
							footer: (tooltipItems) => {
								const total = tooltipItems.reduce((acc, item) => acc + item.parsed.y, 0);
								return `${formatAsCurrency(total)}`;
							}
						}
					},
					legend: {
						display: true,
						position: 'top',
						align: 'center',

						labels: {
							boxWidth: 10,
							boxHeight: 10,
							padding: 16,

							usePointStyle: true,
							pointStyle: 'circle',

							font: {
								size: 16,
								family: "'Inter', sans-serif"
							},
							color: '#fff'
						}
					}
				}
			}
		});
	});

	$effect(() => {
		if (chart) {
			chart.data.labels = years;
			(chart.data.datasets[0].data = Array.from(
				{ length: years.length },
				() => data[0].startingValue
			)),
				(chart.data.datasets[1].data = data.map((item) => item.totalContributions));
			chart.data.datasets[2].data = data.map((item) => item.totalInterest);
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
