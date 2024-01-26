<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { portfolio, addHolding, portfolioDetails } from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils';
	import PortfolioItem from './PortfolioItem.svelte';
	import DoughnutChart from '$lib/components/DoughnutChart.svelte';
	import AssetAllocation from './AssetAllocation.svelte';
</script>

<div class="mb-3 max-w-48">
	<CurrencyInput size="lg" label="Portfolio value" bind:value={$portfolio.value} />
</div>

<div>
	{#if $portfolioDetails.holdings.length > 0}
		<div class="flex flex-col lg:flex-row w-full gap-5">
			<div class="flex-1 min-w-[600px]">
				<Table>
					<TableHead>
						<TableHeadCell>Code</TableHeadCell>
						<TableHeadCell>Investment</TableHeadCell>
						<TableHeadCell>Value ($)</TableHeadCell>
						<TableHeadCell>Allocation (%)</TableHeadCell>
						<TableHeadCell />
					</TableHead>
					<TableBody>
						{#each $portfolioDetails.holdings as holding}
							<PortfolioItem {holding} />
						{/each}
						<TableBodyRow>
							<TableBodyCell colspan="2" class="font-bold text-lg">Total</TableBodyCell>
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
							<TableBodyCell />
						</TableBodyRow>
					</TableBody>
				</Table>
				<AddHolding {addHolding} />
			</div>

			<div class="w-full lg:max-w-[400px] mx-auto">
				<DoughnutChart
					labels={$portfolioDetails.holdings.map((holding) => holding.investment.code)}
					dataValues={$portfolioDetails.holdings.map((holding) => holding.allocation)}
				/>
			</div>
		</div>

		<div class="w-full flex-1 flex-shrink-0">
			<AssetAllocation portfolioValue={$portfolio.value} />
		</div>
	{:else}
		<AddHolding {addHolding} />
	{/if}
</div>
