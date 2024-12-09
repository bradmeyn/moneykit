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
	import colors from 'tailwindcss/colors';
	import { TOOLTIP } from '$lib/constants/chartConfig';
	import { COLOURS } from '$constants/colours';

	interface Props {
		data: { label: string; value: number }[];
		formatter: (value: number) => string;
	}

	let { data, formatter }: Props = $props();

	//  @ts-expect-error - chartId is not initialized
	let chartId!: HTMLCanvasElement = $state();
	//  @ts-expect-error - doughnutChart is not initialized
	let doughnutChart!: Chart = $state();

	Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

	onMount(() => {
		const config: ChartConfiguration = {
			type: 'doughnut',
			data: {
				labels: data.map((item) => item.label),
				datasets: [
					{
						data: data.map((item) => item.value),
						backgroundColor: COLOURS,
						borderWidth: 0,
						borderColor: colors.transparent,

						spacing: 3,
						hoverOffset: 8
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,

				// @ts-expect-error - Weird typings
				cutout: '70%',

				plugins: {
					tooltip: {
						...TOOLTIP,
						callbacks: {
							label: function (context) {
								return ` ${formatter(context.parsed)}`;
							}
						}
					},
					legend: {
						display: false
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

<div class="w-full relative min-h-[200px] md:min-h-[200px] min-w-[200px] my-6">
	<canvas class="w-full absolute inset-0" bind:this={chartId}></canvas>
</div>
