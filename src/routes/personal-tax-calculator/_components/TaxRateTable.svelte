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

<div class="min-w-96 p-3 flex gap-5">
	{#if taxRates}
		<div>
			<h2 class="text-2xl bold mb-2">Tax Rates for {taxRates.name}</h2>
			<Table>
				<TableHead>
					<TableHeadCell>Taxable Income</TableHeadCell>
					<TableHeadCell>Rate</TableHeadCell>
					<!-- <TableHeadCell>Tax Payable</TableHeadCell> -->
				</TableHead>
				<TableBody>
					{#each taxRates.personal as { min, max, rate }}
						<TableBodyRow>
							{#if max === Infinity}
								<TableBodyCell>{formatAsCurrency(min, false, true)} +</TableBodyCell>
							{:else}
								<TableBodyCell>
									{formatAsCurrency(min, false, true)} - {formatAsCurrency(max, false, true)}
								</TableBodyCell>
							{/if}

							<TableBodyCell>{formatAsPercentage(rate)}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
		<div>
			<h2 class="text-2xl bold mb-2">Medicare Levy</h2>
			<Table>
				<TableHead>
					<TableHeadCell>Taxable Income</TableHeadCell>
					<TableHeadCell>Rate</TableHeadCell>
				</TableHead>
				<TableBody>
					<TableBodyRow>
						<TableBodyCell
							>{formatAsCurrency(taxRates.medicareLevy.threshold, false, true)} +</TableBodyCell
						>
						<TableBodyCell>{formatAsPercentage(taxRates.medicareLevy.rate)}</TableBodyCell>
					</TableBodyRow>
				</TableBody>
			</Table>

			<h2 class="text-2xl bold mb-2 mt-6">Medicare Levy Surcharge</h2>
			<Table>
				<TableHead>
					<TableHeadCell>Taxable Income</TableHeadCell>
					<TableHeadCell>Rate</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each taxRates.medicareLevySurcharge as { min, max, rate }}
						<TableBodyRow>
							{#if max === Infinity}
								<TableBodyCell>{formatAsCurrency(min, false, true)} +</TableBodyCell>
							{:else}
								<TableBodyCell>
									{formatAsCurrency(min, false, true)} - {formatAsCurrency(max, false, true)}
								</TableBodyCell>
							{/if}

							<TableBodyCell>{formatAsPercentage(rate)}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	{/if}
</div>
