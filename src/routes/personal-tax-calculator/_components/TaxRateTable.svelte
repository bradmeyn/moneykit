<script lang="ts">
	import type { TaxRateConfiguration } from '$lib/types';
	import { formatAsPercentage, formatAsCurrency } from '$lib/utils';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let taxRates: TaxRateConfiguration;

	function formatMax(max: number) {
		return max === Infinity ? '+' : ` - ${formatAsCurrency(max, false, true)}`;
	}
</script>

<div>
	<h2 class="text-2xl font-bold mb-2">Tax Rates for {taxRates.name}</h2>
	<Table>
		<TableHead>
			<TableHeadCell>Taxable Income</TableHeadCell>
			<TableHeadCell>Rate</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each taxRates.incomeTax.brackets as { min, max, rate }}
				<TableBodyRow>
					<TableBodyCell>
						{formatAsCurrency(min, false, true)}{formatMax(max)}
					</TableBodyCell>
					<TableBodyCell>{formatAsPercentage(rate)}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
<div>
	<h2 class="text-2xl font-bold mb-2">Medicare Levy</h2>
	<!-- Assuming you want to display the medicare levy rate and offsets separately -->
	<Table>
		<TableHead>
			<TableHeadCell>Condition</TableHeadCell>
			<TableHeadCell>Rate</TableHeadCell>
		</TableHead>
		<TableBody>
			<TableBodyRow>
				<TableBodyCell>General Rate</TableBodyCell>
				<TableBodyCell>{formatAsPercentage(taxRates.medicareLevy.rate)}</TableBodyCell>
			</TableBodyRow>
			<!-- Iterate over offsets if needed -->
		</TableBody>
	</Table>

	<h2 class="text-2xl font-bold mb-2 mt-6">Medicare Levy Surcharge</h2>
	<Table>
		<TableHead>
			<TableHeadCell>Taxable Income</TableHeadCell>
			<TableHeadCell>Rate</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each taxRates.medicareLevySurcharge as { min, max, rate }}
				<TableBodyRow>
					<TableBodyCell>
						{formatAsCurrency(min, false, true)}{formatMax(max)}
					</TableBodyCell>
					<TableBodyCell>{formatAsPercentage(rate)}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
