<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import InvestmentItem from './investment-item.svelte';
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
			<th class="text-left border-t-transparent">Investment</th>
			<th class="text-right border-t-transparent">Value</th>
			<th class="text-right border-t-transparent">Weight</th>
			<th class="text-right border-t-transparent"></th>
		</tr>
	</thead>
	<tbody>
		{#each portfolio.holdings as holding}
			<InvestmentItem {holding} {portfolio} />
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td class=" border-t-transparent">Total</td>
			<td
				class="text-right border-t-transparent font-semibold"
				class:text-red-500={portfolio.totalWeight > 1}
			>
				{formatAsCurrency(portfolio.totalValue)}
			</td>
			<td
				class="text-right border-t-transparent font-semibold"
				class:text-red-500={portfolio.totalWeight > 1}
			>
				{formatAsPercentage(portfolio.totalWeight)}
			</td>
			<td class="text-right border-t-transparent"></td>
		</tr>
	</tfoot>
</table>
