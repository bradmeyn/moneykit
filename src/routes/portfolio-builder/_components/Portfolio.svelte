<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { portfolio, holdings, addHolding, totalPercentage } from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils';
	import PortfolioItem from './PortfolioItem.svelte';
	import DoughnutChart from '$lib/components/DoughnutChart.svelte';
</script>

<div class="mb-3 max-w-48">
	<CurrencyInput size="lg" label="Portfolio value" bind:value={$portfolio.value} />
</div>

<div class="flex flex-col lg:flex-row w-full gap-5 overflow-hidden">
	{#if $holdings.length > 0}
		<div class="flex-1">
			<div class="min-w-[600px]">
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
							<TableBodyCell class="font-bold text-lg"
								>{formatAsCurrency($portfolio.value)}</TableBodyCell
							>
							<TableBodyCell>
								<span class="font-bold text-lg {$totalPercentage != 1 ? 'text-red-400' : ''} ">
									{formatAsPercentage($totalPercentage)}
								</span></TableBodyCell
							>
							<TableBodyCell />
						</TableBodyRow>
					</TableBody>
				</Table>
			</div>

			<AddHolding {addHolding} />
		</div>

		<div class="w-full lg:max-w-[400px] mx-auto">
			<DoughnutChart
				labels={$holdings.map((holding) => holding.investment.code)}
				dataValues={$holdings.map((holding) => holding.allocation)}
			/>
		</div>
	{:else}
		<AddHolding {addHolding} />
	{/if}
</div>
