<script lang="ts">
	import * as colors from 'tailwindcss/colors';
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		type ChartDataset,
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

	function createDatasets(yearlyData: typeof calculator.outcome.yearlyData) {
		// Create datasets array starting with superannuation
		const datasets = [
			{
				type: 'line' as const,
				label: 'Super Balance',
				data: yearlyData.map((d) => (d.superannuationBalance > 0 ? d.superannuationBalance : null)),
				borderColor: COLOURS[0],
				backgroundColor: `${COLOURS[0]}33`,
				fill: true,
				tension: 0.4,
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 4,
				order: 1
			}
		];

		// If we have at least one data point with investment breakdown data
		if (yearlyData.length > 0 && yearlyData[0].investmentsBreakdown) {
			// Instead of grouping all investments, create individual line for each investment
			const investmentNames = yearlyData[0].investmentsBreakdown.map((inv) => inv.name);

			// For each investment, create a line
			investmentNames.forEach((name, index) => {
				// Calculate color index to avoid color collisions
				const colorIndex = (index + 1) % COLOURS.length;

				datasets.push({
					type: 'line' as const,
					label: name,
					data: yearlyData.map((d) => {
						const investment = d.investmentsBreakdown.find((inv) => inv.name === name);
						return investment && investment.value > 0 ? investment.value : null;
					}),
					borderColor: COLOURS[colorIndex],
					backgroundColor: `${COLOURS[colorIndex]}33`,
					fill: true,
					tension: 0.4,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 4,
					order: index + 2
				});
			});
		}

		return datasets;
	}

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'line',
			data: {
				labels: calculator.outcome.yearlyData.map((d) => d.age),
				datasets: createDatasets(calculator.outcome.yearlyData)
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
							text: 'Asset Balance',
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
		if (chart && calculator.outcome.yearlyData) {
			// Update datasets with new data
			chart.data.datasets = createDatasets(calculator.outcome.yearlyData);

			// Update labels
			chart.data.labels = calculator.outcome.yearlyData.map((d) => d.age);

			chart.update();
		}
	});
</script>

<div class="min-h-[400px] lg:min-h-[500px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
