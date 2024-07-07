<script lang="ts">
	import { portfolio, addHolding, portfolioDetails } from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import PortfolioItem from './PortfolioItem.svelte';
</script>

<table>
	<thead>
		<th>Code</th>
		<th>Investment</th>
		<th>Value ($)</th>
		<th>Allocation (%)</th>
		<th>Cost (%)</th>
		<th>Cost ($)</th>
		<th />
	</thead>
	<tbody>
		{#each $portfolioDetails.holdings as holding}
			<PortfolioItem {holding} />
		{/each}
		<tr>
			<td colspan="2" class="font-bold text-lg">Total</td>
			<td class="font-bold text-lg">{formatAsCurrency($portfolio.value, false)}</td>
			<td>
				<span
					class="font-bold text-lg {$portfolioDetails.totalPercentage != 1 ? 'text-red-400' : ''} "
				>
					{formatAsPercentage($portfolioDetails.totalPercentage)}
				</span></td
			>
			<td>{formatAsPercentage($portfolioDetails.totalCostPercentage)} pa</td>
			<td>{formatAsCurrency($portfolioDetails.totalCost, true)} pa</td>
			<td />
		</tr>
	</tbody>
</table>
<AddHolding {addHolding} />
