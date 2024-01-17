<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		portfolio,
		holdings,
		addHolding,
		totalPercentage,
		removeHolding
	} from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils';
	import PortfolioItem from './PortfolioItem.svelte';
</script>

<div class="max-w-lg">
	<CurrencyInput label="Portfolio value" bind:value={$portfolio.value} />
</div>
<div class="w-full">
	<Table>
		<TableHead>
			<TableHeadCell>Code</TableHeadCell>
			<TableHeadCell>Investment</TableHeadCell>
			<TableHeadCell>Value ($)</TableHeadCell>
			<TableHeadCell>Allocation (%)</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody>
			{#each $holdings as holding}
				<PortfolioItem {holding} />
			{/each}
			<TableBodyRow>
				<TableBodyCell colspan="2" class="font-bold text-lg">Total</TableBodyCell>
				<TableBodyCell class="font-bold text-lg">{formatCurrency($portfolio.value)}</TableBodyCell>
				<TableBodyCell class="font-bold text-lg">{formatPercentage($totalPercentage)}</TableBodyCell
				>
				<TableBodyCell />
			</TableBodyRow>
		</TableBody>
	</Table>

	<AddHolding {addHolding} />
</div>
