<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { portfolio } from '$lib/stores/portfolioStore';

	import CurrencyInput from '../CurrencyInput.svelte';
	import { formatCurrency } from '$lib/utils';
</script>

<div class="max-w-lg">
	<CurrencyInput label="Portfolio value" bind:value={$portfolio.value} />
</div>
<div class="w-full max-w-5xl">
	<Table>
		<TableHead>
			<TableHeadCell>Code</TableHeadCell>
			<TableHeadCell>Investment</TableHeadCell>
			<TableHeadCell>Value ($)</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $portfolio.holdings as { investment, value }}
				<TableBodyRow>
					<TableBodyCell>{investment.code}</TableBodyCell>
					<TableBodyCell>{investment.name}</TableBodyCell>
					<TableBodyCell>{formatCurrency(value)}</TableBodyCell>
				</TableBodyRow>
			{/each}
			<TableBodyRow>
				<TableBodyCell colspan="2" class="font-bold text-lg">Total</TableBodyCell>
				<TableBodyCell class="font-bold text-lg">{formatCurrency($portfolio.value)}</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>

	<!-- <AddHolding {addHolding} /> -->
</div>
