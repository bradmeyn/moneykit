<script lang="ts">
	import type { PortfolioType } from '../../portfolio.svelte';
	import BarChart from '$lib/components/charts/bar-chart.svelte';
	import ComparisonReturnsTable from './comparison-returns-table.svelte';
	import { formatAsPercentage, formatAsCurrency } from '$lib/utils/formatters';
	import { COLOURS } from '$constants/colours';
	import * as Tabs from '$lib/components/ui/tabs';
	import LineChart from '$lib/components/charts/line-chart.svelte';

	let { portfolio1, portfolio2 }: { portfolio1: PortfolioType; portfolio2: PortfolioType } =
		$props();

	let view = $state('chart');

	// Calculate portfolio value growth over last 10 years for both portfolios
	const years = Array.from(
		new Set([
			...Object.keys(portfolio1.returns.byYear).map(Number),
			...Object.keys(portfolio2.returns.byYear).map(Number)
		])
	).sort((a, b) => a - b);

	const p1StartValue = portfolio1.totalValue;
	const p2StartValue = portfolio2.totalValue;

	const p1Values = [p1StartValue];
	const p2Values = [p2StartValue];
	for (let i = 0; i < years.length; i++) {
		const prev1 = p1Values[i];
		const prev2 = p2Values[i];
		const ret1 = portfolio1.returns.byYear[years[i]]?.total ?? 0;
		const ret2 = portfolio2.returns.byYear[years[i]]?.total ?? 0;
		p1Values.push(prev1 * (1 + ret1));
		p2Values.push(prev2 * (1 + ret2));
	}
	const valueDatasets = [
		{
			label: 'Portfolio 1',
			data: p1Values.slice(1),
			borderColor: COLOURS[0],
			backgroundColor: COLOURS[0]
		},
		{
			label: 'Portfolio 2',
			data: p2Values.slice(1),
			borderColor: COLOURS[1],
			backgroundColor: COLOURS[1]
		}
	];

	// Centralized data processing - used by both chart and table
	const processedData = $derived.by(() => {
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
		{@render card(
			'Average Annual Return',
			processedData.summaryStats.p1Avg,
			processedData.summaryStats.p2Avg
		)}
		{@render card('Volatility', processedData.summaryStats.p1Vol, processedData.summaryStats.p2Vol)}
		{@render card(
			'Best Year',
			processedData.summaryStats.p1Best,
			processedData.summaryStats.p2Best
		)}
		{@render card(
			'Worst Year',
			processedData.summaryStats.p1Worst,
			processedData.summaryStats.p2Worst
		)}
	</div>

	<!-- Returns Chart -->
	<div class="card">
		<div class="mb-6 flex items-start justify-between">
			<h3 class="text-lg font-semibold">Returns Comparison</h3>
			<Tabs.Root value={view} onValueChange={(value) => (view = value)} class="">
				<Tabs.List class="w-full md:w-[200px]">
					<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
					<Tabs.Trigger value="table">Table</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</div>

		<Tabs.Root value={view} class="mt-4">
			<Tabs.Content value="chart" class="m-0">
				<BarChart
					data={processedData.chartData.labels.map((label, i) => ({
						label,
						value: processedData.chartData.datasets[0].data[i]
					}))}
					datasets={processedData.chartData.datasets}
					formatter={formatAsPercentage}
					showLegend={true}
				/>
			</Tabs.Content>
			<Tabs.Content value="table" class="m-0">
				<ComparisonReturnsTable tableData={processedData.tableData} />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>

<!-- Portfolio Value Growth Comparison -->
<div class="card mt-4">
	<h2 class="card-heading">If Invested 10 Years Ago</h2>
	<LineChart
		datasets={valueDatasets}
		labels={years.map(String)}
		formatter={formatAsCurrency}
		showLegend={true}
		enableTooltip
	/>
</div>

<div class="space-y-2">
	<p class="text-muted-foreground text-sm mt-8">
		Returns assume reinvestment of all income distributions. Past performance is not an indication
		of future performance.
	</p>
	<p class="text-muted-foreground text-sm">
		* Where return data is unavailable for a given year, it has been substituted with a managed fund
		equivalent.
	</p>
</div>

{#snippet card(title: string, p1: number, p2: number)}
	<div class="card">
		<div class=" text-muted-foreground mb-2">{title}</div>
		<div class="space-y-1 text-lg">
			<div>
				<span>P1:</span>
				<span class="font-semibold" class:text-emerald-300={p1 > 0} class:text-rose-300={p1 < 0}
					>{formatAsPercentage(p1)}</span
				>
			</div>
			<div>
				<span>P2:</span>
				<span class="font-semibold" class:text-emerald-300={p2 > 0} class:text-rose-300={p2 < 0}
					>{formatAsPercentage(p2)}</span
				>
			</div>
		</div>
	</div>
{/snippet}
