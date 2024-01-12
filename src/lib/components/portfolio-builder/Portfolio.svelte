<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { portfolio, holdings, addHolding } from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '../CurrencyInput.svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils';
</script>

<div class="max-w-lg">
	<CurrencyInput label="Portfolio value" bind:value={$portfolio.value} />
</div>
<div class="w-full">
	<Table>
		<TableHead>
			<TableHeadCell>Code</TableHeadCell>
			<TableHeadCell>Investment</TableHeadCell>
			<TableHeadCell>Cost ($)</TableHeadCell>
			<TableHeadCell>Value ($)</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $holdings as { investment, allocation, value, cost }}
				<TableBodyRow>
					<TableBodyCell>{investment.code}</TableBodyCell>
					<TableBodyCell>{investment.name}</TableBodyCell>
					<TableBodyCell>{formatPercentage(allocation)}</TableBodyCell>
					<TableBodyCell>{formatCurrency(value)}</TableBodyCell>
				</TableBodyRow>
			{/each}
			<TableBodyRow>
				<TableBodyCell colspan="3" class="font-bold text-lg">Total</TableBodyCell>
				<TableBodyCell class="font-bold text-lg">{formatCurrency($portfolio.value)}</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>

	<AddHolding {addHolding} />
</div>
