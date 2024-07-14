<script lang="ts">
	import { portfolioDetails, portfolio } from '../store'; // Adjust path as necessary
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	export let portfolioValue: number = 0;
</script>

<table>
	<thead>
		<th>Asset Class</th>
		<th>Allocation ($)</th>
		<th>Allocation (%)</th>
	</thead>
	<tbody>
		{#each $portfolioDetails.assetAllocation as assetClass}
			<tr>
				<td>{assetClass.name}</td>
				<td>{formatAsCurrency(assetClass.value, false)}</td>
				<td>
					{portfolioValue > 0 ? formatAsPercentage(assetClass.value / portfolioValue) : '0%'}
				</td>
			</tr>
		{/each}
		<tr>
			<td class="font-bold text-lg">Total</td>
			<td class="font-bold text-lg">{formatAsCurrency($portfolio.value, false)}</td>
			<td>
				<span
					class="font-bold text-lg {$portfolioDetails.totalPercentage != 1 ? 'text-red-400' : ''} "
				>
					{formatAsPercentage($portfolioDetails.totalPercentage)}
				</span></td
			>
		</tr>
	</tbody>
</table>
