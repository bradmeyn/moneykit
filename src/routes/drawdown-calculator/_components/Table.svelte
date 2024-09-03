<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../types';

	export let annualData: AnnualData[];
</script>

<div class="w-full overflow-x-auto">
	<table class="min-w-full">
		<thead class="text-white bg-slate-700">
			<tr>
				<th class="px-4 py-2">Year</th>
				<th class="px-4 py-2">Starting Balance</th>
				<th class="px-4 py-2">Interest Earned</th>
				<th class="px-4 py-2">Withdrawal</th>
				<th class="px-4 py-2">Ending Balance</th>
			</tr>
		</thead>
		<tbody>
			{#each annualData as data}
				<tr class="border-b border-slate-600 hover:bg-slate-800">
					<td class="px-4 py-2">{data.year}</td>
					<td class="px-4 py-2">{formatAsCurrency(data.startingBalance)}</td>
					<td class="px-4 py-2">{formatAsCurrency(data.interestEarned)}</td>
					<td class="px-4 py-2">{formatAsCurrency(data.withdrawal)}</td>
					<td class="px-4 py-2">{formatAsCurrency(data.endingBalance)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
