<script lang="ts">
	import type { PortfolioType } from '../../calculator.svelte';

	let { portfolio }: { portfolio: PortfolioType } = $props();
</script>

<!-- Annual Returns Table -->

<h3 class="text-lg font-semibold text-white mb-4">Historical Return by Year</h3>
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
				<td>{year}</td>
				<td class="text-right">{(yearData.growth * 100).toFixed(2)}%</td>
				<td class="text-right">{(yearData.distribution * 100).toFixed(2)}%</td>
				<td class="text-right font-bold">{(yearData.total * 100).toFixed(2)}%</td>
			</tr>
		{/each}
	</tbody>
</table>
