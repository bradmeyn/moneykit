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

<div class="w-full p-2 rounded bg-slate-800">
	<Table noborder>
		<TableHead theadClass="bg-emerald-700 text-white">
			<TableHeadCell padding="p-3">Year</TableHeadCell>
			<TableHeadCell padding="p-3">Start</TableHeadCell>
			<TableHeadCell padding="p-3">Interest</TableHeadCell>
			<TableHeadCell padding="p-3">Contribution</TableHeadCell>
			<TableHeadCell padding="p-3">End</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each chartYears as year, i}
				<TableBodyRow>
					<TableBodyCell tdClass="p-3">{year}</TableBodyCell>
					{#if i === 0}
						<TableBodyCell tdClass="p-3">{formatAsCurrency(principal)}</TableBodyCell>
					{:else}
						<TableBodyCell tdClass="p-3"
							>{formatAsCurrency(
								principal + interestByYear[i - 1] + contributionsByYear[i - 1]
							)}</TableBodyCell
						>
					{/if}
					<TableBodyCell tdClass="p-3">{formatAsCurrency(interestByYear[i])}</TableBodyCell>
					<TableBodyCell tdClass="p-3">{formatAsCurrency(contributionsByYear[i])}</TableBodyCell>
					<TableBodyCell tdClass="p-3"
						>{formatAsCurrency(
							principal + interestByYear[i] + contributionsByYear[i]
						)}</TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<div />
