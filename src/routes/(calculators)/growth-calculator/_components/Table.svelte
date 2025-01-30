<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../calculator.svelte';
	import ScrollArea from '$ui/scroll-area/scroll-area.svelte';
	let {
		annualData
	}: {
		annualData: AnnualData[];
	} = $props();
</script>

<ScrollArea class="h-[400px] w-full mt-4">
	<table class="w-full">
		<thead class="sticky top-0 bg-ui-900">
			<tr>
				<th>Year</th>
				<th>Start</th>
				<th>Interest</th>
				<th>Contribution</th>
				<th>End</th>
			</tr>
		</thead>
		<tbody>
			{#each annualData as data}
				<tr>
					<td>{data.year}</td>
					<td>{formatAsCurrency(data.startingValue)}</td>
					<td>{formatAsCurrency(data.yearlyInterest)}</td>
					<td>{formatAsCurrency(data.yearlyContribution)}</td>
					<td>{formatAsCurrency(data.endingValue)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</ScrollArea>
