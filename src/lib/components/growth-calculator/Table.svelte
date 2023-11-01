<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { formatCurrency } from '$lib/utils';

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
						<TableBodyCell>{formatCurrency(principal)}</TableBodyCell>
					{:else}
						<TableBodyCell
							>{formatCurrency(
								principal + interestByYear[i - 1] + contributionsByYear[i - 1]
							)}</TableBodyCell
						>
					{/if}
					<TableBodyCell>{formatCurrency(interestByYear[i])}</TableBodyCell>
					<TableBodyCell>{formatCurrency(contributionsByYear[i])}</TableBodyCell>
					<TableBodyCell
						>{formatCurrency(principal + interestByYear[i] + contributionsByYear[i])}</TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
