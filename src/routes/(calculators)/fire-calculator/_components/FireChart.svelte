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
		Filler,
		BarController,
		BarElement
	);

	function createDatasets(calculationData: typeof calculator.calculationData) {
		return [
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
				order: 2
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
			// {
			// 	type: 'bar',
			// 	label: 'Withdrawals',
			// 	data: calculationData.map((d) => (d.withdrawal ? -d.withdrawal : null)),
			// 	backgroundColor: colors.red[500],
			// 	order: 3,
			// 	barPercentage: 1
			// },
			// {
			// 	type: 'bar',
			// 	label: 'Contributions',
			// 	data: calculationData.map((d) => d.contribution || null),
			// 	backgroundColor: colors.green[500],
			// 	order: 3,
			// 	barPercentage: 1
			// }
		];
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
						display: true
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
