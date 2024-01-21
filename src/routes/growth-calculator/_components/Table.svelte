<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { formatAsCurrency } from '$lib/utils';

	export let chartYears: number[];
	export let interestByYear: number[];
	export let contributionsByYear: number[];
	export let principal: number;
</script>

<div class="w-full">
	<Table>
		<TableHead>
			<TableHeadCell>Year</TableHeadCell>
			<TableHeadCell>Start</TableHeadCell>
			<TableHeadCell>Interest</TableHeadCell>
			<TableHeadCell>Contribution</TableHeadCell>
			<TableHeadCell>End</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each chartYears as year, i}
				<TableBodyRow>
					<TableBodyCell>{year}</TableBodyCell>
					{#if i === 0}
						<TableBodyCell>{formatAsCurrency(principal)}</TableBodyCell>
					{:else}
						<TableBodyCell
							>{formatAsCurrency(
								principal + interestByYear[i - 1] + contributionsByYear[i - 1]
							)}</TableBodyCell
						>
					{/if}
					<TableBodyCell>{formatAsCurrency(interestByYear[i])}</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(contributionsByYear[i])}</TableBodyCell>
					<TableBodyCell
						>{formatAsCurrency(
							principal + interestByYear[i] + contributionsByYear[i]
						)}</TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
