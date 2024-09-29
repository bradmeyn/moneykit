<script lang="ts">
	import AddHolding from './AddHolding.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import PortfolioItem from './PortfolioItem.svelte';
	import type { Result } from '../types';

	export let result: Result;
	export let total: number
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
		{#each result.holdings as holding}
			<PortfolioItem {holding} portfolioId={result.id} />
		{/each}
		<tr>
			<td colspan="2" class="font-bold text-lg">Total</td>
			<td class="font-bold text-lg">{formatAsCurrency(total, false)}</td>
			<td>
				<span class="font-bold text-lg {result.totalWeighting != 1 ? 'text-red-400' : ''} ">
					{formatAsPercentage(result.totalWeighting)}
				</span></td
			>
			<td>{formatAsPercentage(result.totalCostPercentage)} pa</td>
			<td>{formatAsCurrency(result.totalCost, true)} pa</td>
			<td />
		</tr>
	</tbody>
</table>
<div class="p-2 w-full flex justify-end">
	<AddHolding portfolioId={result.id} />
</div>
