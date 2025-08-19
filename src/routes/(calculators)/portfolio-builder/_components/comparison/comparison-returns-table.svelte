<script lang="ts">
	let {
		tableData
	}: {
		tableData: Array<{
			year: number;
			difference: number;
			hasBothData: boolean;
			formatted: {
				p1Growth: string;
				p1Distribution: string;
				p1Total: string;
				p2Growth: string;
				p2Distribution: string;
				p2Total: string;
				difference: string;
			};
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
			{#each tableData as row}
				<tr class="hover:bg-muted/20">
					<td class="py-2 font-medium">{row.year}</td>
					<!-- Portfolio 1 -->
					<td>{row.formatted.p1Growth}</td>
					<td>{row.formatted.p1Distribution}</td>
					<td class="font-semibold">{row.formatted.p1Total}</td>
					<!-- Portfolio 2 -->
					<td>{row.formatted.p2Growth}</td>
					<td>{row.formatted.p2Distribution}</td>
					<td class="font-semibold">{row.formatted.p2Total}</td>
					<!-- Difference -->
					<td
						class="text-right py-2 font-semibold {row.difference > 0
							? 'text-emerald-400'
							: row.difference < 0
								? 'text-rose-400'
								: ''}"
					>
						{row.formatted.difference}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
