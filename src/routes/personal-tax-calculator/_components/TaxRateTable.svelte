<script lang="ts">
	import { getTaxRates, formatAsPercentage, formatAsCurrency } from '$lib/utils';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let financialYear = 2023;

	$: taxRates = getTaxRates(financialYear);
</script>

<div class="min-w-96 p-3">
	{#if taxRates}
		<h2 class="text-2xl bold mb-2">Tax Rates for {taxRates.name}</h2>
		<Table>
			<TableHead>
				<TableHeadCell>Taxable Income</TableHeadCell>
				<TableHeadCell>Rate</TableHeadCell>
				<!-- <TableHeadCell>Tax Payable</TableHeadCell> -->
			</TableHead>
			<TableBody>
				{#each taxRates.thresholds as { min, max, rate }}
					<TableBodyRow>
						<TableBodyCell
							>{formatAsCurrency(min, false, true)} - {formatAsCurrency(max, false, true)}
						</TableBodyCell>
						<TableBodyCell>{formatAsPercentage(rate)}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/if}
</div>
