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
		const yearReturns = Object.entries(portfolio.returns.byYear)
			.map(([year, yearData]) => ({ year, total: yearData.total }))
			.filter(({ total }) => total !== undefined);

		const returns = yearReturns.map(({ total }) => total);

		const calcAverage = (arr: number[]) =>
			arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
		const calcVolatility = (arr: number[]) => {
			if (arr.length <= 1) return 0;
			const avg = calcAverage(arr);
			const variance = arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / (arr.length - 1);
			return Math.sqrt(variance);
		};

		const bestObj =
			returns.length > 0
				? yearReturns.reduce(
						(best, curr) => (curr.total > best.total ? curr : best),
						yearReturns[0]
					)
				: { year: '', total: 0 };

		const worstObj =
			returns.length > 0
				? yearReturns.reduce(
						(worst, curr) => (curr.total < worst.total ? curr : worst),
						yearReturns[0]
					)
				: { year: '', total: 0 };

		return {
			average: calcAverage(returns),
			volatility: calcVolatility(returns),
			best: bestObj.total,
			bestYear: bestObj.year,
			worst: worstObj.total,
			worstYear: worstObj.year,
			totalReturn: returns.reduce((a, b) => a + b, 0),
			annualisedReturn:
				(Math.pow(1 + returns.reduce((a, b) => a + b, 0) / 100, 1 / returns.length) - 1) * 100
		};
	});
</script>

<div class="grid grid-cols-1 gap-4 mt-4">
	<!-- Summary Statistics Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Total Return</div>
			<div class="text-2xl font-bold">{formatAsPercentage(summaryStats.totalReturn)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Annualised Return</div>
			<div class="text-2xl font-bold">{formatAsPercentage(summaryStats.annualisedReturn)} p.a.</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Best Year</div>
			<div class="text-2xl font-bold">
				<span
					class:text-green-300={summaryStats.best >= 0}
					class:text-red-300={summaryStats.best < 0}
				>
					{formatAsPercentage(summaryStats.best)}
				</span>
				<small class="font-semibold text-muted-foreground">({summaryStats.bestYear})</small>
			</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Worst Year</div>
			<div class="text-2xl font-bold">
				<span
					class:text-emerald-400={summaryStats.worst >= 0}
					class:text-rose-400={summaryStats.worst < 0}
				>
					{formatAsPercentage(summaryStats.worst)}
				</span>
				<small class="font-semibold text-muted-foreground">({summaryStats.worstYear})</small>
			</div>
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
