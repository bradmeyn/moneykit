<script lang="ts">
	import type { PortfolioType } from '../../calculator.svelte';
	import BarChart from '$lib/components/charts/bar-chart.svelte';
	import ComparisonReturnsTable from './comparison-returns-table.svelte';
	import { formatAsPercentage } from '$lib/utils/formatters';
	import { COLOURS } from '$constants/colours';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: PortfolioType;
		portfolio2: PortfolioType;
	} = $props();

	// Centralized data processing - used by both chart and table
	let processedData = $derived.by(() => {
		// Get all years from both portfolios
		const years1 = Object.keys(portfolio1.returns.byYear).map(Number);
		const years2 = Object.keys(portfolio2.returns.byYear).map(Number);
		const allYears = Array.from(new Set([...years1, ...years2])).sort((a, b) => a - b);

		// Format data for both chart and table
		const yearlyData = allYears.map((year) => {
			const p1Data = portfolio1.returns.byYear[year];
			const p2Data = portfolio2.returns.byYear[year];
			const difference = (p1Data?.total || 0) - (p2Data?.total || 0);

			return {
				year,
				p1: {
					growth: p1Data?.growth || 0,
					distribution: p1Data?.distribution || 0,
					total: p1Data?.total || 0,
					hasData: !!p1Data
				},
				p2: {
					growth: p2Data?.growth || 0,
					distribution: p2Data?.distribution || 0,
					total: p2Data?.total || 0,
					hasData: !!p2Data
				},
				difference,
				hasBothData: !!p1Data && !!p2Data
			};
		});

		// Use summaryStats from each portfolio
		const summaryStats = {
			p1Avg: portfolio1.summaryStats.average,
			p2Avg: portfolio2.summaryStats.average,
			p1Vol: portfolio1.summaryStats.volatility,
			p2Vol: portfolio2.summaryStats.volatility,
			p1Best: portfolio1.summaryStats.best,
			p2Best: portfolio2.summaryStats.best,
			p1Worst: portfolio1.summaryStats.worst,
			p2Worst: portfolio2.summaryStats.worst
		};

		// Chart data
		const chartData = {
			labels: allYears.map((year) => year.toString()),
			datasets: [
				{
					label: 'Portfolio 1',
					data: yearlyData.map((d) => d.p1.total),
					backgroundColor: COLOURS[0],
					borderRadius: 3
				},
				{
					label: 'Portfolio 2',
					data: yearlyData.map((d) => d.p2.total),
					backgroundColor: COLOURS[1],
					borderRadius: 3
				}
			]
		};

		// Table data (sorted by year descending)
		const tableData = yearlyData
			.sort((a, b) => b.year - a.year)
			.map((d) => ({
				year: d.year,
				p1Growth: d.p1.hasData ? d.p1.growth : 0,
				p1Distribution: d.p1.hasData ? d.p1.distribution : 0,
				p1Total: d.p1.hasData ? d.p1.total : 0,
				p2Growth: d.p2.hasData ? d.p2.growth : 0,
				p2Distribution: d.p2.hasData ? d.p2.distribution : 0,
				p2Total: d.p2.hasData ? d.p2.total : 0,
				difference: d.hasBothData ? d.difference : 0,
				hasBothData: d.hasBothData
			}));

		// Calculate average growth and distribution for each portfolio
		const avg = (arr: number[]) =>
			arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
		const p1GrowthArr = yearlyData.filter((d) => d.p1.hasData).map((d) => d.p1.growth);
		const p1DistArr = yearlyData.filter((d) => d.p1.hasData).map((d) => d.p1.distribution);
		const p2GrowthArr = yearlyData.filter((d) => d.p2.hasData).map((d) => d.p2.growth);
		const p2DistArr = yearlyData.filter((d) => d.p2.hasData).map((d) => d.p2.distribution);

		const avgRow = {
			year: -1, // Use -1 to represent the average row
			p1Growth: avg(p1GrowthArr),
			p1Distribution: avg(p1DistArr),
			p1Total: summaryStats.p1Avg,
			p2Growth: avg(p2GrowthArr),
			p2Distribution: avg(p2DistArr),
			p2Total: summaryStats.p2Avg,
			difference: summaryStats.p1Avg - summaryStats.p2Avg,
			hasBothData: true
		};
		tableData.push(avgRow);

		return { yearlyData, summaryStats, chartData, tableData };
	});
</script>

<div class="grid grid-cols-1 gap-6">
	<!-- Summary Statistics Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="card">
			<div class=" text-muted-foreground mb-2">Average Annual Return</div>
			<div class="space-y-1 text-lg font-semibold">
				<div>Portfolio 1: {formatAsPercentage(processedData.summaryStats.p1Avg)}</div>
				<div>Portfolio 2: {formatAsPercentage(processedData.summaryStats.p2Avg)}</div>
			</div>
		</div>

		<div class="card">
			<div class=" text-muted-foreground mb-2">Volatility</div>
			<div class="space-y-1 text-lg font-semibold">
				<div>Portfolio 1: {formatAsPercentage(processedData.summaryStats.p1Vol)}</div>
				<div>Portfolio 2: {formatAsPercentage(processedData.summaryStats.p2Vol)}</div>
			</div>
		</div>

		<div class="card">
			<div class=" text-muted-foreground mb-2">Best Year</div>
			<div class="space-y-1 text-lg font-semibold text-green-300">
				<div>
					<span class="text-white">Portfolio 1:</span>
					{formatAsPercentage(processedData.summaryStats.p1Best)}
				</div>
				<div>
					<span class="text-white">Portfolio 2:</span>
					{formatAsPercentage(processedData.summaryStats.p2Best)}
				</div>
			</div>
		</div>

		<div class="card">
			<div class=" text-muted-foreground mb-2">Worst Year</div>
			<div class="space-y-1 text-lg text-red-300">
				<div>
					<span class="text-white">Portfolio 1:</span>
					{formatAsPercentage(processedData.summaryStats.p1Worst)}
				</div>
				<div>
					<span class="text-white">Portfolio 2:</span>
					{formatAsPercentage(processedData.summaryStats.p2Worst)}
				</div>
			</div>
		</div>
	</div>

	<!-- Returns Chart -->
	<div class="card">
		<div class="mb-6">
			<h3 class="text-lg font-semibold">Returns Comparison</h3>
		</div>

		<BarChart
			data={processedData.chartData.labels.map((label, i) => ({
				label,
				value: processedData.chartData.datasets[0].data[i]
			}))}
			datasets={processedData.chartData.datasets}
			formatter={formatAsPercentage}
			showLegend={true}
		/>
	</div>

	<!-- Returns Table -->
	<div class="card">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-lg font-semibold">Historical Returns by Year</h3>
		</div>

		<div class="overflow-x-auto">
			<ComparisonReturnsTable tableData={processedData.tableData} />
		</div>
	</div>
</div>
