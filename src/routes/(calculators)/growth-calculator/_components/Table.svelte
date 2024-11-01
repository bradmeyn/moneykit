<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import type { AnnualData } from '../types';

	interface Props {
		annualData: AnnualData[];
	}

	let { annualData }: Props = $props();
</script>

<div class="w-full">
	<table>
		<thead class="text-white">
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
</div>
