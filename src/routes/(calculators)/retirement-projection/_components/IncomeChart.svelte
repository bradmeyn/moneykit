<script lang="ts">
	import * as colors from 'tailwindcss/colors';
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		type ChartDataset,
		LinearScale,
		Legend,
		Tooltip,
		BarController,
		BarElement
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
		BarController,
		BarElement
	);

	type MixedDataset =
		| (ChartDataset<'line', number[]> & { type: 'line' })
		| (ChartDataset<'bar', number[]> & { type: 'bar' });

	function calculateIncomeSourceBreakdown(yearlyData: typeof calculator.outcome.yearlyData) {
		return yearlyData.map((d) => {
			if (!d.isRetired || !d.incomeNeeded) return { superWithdrawal: 0, otherWithdrawal: 0 };

			const incomeNeeded = d.incomeNeeded;
			// Maximum that can be withdrawn from super in this year
			const maxSuperWithdrawal = Math.min(d.superannuationBalance, incomeNeeded);

			// Amount needed from other sources if super is insufficient
			const otherWithdrawal =
				incomeNeeded > maxSuperWithdrawal
					? Math.min(d.otherInvestmentsBalance, incomeNeeded - maxSuperWithdrawal)
					: 0;

			return { superWithdrawal: maxSuperWithdrawal, otherWithdrawal };
		});
	}

	function createDatasets(yearlyData: typeof calculator.outcome.yearlyData) {
		// Filter to only show data from retirement age onwards
		const retirementAge = calculator.retirementAge;
		const retirementData = yearlyData.filter((d) => d.age >= retirementAge);

		// Calculate income sources breakdown
		const incomeBreakdown = calculateIncomeSourceBreakdown(retirementData);

		const datasets: MixedDataset[] = [
			{
				type: 'bar',
				label: 'Super Drawdown',
				data: incomeBreakdown.map((breakdown) => breakdown.superWithdrawal),
				backgroundColor: `${COLOURS[0]}33`,
				borderColor: COLOURS[0],
				borderWidth: 1,
				borderRadius: 2,
				stack: 'income-stack',
				order: 2
			},
			{
				type: 'bar',
				label: 'Other Investment Income',
				data: incomeBreakdown.map((breakdown) => breakdown.otherWithdrawal),
				backgroundColor: `${COLOURS[1]}CC`,
				borderColor: COLOURS[1],
				borderWidth: 1,
				borderRadius: 2,
				stack: 'income-stack',
				order: 3
			},
			{
				type: 'line',
				label: 'Target Income',
				data: retirementData.map((d) => d.incomeNeeded || 0),
				borderColor: COLOURS[2],
				backgroundColor: 'transparent',
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 4,
				fill: false,
				tension: 0,
				order: 1
			}
		];

		return datasets;
	}

	onMount(() => {
		// Filter to only show data from retirement age onwards
		const retirementAge = calculator.retirementAge;
		const retirementData = calculator.outcome.yearlyData.filter((d) => d.age >= retirementAge);

		chart = new Chart(chartId!, {
			type: 'bar',
			data: {
				labels: retirementData.map((d) => d.age),
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
							text: 'Annual Income',
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
			// Filter to only show data from retirement age onwards
			const retirementAge = calculator.retirementAge;
			const retirementData = calculator.outcome.yearlyData.filter((d) => d.age >= retirementAge);

			// Update datasets with new data
			chart.data.datasets = createDatasets(calculator.outcome.yearlyData);

			// Update labels to only show retirement years
			chart.data.labels = retirementData.map((d) => d.age);

			chart.update();
		}
	});
</script>

<div class="min-h-[300px] lg:min-h-[350px] relative mt-8">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
