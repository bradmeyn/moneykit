<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		DoughnutController,
		ArcElement,
		Tooltip,
		Legend,
		type ChartConfiguration
	} from 'chart.js';

	interface Props {
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
		theme?: 'monochrome' | 'colourful';
		title?: string;
		[key: string]: any;
	}

	let {
		data,
		formatter,
		theme = 'colourful',
		title = 'Expense Categories',
		...rest
	}: Props = $props();

	// Modern, vibrant color palette
	const CHART_COLORS = {
		colourful: [
			'#3B82F6', // bright blue
			'#EC4899', // pink
			'#F59E0B', // yellow
			'#10B981', // green
			'#6366F1' // indigo
		],
		monochrome: ['#1E293B', '#334155', '#475569', '#64748B', '#94A3B8']
	};

	const chartColors = CHART_COLORS[theme];

	//  @ts-expect-error - chartId is not initialized
	let chartId: HTMLCanvasElement = $state();
	//  @ts-expect-error - doughnutChart is not initialized
	let doughnutChart: Chart = $state();

	Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

	onMount(() => {
		const config: ChartConfiguration = {
			type: 'doughnut',
			data: {
				labels: data.map((item) => item.label),
				datasets: [
					{
						data: data.map((item) => item.value),
						backgroundColor: chartColors,
						borderWidth: 0,
						borderRadius: 4,
						spacing: 2,
						hoverOffset: 8
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutout: '75%',
				layout: {
					padding: 20
				},
				plugins: {
					tooltip: {
						backgroundColor: '#1E293B',
						titleFont: {
							size: 14,

							family: "'Inter', sans-serif"
						},
						bodyFont: {
							size: 13,
							family: "'Inter', sans-serif"
						},
						padding: 12,
						cornerRadius: 8,
						callbacks: {
							label: function (context) {
								return ` ${formatter(context.parsed)}`;
							}
						}
					},
					legend: {
						display: false,
						position: 'bottom' as const,
						align: 'start' as const,
						labels: {
							usePointStyle: true,
							pointStyle: 'circle',
							padding: 20,
							color: '#94A3B8',
							font: {
								family: "'Inter', sans-serif",
								size: 14
							},
							generateLabels: (chart) => {
								const data = chart.data;

								return data.labels.map((label, i) => ({
									text: `${label}    ${formatter(data.datasets[0].data[i])}`,
									fillStyle: chartColors[i],
									strokeStyle: chartColors[i],
									lineWidth: 0,
									hidden: false,
									index: i
								}));
							}
						}
					}
				}
			}
		};

		doughnutChart = new Chart(chartId, config);
	});

	let labels = $derived(data.map((item) => item.label));
	let values = $derived(data.map((item) => item.value));

	$effect(() => {
		if (doughnutChart) {
			doughnutChart.data.labels = labels;
			doughnutChart.data.datasets[0].data = values;
			doughnutChart.update();
		}
	});
</script>

<div class={`w-full relative min-h-[400px] ${rest.class}`}>
	{#if title}
		<h2 class="text-2xl font-semibold mb-4 text-center text-slate-100">{title}</h2>
	{/if}
	<canvas class="w-full absolute h-full" bind:this={chartId}></canvas>
</div>
