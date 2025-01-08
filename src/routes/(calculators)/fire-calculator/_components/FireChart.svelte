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
		Filler,
		BarController,
		BarElement,
		type ChartDataset
	} from 'chart.js';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { COLOURS } from '$lib/constants/colours';
	import { TOOLTIP } from '$lib/constants/chartConfig';
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
		Filler,
		BarController,
		BarElement
	);

	type MixedDataset =
		| (ChartDataset<'line', number[]> & { type: 'line' })
		| (ChartDataset<'bar', number[]> & { type: 'bar' });

	function createDatasets(calculationData: typeof calculator.calculationData) {
		const baseDatasets: MixedDataset[] = [
			{
				type: 'line',
				label: 'Investment Value',
				data: calculationData.map((d) => d.investmentValue),
				borderColor: COLOURS[0],
				backgroundColor: `${COLOURS[0]}33`,
				fill: true,
				tension: 0.4,
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 4,
				order: 3
			},
			{
				type: 'line',
				label: 'FIRE Target',
				data: calculationData.map((d) => d.fireTarget),
				borderColor: COLOURS[1],
				borderDash: [5, 5],
				borderWidth: 2,
				pointRadius: 0,
				fill: false,
				order: 1
			}
		];

		const withdrawalDatasets: MixedDataset[] = [];

		if (calculator.secondaryIncome > 0) {
			// Add net withdrawals (withdrawals minus secondary income)
			withdrawalDatasets.push({
				type: 'bar',
				label: 'Withdrawals',
				data: calculationData.map((d) => d.withdrawal - d.secondaryIncome),
				borderColor: COLOURS[2],
				backgroundColor: `${COLOURS[2]}33`,

				borderWidth: 1,
				borderRadius: 2,

				order: 2,
				barPercentage: 0.8,
				stack: 'expenses'
			});

			// Add secondary income bar
			withdrawalDatasets.push({
				type: 'bar',
				label: 'Secondary Income',
				data: calculationData.map((d) => d.secondaryIncome),
				borderColor: COLOURS[3] || colors.green[500],
				backgroundColor: `${COLOURS[3]}33`,

				borderWidth: 1,
				borderRadius: 2,

				order: 2,
				barPercentage: 0.8,
				stack: 'expenses'
			});
		} else {
			// If no secondary income, just show total withdrawals
			withdrawalDatasets.push({
				type: 'bar',
				label: 'Withdrawals',
				data: calculationData.map((d) => d.withdrawal),
				borderColor: COLOURS[2],
				backgroundColor: `${COLOURS[2]}33`,

				borderWidth: 1,
				borderRadius: 2,

				order: 2,
				barPercentage: 0.8,
				stack: 'expenses'
			});
		}

		const dataset: MixedDataset[] = [...baseDatasets, ...withdrawalDatasets];

		return dataset;
	}

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'line',
			data: {
				labels: calculator.calculationData.map((d) => d.age),
				datasets: createDatasets(calculator.calculationData)
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						grid: { display: false },
						title: {
							display: true,
							text: 'Age',
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
							title: (tooltip) => `Age ${tooltip[0].label}`,
							label: (context) => {
								const label = context.dataset.label || '';
								const value = Math.abs(context.parsed.y || 0);
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
		if (chart) {
			// Always start with base dataset
			chart.data.datasets = createDatasets(calculator.calculationData);

			// Update labels
			chart.data.labels = calculator.calculationData.map((d) => d.age);

			chart.update();
		}
	});
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
