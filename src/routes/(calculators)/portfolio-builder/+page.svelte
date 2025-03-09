<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import AddInvestment from './_components/AddInvestment.svelte';
	import InvestmentItem from './_components/InvestmentItem.svelte';
	import { setPortfolioState } from './calculator.svelte';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import AssetAllocationChart from './_components/AssetAllocationChart.svelte';
	import AssetAllocationTable from './_components/AssetAllocationTable.svelte';

	const calc = setPortfolioState();

	let selectedView = $state<string>('overview');
</script>

<svelte:head>
	<title>MoneyKit | Portfolio Builder</title>
</svelte:head>

<main class="flex flex-col flex-1 container text-white">
	<h1 class="mb-4">Portfolio Builder</h1>
	<div class=" w-full">
		<div class="justify-between flex">
			<div class="md:w-[200px] mb-2">
				<CurrencyInput
					id="portfolio-value"
					bind:value={calc.portfolioValue}
					label="Portfolio Value"
				/>
			</div>
			<div class="flex items-center gap-2">
				<Tabs.Root
					value={selectedView}
					onValueChange={(value) => (selectedView = value)}
					class="w-[200px]"
				>
					<Tabs.List class="grid w-full grid-cols-2 bg-ui-950">
						<Tabs.Trigger class="data-[state=active]:bg-ui-700" value="overview"
							>Overview</Tabs.Trigger
						>
						<Tabs.Trigger class="data-[state=active]:bg-ui-700" value="allocation"
							>Allocation</Tabs.Trigger
						>
					</Tabs.List>
				</Tabs.Root>
				<DownloadButton filename="portfolio.csv" data={calc.getAllDataCsv()} />
			</div>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-[3fr,1fr] gap-4">
			<div class=" w-full card">
				<div class="flex justify-between items-center mb-4">
					<AddInvestment />
				</div>
				{#if selectedView === 'overview'}
					<table class="w-full rounded-lg overflow-hidden">
						<thead>
							<tr>
								<th class="text-left border-t-transparent">Investment</th>
								<th class="text-right border-t-transparent">Value</th>
								<th class="text-right border-t-transparent">Cost</th>
								<th class="text-right border-t-transparent">Weight</th>
								<th class="text-right border-t-transparent"></th>
							</tr>
						</thead>
						<tbody>
							{#each calc.portfolio as holding}
								<InvestmentItem {holding} />
							{/each}
						</tbody>
						<tfoot>
							<tr>
								<td class=" border-t-transparent text-lg">Total</td>
								<td
									class="text-right border-t-transparent font-semibold text-lg"
									class:text-red-500={calc.totalWeight > 1}
								>
									{formatAsCurrency(calc.totalValue)}
								</td>
								<td
									class="text-right border-t-transparent font-semibold text-lg"
									class:text-red-500={calc.totalWeight > 1}
								>
									{`${formatAsCurrency(calc.totalCost)} pa`}
									<div class="text-xs text-muted">
										{`${formatAsPercentage(calc.totalCost / calc.totalAllocated)} pa`}
									</div>
								</td>
								<td
									class="text-right border-t-transparent font-semibold text-lg"
									class:text-red-500={calc.totalWeight > 1}
								>
									{formatAsPercentage(calc.totalWeight)}
								</td>
								<td class="text-right border-t-transparent"></td>
							</tr>
						</tfoot>
					</table>
				{:else}
					<AssetAllocationTable />
				{/if}
			</div>

			<AssetAllocationChart />
		</div>
	</div>
</main>
