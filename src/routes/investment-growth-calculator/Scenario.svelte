<script lang="ts">
	import type { Scenario } from './scenariosStore';
	export let scenario: Scenario;
	import Sidebar from './Sidebar.svelte';
	import { formatCurrency } from '$lib/utilities';
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

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	onMount(() => {
		if (scenario) {
			const data = scenario.outcomes;

			chart = new Chart(chartId, {
				type: 'bar',
				data: {
					labels: data.chartYears,
					datasets: [
						{
							label: 'Initial Investment',
							data: data.chartYears.map(() => scenario.inputs.startingValue),
							backgroundColor: '#224970'
						},
						{
							label: 'Contribution',
							data: data.chartContributions,
							backgroundColor: '#4186cc'
						},
						{
							label: 'Interest Earned',
							data: data.chartInterest,
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
								callback: function (value: any) {
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
									// You need to implement or import the formatCurrency function
									if (typeof value === 'number') {
										return `${label}: ${formatCurrency(value)}`;
									} else {
										return `${label}: ${value}`;
									}
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
		}
	});

	$: {
		const data = scenario.outcomes;

		// Update the chart data
		chart.data.labels = data.chartYears;
		chart.data.datasets[0].data = data.chartYears.map(() => scenario.inputs.startingValue);
		chart.data.datasets[1].data = data.chartContributions;
		chart.data.datasets[2].data = data.chartInterest;

		// Update the chart
		chart.update();
	}
</script>

<section class="flex h-full flex-1">
	<Sidebar {...scenario.inputs} />

	<div class="w-full p-3">
		<div class="grid grid-cols-5 gap-3">
			<div class="border p-3">
				<h2 class="text-sm">Start Value</h2>
				<p class="font-semibold text-xl">{formatCurrency(scenario.inputs.startingValue)}</p>
			</div>
			<div class="border p-3">
				<h2 class="text-sm">Total Contributions</h2>
				<p class="font-semibold text-xl">{formatCurrency(scenario.outcomes.totalContributions)}</p>
			</div>

			<div class="border p-3">
				<h2 class="text-sm">Total Interest</h2>
				<p class="font-semibold text-xl">{formatCurrency(scenario.outcomes.totalInterest)}</p>
			</div>

			<div class="border p-3 col-span-2">
				<h2 class="text-sm">Total Value</h2>
				<p class="font-bold text-xl">{formatCurrency(scenario.outcomes.totalValue)}</p>
			</div>
		</div>
		<div class="w-full h-[600px] p-6"><canvas bind:this={chartId} /></div>
	</div>
</section>
