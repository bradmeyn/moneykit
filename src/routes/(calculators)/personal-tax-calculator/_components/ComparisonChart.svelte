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
	import { COLOURS } from '$lib/constants/COLOURS';
	import colors from 'tailwindcss/colors';

	type Result = {
		id: number;
		taxableIncome: number;
		incomeTax: number;
		lowIncomeOffset: number;
		helpRepayment: number;
		medicareLevy: number;
		medicareLevySurcharge: number;
		totalTax: number;
	};

	interface Props {
		// props
		results: Result[];
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
	}

	let { results, formatter, theme = 'monochrome' }: Props = $props();

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();

	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	const taxComponents = [
		'incomeTax',
		'lowIncomeOffset',
		'helpRepayment',
		'medicareLevy',
		'medicareLevySurcharge'
	] as const;

	function prepareChartData(results: Result[]) {
		return taxComponents.map((component, index) => ({
			label: component,
			data: results.map((result) => result[component]),
			backgroundColor: COLOURS[index % COLOURS.length],
			borderWidth: 0,
			borderRadius: 5,
			barThickness: 80
		}));
	}

	onMount(() => {
		chart = new Chart(chartId!, {
			type: 'bar',
			data: {
				labels: results.map((result) => `Scenario ${result.id}`),
				datasets: prepareChartData(results)
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						stacked: true,
						grid: { display: false },
						title: {
							font: { size: 16, family: 'sans-serif' },
							color: colors.slate[100]
						},
						ticks: {
							font: { size: 16, family: 'sans-serif' },
							color: '#ffffff'
						}
					},
					y: {
						stacked: true,
						beginAtZero: true,
						grid: {
							display: true,
							color: colors.slate[600]
						},
						ticks: {
							callback: (value) => formatter(+value),
							font: { size: 16, family: 'sans-serif' },
							color: colors.slate[100]
						}
					}
				},
				plugins: {
					tooltip: {
						callbacks: {
							title: (context) => context[0].dataset.label,
							label: (context) => formatter(context.parsed.y)
						},
						boxPadding: 5
					},
					legend: { display: false }
				}
			}
		});
	});

	$effect(() => {
		if (chart) {
			chart.data.labels = results.map((result) => `Scenario ${result.id}`);
			chart.data.datasets = prepareChartData(results);
			chart.update();
		}
	});
</script>

<div class="min-h-[400px] relative">
	<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
</div>
