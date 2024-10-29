<!-- @migration-task Error while migrating Svelte code: `<th>` is invalid inside `<thead>` -->
<!-- @migration-task Error while migrating Svelte code: `<th>` is invalid inside `<thead>` -->
<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import type { Result } from '../types';

	export let result: Result;
	export let total: number;
</script>

<table>
	<thead>
		<th>Asset Class</th>
		<th>Allocation ($)</th>
		<th>Allocation (%)</th>
	</thead>
	<tbody>
		{#each result.assetAllocation as assetClass}
			<tr>
				<td>{assetClass.name}</td>
				<td>{formatAsCurrency(assetClass.value, false)}</td>
				<td>
					{formatAsPercentage(assetClass.value / total)}
				</td>
			</tr>
		{/each}
		<tr>
			<td class="font-bold text-lg">Total</td>
			<td class="font-bold text-lg">{formatAsCurrency(total, false)}</td>
			<td>
				<span class="font-bold text-lg {result.totalWeighting != 1 ? 'text-red-400' : ''} ">
					{formatAsPercentage(result.totalWeighting)}
				</span></td
			>
		</tr>
	</tbody>
</table>
