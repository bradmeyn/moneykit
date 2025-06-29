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
	import { COLOURS } from '$lib/constants/colours';
	import { TOOLTIP } from '$constants/chart-config';
	import { getCalculatorState } from '../calculator.svelte';

	const calculator = getCalculatorState();

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

	let years = $derived(
		Array.from(
			{ length: Math.ceil(calculator.totalPeriods / calculator.periodsPerYear) },
			(_, i) => i + 1
		)
	);

	function getSafePeriodData(periodData: any[], index: number) {
		return periodData && periodData[index]
			? periodData[index]
			: { balance: 0, totalInterestPaid: 0 };
	}

	function createDataset(
		valueKey: 'balance' | 'totalInterestPaid' | 'propertyValue',
		color: string,
		label: string,
		options = {}
	) {
		const periodData = calculator.projection.breakdown || [];

		const data = Array.from({ length: years.length }, (_, i) => {
			const periodIndex = (i + 1) * calculator.periodsPerYear - 1;
			return getSafePeriodData(periodData, periodIndex)[valueKey];
		});

		return {
			label,
			data,
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

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'line',
			data: {
				labels: years,
				datasets: [
					createDataset('balance', COLOURS[0], 'Loan Balance'),
					createDataset('totalInterestPaid', COLOURS[1], 'Total Interest'),
					...(calculator.propertyValue > 0
						? [createDataset('propertyValue', COLOURS[2], 'Property Value')]
						: [])
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
							color: '#FFFFFF'
						},
						ticks: {
							font: { size: 14, family: 'sans-serif' },
							color: '#FFFFFF'
						}
					},
					y: {
						type: 'linear',
						display: true,
						stacked: false,
						position: 'left',
						min: 0,
						grid: {
							display: true,
							color: '#333333'
						},
						beginAtZero: true,
						ticks: {
							callback: (value) => formatAsCurrency(+value, false),
							font: { size: 14, family: 'sans-serif' },
							color: '#FFFFFF'
						},
						title: {
							display: false,
							text: 'Amount',
							font: { size: 16, family: 'sans-serif' },
							color: '#FFFFFF'
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
						position: 'top',
						align: 'end',
						labels: {
							usePointStyle: true,
							pointStyle: 'circle',
							boxWidth: 8,
							boxHeight: 8,
							padding: 20,
							color: '#FFFFFF',
							font: {
								size: 14,
								family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
							}
						}
					}
				}
			}
		});
	});

	$effect(() => {
		if (chart && chart.data) {
			chart.data.datasets = [
				createDataset('balance', COLOURS[0], 'Loan Balance'),
				createDataset('totalInterestPaid', COLOURS[1], 'Total Interest'),
				...(calculator.propertyValue > 0
					? [createDataset('propertyValue', COLOURS[2], 'Property Value')]
					: [])
			];
			chart.data.labels = years;
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
