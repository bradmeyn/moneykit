<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';

	export let portfolio1;
	export let portfolio2;

	const rows = [
		{
			label: 'Total Cost',
			p1: portfolio1?.totalCost ?? 0,
			p2: portfolio2?.totalCost ?? 0,
			format: formatAsCurrency
		},
		{
			label: 'Weighted Avg. Fee',
			p1:
				portfolio1 && portfolio1.totalAllocated
					? portfolio1.totalCost / portfolio1.totalAllocated
					: 0,
			p2:
				portfolio2 && portfolio2.totalAllocated
					? portfolio2.totalCost / portfolio2.totalAllocated
					: 0,
			format: formatAsPercentage
		}
	];
</script>

<table class="w-full rounded-lg overflow-hidden">
	<thead>
		<tr>
			<th class="text-left">Cost Metric</th>
			<th class="text-right">Portfolio 1</th>
			<th class="text-right">Portfolio 2</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as row}
			<tr>
				<td>{row.label}</td>
				<td class="text-right">{row.format(row.p1)}</td>
				<td class="text-right">{row.format(row.p2)}</td>
			</tr>
		{/each}
	</tbody>
</table>
