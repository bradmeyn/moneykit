<script lang="ts">
	import { formatAsCurrency } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';

	export let chartYears: number[];
	export let interestByYear: number[];
	export let contributionsByYear: number[];
	export let principal: number;
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
			{#each chartYears as year, i}
				<tr>
					<td>{year}</td>
					<td>
						{#if i === 0}
							{formatAsCurrency(principal)}
						{:else}
							{formatAsCurrency(principal + interestByYear[i - 1] + contributionsByYear[i - 1])}
						{/if}
					</td>
					<td>{formatAsCurrency(interestByYear[i])}</td>
					<td>{formatAsCurrency(contributionsByYear[i])}</td>
					<td>
						{formatAsCurrency(principal + interestByYear[i] + contributionsByYear[i])}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
