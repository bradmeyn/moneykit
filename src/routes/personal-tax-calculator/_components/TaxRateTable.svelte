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
	import { get } from 'svelte/store';

	export let financialYear = 2023;

	const taxRates = getTaxRates(financialYear);
</script>

<div class="w-full p-3">
	{#if taxRates}
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
