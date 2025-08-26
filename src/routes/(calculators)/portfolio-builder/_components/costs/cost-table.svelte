<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';

	let {
		portfolio
	}: {
		portfolio: Portfolio;
	} = $props();
</script>

<table class="w-full rounded-lg overflow-hidden">
	<thead>
		<tr>
			<th class="text-left">Investment</th>
			<th class="text-right">Value</th>
			<th class="text-right">Cost</th>
		</tr>
	</thead>
	<tbody>
		{#each portfolio.holdings as holding}
			<tr>
				<td>
					<div class="font-semibold">{holding.investment.symbol}</div>
					<div class="text-sm text-muted-foreground hidden md:block">{holding.investment.name}</div>
				</td>
				<td class="text-right">
					<div class="text-base">{formatAsCurrency(holding.value)}</div>
				</td>
				<td class="text-right align-top">
					<div>{formatAsCurrency(holding.cost)} pa</div>
					<div class="text-sm text-muted-foreground">
						{formatAsPercentage(holding.investment.managementCost)} pa
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr class="font-semibold border-t">
			<td>Total</td>
			<td class="text-right">{formatAsCurrency(portfolio.totalValue)}</td>
			<td class="text-right">
				<div>{formatAsCurrency(portfolio.totalCost)} pa</div>
				<div class="text-sm text-muted-foreground">
					{formatAsPercentage(portfolio.totalCost / portfolio.totalAllocated)} pa
				</div>
			</td>
		</tr>
	</tfoot>
</table>
