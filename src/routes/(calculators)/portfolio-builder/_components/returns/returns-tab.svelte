<script lang="ts">
	import ReturnsTable from './returns-table.svelte';
	import ReturnsChart from './returns-chart.svelte';
	import type { PortfolioType } from '../../calculator.svelte';
	import { formatAsPercentage } from '$lib/utils/formatters';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();

	// Calculate summary statistics
	let summaryStats = $derived.by(() => {
		const returns = Object.values(portfolio.returns.byYear)
			.map((yearData) => yearData.total)
			.filter((ret) => ret !== undefined);

		const calcAverage = (arr: number[]) =>
			arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
		const calcVolatility = (arr: number[]) => {
			if (arr.length <= 1) return 0;
			const avg = calcAverage(arr);
			const variance = arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / (arr.length - 1);
			return Math.sqrt(variance);
		};

		return {
			average: calcAverage(returns),
			volatility: calcVolatility(returns),
			best: returns.length > 0 ? Math.max(...returns) : 0,
			worst: returns.length > 0 ? Math.min(...returns) : 0,
			totalReturn: returns.reduce((a, b) => a + b, 0),
			annualizedReturn:
				(Math.pow(1 + returns.reduce((a, b) => a + b, 0) / 100, 1 / returns.length) - 1) * 100
		};
	});
</script>

<div class="grid grid-cols-1 gap-4 mt-4">
	<!-- Summary Statistics Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Total Return</div>
			<div class="text-lg font-bold">{formatAsPercentage(summaryStats.totalReturn)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Annualized Return</div>
			<div class="text-lg font-bold">{formatAsPercentage(summaryStats.annualizedReturn)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Best Year</div>
			<div class="text-lg font-bold text-green-300">{formatAsPercentage(summaryStats.best)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Worst Year</div>
			<div class="text-lg font-bold text-red-300">{formatAsPercentage(summaryStats.worst)}</div>
		</div>
	</div>

	<!-- Chart and Table -->
	<div class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
		<div class="w-full card">
			<h2 class="card-heading">Returns</h2>
			<ReturnsChart {portfolio} />
		</div>

		<div class="card">
			<ReturnsTable {portfolio} />
		</div>
	</div>
</div>
