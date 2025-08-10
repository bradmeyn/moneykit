<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	export let portfolioInstance;
	const portfolio = portfolioInstance;
</script>

<table class="w-full rounded-lg overflow-hidden text-sm">
	<thead>
		<tr>
			<th class="text-left">Investment</th>
			<th class="text-right">Value</th>
			<th class="text-right">Allocation</th>
		</tr>
	</thead>
	<tbody>
		{#each portfolio.portfolio as holding}
			{#if holding.investment.symbol !== 'CASH'}
				<tr>
					<td>
						<div class="font-semibold">{holding.investment.symbol}</div>
						<div class="text-xs text-muted-foreground">{holding.investment.name}</div>
					</td>
					<td class="text-right align-top">{formatAsCurrency(holding.value)}</td>
					<td class="text-right align-top">{formatAsPercentage(holding.weight)}</td>
				</tr>
			{/if}
		{/each}
	</tbody>
	<tfoot>
		<tr class="font-semibold border-t">
			<td>Total</td>
			<td class="text-right">{formatAsCurrency(portfolio.totalValue)}</td>
			<td class="text-right">{formatAsPercentage(portfolio.totalWeight)}</td>
		</tr>
	</tfoot>
</table>
