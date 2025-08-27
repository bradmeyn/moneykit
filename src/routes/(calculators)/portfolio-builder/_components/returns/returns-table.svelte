<script lang="ts">
	import { formatAsPercentage } from '$utils/formatters';
	import type { PortfolioType } from '../../calculator.svelte';

	let { portfolio }: { portfolio: PortfolioType } = $props();
</script>

<!-- Annual Returns Table -->

<table class="w-full text-white text-sm">
	<thead>
		<tr>
			<th class="text-left">Year</th>
			<th class="text-right">Growth</th>
			<th class="text-right">Distribution</th>
			<th class="text-right">Total</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.keys(portfolio.returns.byYear)
			.map(Number)
			.sort((a, b) => b - a) as year}
			{@const yearData = portfolio.returns.byYear[year]}
			<tr>
				<td class="font-semibold text-base">{year}</td>
				<td class="text-right">{formatAsPercentage(yearData.growth)}</td>
				<td class="text-right">{formatAsPercentage(yearData.distribution)}</td>
				<td
					class="text-right font-semibold text-base"
					class:text-emerald-400={yearData.total >= 0}
					class:text-rose-400={yearData.total < 0}>{formatAsPercentage(yearData.total)}</td
				>
			</tr>
		{/each}
	</tbody>
</table>
