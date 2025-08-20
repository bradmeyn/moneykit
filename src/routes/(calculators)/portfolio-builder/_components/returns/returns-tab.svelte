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
</script>

<div class="grid grid-cols-1 gap-4 mt-4">
	<!-- Summary Statistics Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Total Return</div>
			<div class="text-2xl font-bold">{formatAsPercentage(portfolio.summaryStats.totalReturn)}</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Annualised Return</div>
			<div class="text-2xl font-bold">
				{formatAsPercentage(portfolio.summaryStats.annualisedReturn)} p.a.
			</div>
		</div>

		<div class="card">
			<div class="text-sm text-muted-foreground mb-2">Volatility</div>
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
			<h2 class="card-heading">Last 10 Years of Returns</h2>
			<ReturnsChart {portfolio} />
		</div>

		<div class="card">
			<ReturnsTable {portfolio} />
		</div>
	</div>
</div>
