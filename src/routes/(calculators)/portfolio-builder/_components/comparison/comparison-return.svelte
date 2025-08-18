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
	import { COLOURS } from '$lib/constants/colours';
	import { TOOLTIP } from '$constants/chart-config';
	import { formatAsPercentage } from '$lib/utils/formatters';
	import type { PortfolioType } from '../../calculator.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: PortfolioType;
		portfolio2: PortfolioType;
	} = $props();

	let chartId: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined = $state();
	let viewMode: 'total' | 'breakdown' = $state('total');

	// Register Chart.js components
	Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

	// Get all years from both portfolios
	let allYears = $derived.by(() => {
		const years1 = Object.keys(portfolio1.returns.byYear).map(Number);
		const years2 = Object.keys(portfolio2.returns.byYear).map(Number);
		return Array.from(new Set([...years1, ...years2])).sort((a, b) => a - b);
	});

	// Prepare chart data based on view mode
	let chartData = $derived.by(() => {
		const labels = allYears.map((year) => year.toString());

		if (viewMode === 'total') {
			return {
				labels,
				datasets: [
					{
						label: 'Portfolio 1',
						data: allYears.map((year) => portfolio1.returns.byYear[year]?.total || 0),
						backgroundColor: COLOURS[0],
						borderWidth: 0,
						borderRadius: 3
					},
					{
						label: 'Portfolio 2',
						data: allYears.map((year) => portfolio2.returns.byYear[year]?.total || 0),
						backgroundColor: COLOURS[1],
						borderWidth: 0,
						borderRadius: 3
					}
				]
			};
		} else {
			return {
				labels,
				datasets: [
					{
						label: 'P1 Growth',
						data: allYears.map((year) => portfolio1.returns.byYear[year]?.growth || 0),
						backgroundColor: COLOURS[0],
						borderWidth: 0,
						borderRadius: 3,
						stack: 'Portfolio1'
					},
					{
						label: 'P1 Distribution',
						data: allYears.map((year) => portfolio1.returns.byYear[year]?.distribution || 0),
						backgroundColor: `${COLOURS[0]}90`,
						borderWidth: 0,
						borderRadius: 3,
						stack: 'Portfolio1'
					},
					{
						label: 'P2 Growth',
						data: allYears.map((year) => portfolio2.returns.byYear[year]?.growth || 0),
						backgroundColor: COLOURS[1],
						borderWidth: 0,
						borderRadius: 3,
						stack: 'Portfolio2'
					},
					{
						label: 'P2 Distribution',
						data: allYears.map((year) => portfolio2.returns.byYear[year]?.distribution || 0),
						backgroundColor: `${COLOURS[1]}90`,
						borderWidth: 0,
						borderRadius: 3,
						stack: 'Portfolio2'
					}
				]
			};
		}
	});

	onMount(() => {
		if (!chartId) return;

		chart = new Chart(chartId, {
			type: 'bar',
			data: chartData,
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						stacked: viewMode === 'breakdown',
						grid: {
							display: false
						},
						title: {
							display: true,
							text: 'Year',
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: '#ffffff'
						},
						ticks: {
							font: {
								size: 12,
								family: 'sans-serif'
							},
							color: '#ffffff'
						}
					},
					y: {
						stacked: viewMode === 'breakdown',
						grid: {
							display: true,
							color: '#333333'
						},
						title: {
							display: true,
							text: 'Returns',
							font: {
								size: 14,
								family: 'sans-serif'
							},
							color: '#ffffff'
						},
						ticks: {
							callback: (value) => formatAsPercentage(+value),
							font: {
								size: 12,
								family: 'sans-serif'
							},
							color: '#ffffff'
						}
					}
				},
				plugins: {
					tooltip: {
						mode: 'index',
						intersect: false,
						...TOOLTIP,
						callbacks: {
							title: (context) => `${context[0].label}`,
							label: function (context) {
								return `${context.dataset.label}: ${formatAsPercentage(context.parsed.y)}`;
							},
							footer: function (context) {
								if (viewMode === 'breakdown') {
									// Group by portfolio and sum
									const p1Total = context
										.filter((item) => item.dataset.label?.includes('P1'))
										.reduce((sum, item) => sum + item.parsed.y, 0);
									const p2Total = context
										.filter((item) => item.dataset.label?.includes('P2'))
										.reduce((sum, item) => sum + item.parsed.y, 0);
									return [
										`Portfolio 1 Total: ${formatAsPercentage(p1Total)}`,
										`Portfolio 2 Total: ${formatAsPercentage(p2Total)}`
									];
								}
								return [];
							}
						}
					},
					legend: {
						display: true,
						labels: {
							color: '#fff',
							font: { size: 13, family: 'sans-serif' },
							usePointStyle: true,
							pointStyle: 'circle',
							boxHeight: 8,
							boxWidth: 8
						}
					}
				}
			}
		});
	});

	$effect(() => {
		if (chart && chartData) {
			chart.data = chartData;
			chart.options.scales.x.stacked = viewMode === 'breakdown';
			chart.options.scales.y.stacked = viewMode === 'breakdown';
			chart.update();
		}
	});
</script>

<div class="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-6">
	<!-- Returns Table -->
	<div class="card">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-lg font-semibold">Historical Returns by Year</h3>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr>
						<th class="text-left py-2">Year</th>
						<th class="text-center py-2 px-2 border-l border-r border-gray-600" colspan="3"
							>Portfolio 1</th
						>
						<th class="text-center py-2 px-2 border-r border-gray-600" colspan="3">Portfolio 2</th>
						<th class="text-right py-2">Difference</th>
					</tr>
					<tr class="text-xs text-muted-foreground">
						<th></th>
						<th class="text-right py-1 px-1 border-r border-gray-700">Growth</th>
						<th class="text-right py-1 px-1 border-r border-gray-700">Dist</th>
						<th class="text-right py-1 px-1 border-r border-gray-600">Total</th>
						<th class="text-right py-1 px-1 border-r border-gray-700">Growth</th>
						<th class="text-right py-1 px-1 border-r border-gray-700">Dist</th>
						<th class="text-right py-1 px-1 border-r border-gray-600">Total</th>
						<th class="text-right py-1">Total</th>
					</tr>
				</thead>
				<tbody>
					{#each allYears.sort((a, b) => b - a) as year}
						{@const p1Data = portfolio1.returns.byYear[year]}
						{@const p2Data = portfolio2.returns.byYear[year]}
						{@const difference = (p1Data?.total || 0) - (p2Data?.total || 0)}
						<tr class="hover:bg-muted/20">
							<td class="py-2 font-medium">{year}</td>
							<!-- Portfolio 1 -->
							<td class="text-right py-2 px-1 border-r border-gray-700 text-sm">
								{p1Data ? formatAsPercentage(p1Data.growth) : '-'}
							</td>
							<td class="text-right py-2 px-1 border-r border-gray-700 text-sm">
								{p1Data ? formatAsPercentage(p1Data.distribution) : '-'}
							</td>
							<td class="text-right py-2 px-1 border-r border-gray-600 font-semibold">
								{p1Data ? formatAsPercentage(p1Data.total) : '-'}
							</td>
							<!-- Portfolio 2 -->
							<td class="text-right py-2 px-1 border-r border-gray-700 text-sm">
								{p2Data ? formatAsPercentage(p2Data.growth) : '-'}
							</td>
							<td class="text-right py-2 px-1 border-r border-gray-700 text-sm">
								{p2Data ? formatAsPercentage(p2Data.distribution) : '-'}
							</td>
							<td class="text-right py-2 px-1 border-r border-gray-600 font-semibold">
								{p2Data ? formatAsPercentage(p2Data.total) : '-'}
							</td>
							<!-- Difference -->
							<td
								class="text-right py-2 font-semibold {difference > 0
									? 'text-green-400'
									: difference < 0
										? 'text-red-400'
										: ''}"
							>
								{p1Data && p2Data
									? `${difference > 0 ? '+' : ''}${formatAsPercentage(difference)}`
									: '-'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Returns Chart -->
	<div class="card">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-lg font-semibold">Returns Comparison</h3>
			<div class="flex gap-2">
				<button
					class="px-3 py-1 text-sm rounded {viewMode === 'total'
						? 'bg-primary text-white'
						: 'bg-muted text-muted-foreground'}"
					onclick={() => (viewMode = 'total')}
				>
					Total Returns
				</button>
				<button
					class="px-3 py-1 text-sm rounded {viewMode === 'breakdown'
						? 'bg-primary text-white'
						: 'bg-muted text-muted-foreground'}"
					onclick={() => (viewMode = 'breakdown')}
				>
					Growth vs Distribution
				</button>
			</div>
		</div>

		<div class="min-h-[400px] relative">
			<canvas class="w-full absolute min-h-full p-1" bind:this={chartId}></canvas>
		</div>
	</div>
</div>
