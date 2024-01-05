<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import createPortfolioStore from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';

	// Create the store instance
	const { portfolio, totalValue } = createPortfolioStore();
</script>

<div class="w-full">
	<Table>
		<TableHead>
			<TableHeadCell>Code</TableHeadCell>
			<TableHeadCell>Investment</TableHeadCell>
			<TableHeadCell>Value ($)</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $portfolio as { investment, value }}
				<TableBodyRow>
					<TableBodyCell>{investment.code}</TableBodyCell>
					<TableBodyCell>{investment.name}</TableBodyCell>
					<TableBodyCell>{value}</TableBodyCell>
				</TableBodyRow>
			{/each}
			<TableBodyRow>
				<TableBodyCell colspan="2" class="font-bold text-lg">Total</TableBodyCell>
				<TableBodyCell class="font-bold text-lg">{$totalValue}</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>

	<AddHolding />
</div>
