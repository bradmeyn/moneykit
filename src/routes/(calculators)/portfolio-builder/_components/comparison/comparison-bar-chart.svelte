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
	import { assetLabels } from '../../investments';

	export let portfolio1;
	export let portfolio2;

	const assetKeys = [
		'ausEquities',
		'intEquities',
		'ausFixedInterest',
		'intFixedInterest',
		'cash',
		'alternatives'
	];

	let chartId;
	let chart;

	onMount(() => {
		if (chart) chart.destroy();
		Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

		const labels = assetKeys.map((key) => assetLabels[key]);
		const data1 = assetKeys.map((key) => portfolio1?.assetAllocation?.[key] ?? 0);
		const data2 = assetKeys.map((key) => portfolio2?.assetAllocation?.[key] ?? 0);

		chart = new Chart(chartId, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Portfolio 1',
						data: data1,
						backgroundColor: '#FF7043',
						borderRadius: 5,
						borderWidth: 0
					},
					{
						label: 'Portfolio 2',
						data: data2,
						backgroundColor: '#42A5F5',
						borderRadius: 5,
						borderWidth: 0
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				plugins: {
					legend: {
						display: true,
						labels: {
							color: '#fff',
							font: { size: 14, family: 'sans-serif' },
							usePointStyle: true,
							pointStyle: 'circle'
						}
					},
					tooltip: {
						enabled: true,
						callbacks: {
							label: function (context) {
								return `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(1)}%`;
							}
						}
					}
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: { color: '#fff', font: { size: 14, family: 'sans-serif' } }
					},
					y: {
						beginAtZero: true,
						grid: { color: '#333' },
						ticks: {
							color: '#fff',
							font: { size: 14, family: 'sans-serif' },
							callback: (v) => `${(Number(v) * 100).toFixed(0)}%`
						}
					}
				}
			}
		});
	});
</script>

<div class="min-h-[400px] md:min-h-[500px] min-w-[200px] relative">
	<canvas class="w-full absolute min-h-full" bind:this={chartId}></canvas>
</div>
