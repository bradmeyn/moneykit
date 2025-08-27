<script lang="ts">
	import ReturnsTable from './returns-table.svelte';
	import ReturnsChart from './returns-chart.svelte';
	import type { PortfolioType } from '../../calculator.svelte';
	import { formatAsPercentage, formatAsCurrency } from '$lib/utils/formatters';
	import LineChart from '$lib/components/charts/line-chart.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();

	// Calculate summary statistics

	// Calculate portfolio value growth over last 10 years
	const startValue = portfolio.totalValue;
	const years = Object.keys(portfolio.returns.byYear)
		.map(Number)
		.sort((a, b) => a - b);
	const values = [startValue];
	for (let i = 0; i < years.length; i++) {
		const prev = values[i];
		const ret = portfolio.returns.byYear[years[i]]?.total ?? 0;
		values.push(prev * (1 + ret));
	}
	const valueDataset = {
		label: 'Portfolio Value',
		data: values.slice(1)
	};
</script>

<div class="grid grid-cols-1 gap-4 mt-4">
	<!-- Summary Statistics Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Cumulative 10yr Return</div>
			<div class="text-2xl font-bold">{formatAsPercentage(portfolio.summaryStats.totalReturn)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Annualised Return</div>
			<div class="text-2xl font-bold">
				{formatAsPercentage(portfolio.summaryStats.annualisedReturn)} p.a.
			</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Volatility (standard deviation)</div>
			<div class="text-2xl font-bold">{formatAsPercentage(portfolio.summaryStats.volatility)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Best Year</div>
			<div class="text-2xl font-bold">
				<span
					class:text-green-300={portfolio.summaryStats.best >= 0}
					class:text-red-300={portfolio.summaryStats.best < 0}
				>
					{formatAsPercentage(portfolio.summaryStats.best)}
				</span>
				<small class="font-semibold text-muted-foreground"
					>({portfolio.summaryStats.bestYear})</small
				>
			</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Worst Year</div>
			<div class="text-2xl font-bold">
				<span
					class:text-emerald-400={portfolio.summaryStats.worst >= 0}
					class:text-rose-400={portfolio.summaryStats.worst < 0}
				>
					{formatAsPercentage(portfolio.summaryStats.worst)}
				</span>
				<small class="font-semibold text-muted-foreground"
					>({portfolio.summaryStats.worstYear})</small
				>
			</div>
		</div>
	</div>

	<!-- Chart and Table -->
	<div class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
		<div class="w-full card">
			<h2 class="card-heading">Last 10 Years of Returns*</h2>
			<ReturnsChart {portfolio} />
		</div>

		<div class="card">
			<h2 class="card-heading">Return by Year*</h2>
			<ReturnsTable {portfolio} />
		</div>
	</div>
</div>

<div class="card mt-4">
	<h2 class="card-heading">If Invested 10 years ago</h2>
	<LineChart
		datasets={[valueDataset]}
		labels={years.map(String)}
		formatter={formatAsCurrency}
		showLegend={false}
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
