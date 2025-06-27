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
		BarController,
		BarElement
	);

	type MixedDataset =
		| (ChartDataset<'line', number[]> & { type: 'line' })
		| (ChartDataset<'bar', number[]> & { type: 'bar' });

	function calculateIncomeSourceBreakdown(yearlyData: typeof calculator.outcome.yearlyData) {
		return yearlyData.map((d) => {
			if (!d.isRetired || !d.incomeNeeded) return { superWithdrawal: 0, investmentWithdrawals: [] };

			const incomeNeeded = d.incomeNeeded;
			// Maximum that can be withdrawn from super in this year
			const maxSuperWithdrawal = Math.min(d.superannuationBalance, incomeNeeded);

			// If super can cover everything, no need for other investments
			if (maxSuperWithdrawal >= incomeNeeded) {
				return { superWithdrawal: maxSuperWithdrawal, investmentWithdrawals: [] };
			}

			// Amount still needed after super
			let remainingNeeded = incomeNeeded - maxSuperWithdrawal;

			// Calculate withdrawals from each investment
			const investmentWithdrawals: Array<{ name: string; withdrawal: number }> = [];

			// If we have investment breakdown data
			if (d.investmentsBreakdown && d.investmentsBreakdown.length > 0) {
				// Total investment value for proportion calculations
				const totalInvestmentValue = d.otherInvestmentsBalance;

				if (totalInvestmentValue > 0) {
					// Calculate withdrawal from each investment proportionally
					d.investmentsBreakdown.forEach((inv) => {
						if (inv.value > 0) {
							const proportion = inv.value / totalInvestmentValue;
							const withdrawal = Math.min(inv.value, remainingNeeded * proportion);

							if (withdrawal > 0) {
								investmentWithdrawals.push({
									name: inv.name,
									withdrawal
								});
							}
						}
					});
				}
			}

			return {
				superWithdrawal: maxSuperWithdrawal,
				investmentWithdrawals
			};
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
				data: incomeBreakdown.map((breakdown) =>
					breakdown.superWithdrawal > 0 ? breakdown.superWithdrawal : null
				),
				backgroundColor: `${COLOURS[0]}70`,
				borderColor: COLOURS[0],
				borderWidth: 1,
				borderRadius: 2,
				stack: 'income-stack',
				order: 2
			},
			{
				type: 'line',
				label: 'Target Income',
				data: retirementData.map((d) => (d.incomeNeeded > 0 ? d.incomeNeeded : null)),
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

		// Get all unique investment names across all years
		const allInvestmentNames = new Set<string>();
		incomeBreakdown.forEach((breakdown) => {
			breakdown.investmentWithdrawals.forEach((inv) => {
				allInvestmentNames.add(inv.name);
			});
		});

		// Create a dataset for each investment
		Array.from(allInvestmentNames).forEach((name, index) => {
			// Calculate color index (start from index 1 to avoid color collision with super)
			const colorIndex = (index + 1) % COLOURS.length;

			datasets.push({
				type: 'bar',
				label: `${name} Income`,
				data: incomeBreakdown.map((breakdown) => {
					const investmentData = breakdown.investmentWithdrawals.find((inv) => inv.name === name);
					return investmentData && investmentData.withdrawal > 0 ? investmentData.withdrawal : null;
				}),
				backgroundColor: `${COLOURS[colorIndex]}CC`,
				borderColor: COLOURS[colorIndex],
				borderWidth: 1,
				borderRadius: 2,
				stack: 'income-stack',
				order: index + 3
			});
		});

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
								// Don't show zero values
								if (value <= 0) return '';
								return `${label}: ${formatAsCurrency(value)}`;
							},
							// Filter out empty labels
							afterBody: (tooltipItems) => {
								// If we're in retirement phase, add total income
								const age = parseInt(tooltipItems[0].label);
								const yearData = calculator.outcome.yearlyData.find((d) => d.age === age);

								if (yearData && yearData.isRetired && yearData.incomeNeeded) {
									const totalDrawdown = tooltipItems.reduce((sum, item) => {
										// Skip the target income line, only count actual drawdowns
										if (item.dataset.type === 'bar') {
											return sum + (item.parsed.y || 0);
										}
										return sum;
									}, 0);

									const coverage = (totalDrawdown / yearData.incomeNeeded) * 100;

									return [
										'',
										`Total Income: ${formatAsCurrency(totalDrawdown)}`,
										`Income Coverage: ${coverage.toFixed(1)}%`
									];
								}

								return [];
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

<div class="min-h-[400px] lg:min-h-[500px] relative mt-8">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
