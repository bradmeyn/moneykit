<script lang="ts">
	import { formatAsPercentage } from '$lib/utils/formatters';
	import type { PortfolioType } from '../../calculator.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: PortfolioType;
		portfolio2: PortfolioType;
		title?: string;
	} = $props();

	// Get all years from both portfolios
	let allYears = $derived.by(() => {
		const years1 = Object.keys(portfolio1.returns.byYear).map(Number);
		const years2 = Object.keys(portfolio2.returns.byYear).map(Number);
		return Array.from(new Set([...years1, ...years2])).sort((a, b) => b - a); // Most recent first
	});

	// Calculate summary statistics
	let summaryStats = $derived.by(() => {
		const p1Returns = allYears
			.map((year) => portfolio1.returns.byYear[year]?.total)
			.filter((ret) => ret !== undefined);
		const p2Returns = allYears
			.map((year) => portfolio2.returns.byYear[year]?.total)
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
			p1Avg: calcAverage(p1Returns),
			p2Avg: calcAverage(p2Returns),
			p1Vol: calcVolatility(p1Returns),
			p2Vol: calcVolatility(p2Returns),
			p1Best: Math.max(...p1Returns, -Infinity),
			p2Best: Math.max(...p2Returns, -Infinity),
			p1Worst: Math.min(...p1Returns, Infinity),
			p2Worst: Math.min(...p2Returns, Infinity)
		};
	});
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr>
				<th class="text-left py-2">Year</th>
				<th class="text-center py-2 px-2 border-l border-r border-gray-600" colspan="3">
					Portfolio 1
				</th>
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
			{#each allYears as year}
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

<!-- Summary Statistics -->
<div class="mt-6 pt-4 border-t border-gray-600">
	<h4 class="text-md font-medium mb-3">Performance Summary</h4>
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
		<div class="space-y-2">
			<div class="text-muted-foreground">Average Annual Return</div>
			<div class="font-semibold">
				<div>P1: {formatAsPercentage(summaryStats.p1Avg)}</div>
				<div>P2: {formatAsPercentage(summaryStats.p2Avg)}</div>
			</div>
		</div>
		<div class="space-y-2">
			<div class="text-muted-foreground">Volatility (Std Dev)</div>
			<div class="font-semibold">
				<div>P1: {formatAsPercentage(summaryStats.p1Vol)}</div>
				<div>P2: {formatAsPercentage(summaryStats.p2Vol)}</div>
			</div>
		</div>
		<div class="space-y-2">
			<div class="text-muted-foreground">Best Year</div>
			<div class="font-semibold text-green-400">
				<div>P1: {formatAsPercentage(summaryStats.p1Best)}</div>
				<div>P2: {formatAsPercentage(summaryStats.p2Best)}</div>
			</div>
		</div>
		<div class="space-y-2">
			<div class="text-muted-foreground">Worst Year</div>
			<div class="font-semibold text-red-400">
				<div>P1: {formatAsPercentage(summaryStats.p1Worst)}</div>
				<div>P2: {formatAsPercentage(summaryStats.p2Worst)}</div>
			</div>
		</div>
	</div>
</div>
