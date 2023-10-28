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
	import Sidebar from '$lib/components/growth-calculator/Sidebar.svelte';
	import Results from '$lib/components/growth-calculator/Results.svelte';

	let chartId: HTMLCanvasElement;
	let chart: Chart;

	let startingValue: number = 100000;
	let contributionValue: number = 1000;
	let interestValue: number = 6;
	let frequency: number = 52;
	let yearsValue: number = 10;

	function formatCurrency(value: any) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	}

	let chartYears: number[] = [];
	let chartContributions: number[] = [];
	let chartInterest: number[] = [];
	let chartTotal: number[] = [];

	let totalContributions: number = 0;
	let totalInterest: number = 0;
	let totalValue: number = 0;

	$: {
		chartYears = Array.from({ length: yearsValue }, (_, i) => i + 1);
		totalContributions = contributionValue * frequency * yearsValue;
		totalValue = startingValue;
		totalInterest = 0;

		chartContributions = [];
		chartInterest = [];
		chartTotal = [];

		for (let i = 1; i <= yearsValue; i++) {
			// Calculating the interest
			const interest = totalValue * (interestValue / 100);

			// Adding the interest to the total value
			totalValue += interest;

			// Adding yearly contributions
			totalValue += contributionValue * frequency;
			totalInterest += interest; // Tracking total interest

			// Pushing values to their respective arrays
			chartContributions.push(contributionValue * frequency * i); // Total contributions so far
			chartInterest.push(totalInterest); // Total interest so far
			chartTotal.push(totalValue); // Total value so far
		}

		if (chart) {
			// Update the chart datasets
			chart.data.labels = chartYears;
			chart.data.datasets[0].data = chartYears.map(() => startingValue);
			chart.data.datasets[1].data = chartContributions;
			chart.data.datasets[2].data = chartInterest;

			chart.update();
		}
	}

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
						data: chartYears.map(() => startingValue),
						backgroundColor: '#224970'
					},
					{
						label: 'Contribution',
						data: chartContributions,
						backgroundColor: '#4186cc'
					},
					{
						label: 'Interest Earned',
						data: chartInterest,
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
								// You need to implement or import the formatCurrency function
								return `${label}: ${formatCurrency(value)}`;
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

<main class="flex flex-col flex-1 container mx-auto border border-sky-800">
	<h1 class="text-3xl font-bold p-3">Investment Growth Calculator</h1>

	<section class="md:flex">
		<Sidebar
			bind:startingValue
			bind:contributionValue
			bind:interestValue
			bind:frequency
			bind:yearsValue
		/>

		<div class="w-full p-3">
			<Results bind:startingValue bind:totalContributions bind:totalInterest bind:totalValue />
			<div class="h-[600px] p-6"><canvas bind:this={chartId} /></div>
		</div>
	</section>
</main>
