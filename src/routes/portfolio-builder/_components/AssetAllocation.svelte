<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { portfolioDetails, portfolio } from '$lib/stores/portfolioStore'; // Adjust path as necessary
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import { CHART_COLOURS } from '$lib/constants';

	export let portfolioValue: number = 0;
</script>

<div class="flex-1 lg:min-w-[600px] mt-5">
	<h2>Asset Allocation</h2>
	<Table>
		<TableHead>
			<TableHeadCell padding="px-1 py-2">Asset Class</TableHeadCell>
			<TableHeadCell padding="px-1 py-2">Allocation ($)</TableHeadCell>
			<TableHeadCell padding="px-1 py-2">Allocation (%)</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $portfolioDetails.assetAllocation as assetClass}
				<TableBodyRow>
					<TableBodyCell>{assetClass.name}</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(assetClass.value, false, true)}</TableBodyCell>
					<TableBodyCell>
						{portfolioValue > 0 ? formatAsPercentage(assetClass.value / portfolioValue) : '0%'}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
			<TableBodyRow>
				<TableBodyCell class="font-bold text-lg">Total</TableBodyCell>
				<TableBodyCell class="font-bold text-lg"
					>{formatAsCurrency($portfolio.value, false, true)}</TableBodyCell
				>
				<TableBodyCell>
					<span
						class="font-bold text-lg {$portfolioDetails.totalPercentage != 1
							? 'text-red-400'
							: ''} "
					>
						{formatAsPercentage($portfolioDetails.totalPercentage)}
					</span></TableBodyCell
				>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>
<div class="w-full max-w-[400px] lg:max-w-[600px] mx-auto">
	<DoughnutChart
		backgroundColors={CHART_COLOURS}
		legendPosition={'left'}
		labels={$portfolioDetails.assetAllocation.map((assetClass) => assetClass.name)}
		dataValues={$portfolioDetails.assetAllocation.map(
			(assetClass) => assetClass.value / portfolioValue
		)}
	/>
</div>
