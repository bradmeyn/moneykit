<script lang="ts">
	import { formatAsPercentage } from '$lib/utils/formatters';
	let {
		tableData
	}: {
		tableData: Array<{
			year: number | string;
			p1Growth: number;
			p1Distribution: number;
			p1Total: number;
			p2Growth: number;
			p2Distribution: number;
			p2Total: number;
			difference: number;
			hasBothData: boolean;
		}>;
	} = $props();
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr>
				<th class="text-left py-2">Year</th>
				<th class="text-center py-2 px-2 border-l border-r" colspan="3"> Portfolio 1 </th>
				<th class="text-center py-2 px-2 border-r" colspan="3">Portfolio 2</th>
				<th class="text-right py-2">Difference</th>
			</tr>
			<tr class="text-xs text-muted-foreground">
				<th></th>
				<th>Growth</th>
				<th>Dist</th>
				<th>Total</th>
				<th>Growth</th>
				<th>Dist</th>
				<th>Total</th>
				<th class="text-right py-1">Total</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as row, i}
				{#if row.year !== -1}
					<tr class="hover:bg-muted/20">
						<td class="py-2 font-medium">{row.year}</td>
						<!-- Portfolio 1 -->
						<td>{row.p1Growth !== null ? formatAsPercentage(row.p1Growth) : '-'}</td>
						<td>{row.p1Distribution !== null ? formatAsPercentage(row.p1Distribution) : '-'}</td>
						<td
							class="font-semibold {row.p1Total > 0
								? 'text-emerald-400'
								: row.p1Total < 0
									? 'text-rose-400'
									: ''}">{row.p1Total !== null ? formatAsPercentage(row.p1Total) : '-'}</td
						>
						<!-- Portfolio 2 -->
						<td>{row.p2Growth !== null ? formatAsPercentage(row.p2Growth) : '-'}</td>
						<td>{row.p2Distribution !== null ? formatAsPercentage(row.p2Distribution) : '-'}</td>
						<td
							class="font-semibold {row.p2Total > 0
								? 'text-emerald-400'
								: row.p2Total < 0
									? 'text-rose-400'
									: ''}">{row.p2Total !== null ? formatAsPercentage(row.p2Total) : '-'}</td
						>
						<!-- Difference -->
						<td
							class="text-right py-2 font-semibold {row.difference > 0
								? 'text-emerald-400'
								: row.difference < 0
									? 'text-rose-400'
									: ''}"
							>{row.difference !== null
								? (row.difference > 0 ? '+' : '') + formatAsPercentage(row.difference)
								: '-'}</td
						>
					</tr>
				{:else}
					<tr class="bg-muted/10 font-bold">
						<td class="py-2 font-medium">Average</td>
						<td></td>
						<td></td>
						<td
							class="font-semibold {row.p1Total > 0
								? 'text-emerald-400'
								: row.p1Total < 0
									? 'text-rose-400'
									: ''}">{row.p1Total !== null ? formatAsPercentage(row.p1Total) : '-'}</td
						>
						<td></td>
						<td></td>
						<td
							class="font-semibold {row.p2Total > 0
								? 'text-emerald-400'
								: row.p2Total < 0
									? 'text-rose-400'
									: ''}">{row.p2Total !== null ? formatAsPercentage(row.p2Total) : '-'}</td
						>
						<td
							class="text-right py-2 font-semibold {row.difference > 0
								? 'text-emerald-400'
								: row.difference < 0
									? 'text-rose-400'
									: ''}"
							>{row.difference !== null
								? (row.difference > 0 ? '+' : '') + formatAsPercentage(row.difference)
								: '-'}</td
						>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
