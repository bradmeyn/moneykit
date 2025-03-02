<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import AddInvestment from './_components/AddInvestment.svelte';
	import InvestmentItem from './_components/InvestmentItem.svelte';
	import { setPortfolioState } from './calculator.svelte';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import AssetAllocation from './_components/AssetAllocation.svelte';

	const calc = setPortfolioState();

	let selectedView = $state<'overview' | 'asset allocation'>('overview');
</script>

<svelte:head>
	<title>MoneyKit | Portfolio Builder</title>
</svelte:head>

<main class="flex flex-col flex-1 container text-white">
	<div class="flex justify-between items-center mb-8">
		<h1>Portfolio Builder</h1>

		<div class=" flex gap-2">
			<!-- <DownloadButton filename="budget.csv" data={budget.getDownloadData()} /> -->
		</div>
	</div>
	<div class=" w-full">
		<div class="md:w-[200px] mb-2">
			<CurrencyInput
				id="portfolio-value"
				bind:value={calc.portfolioValue}
				label="Portfolio Value"
			/>
		</div>
		<div class=" w-full card">
			<div class="flex items-center gap-2">
				<!-- <DownloadButton filename="growth-data.csv" data={downloadData} /> -->
			</div>
			<AddInvestment />
			<table class="w-full rounded-lg overflow-hidden">
				<thead>
					<tr>
						<th class="text-left border-t-transparent">Code</th>
						<th class="text-left border-t-transparent">Name</th>
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
						<td colspan="2" class="text-lg border-t-transparent">Total</td>
						<td
							class="text-right border-t-transparent text-lg"
							class:text-red-500={calc.totalWeight > 1}
						>
							{formatAsCurrency(calc.total)}
						</td>
						<td
							class="text-right border-t-transparent text-lg"
							class:text-red-500={calc.totalWeight > 1}
						>
							{`${formatAsCurrency(calc.weightedManagementCost * calc.portfolioValue)} pa`}
							<div class="text-xs">
								{`${formatAsPercentage(calc.weightedManagementCost)} pa`}
							</div>
						</td>
						<td
							class="text-right border-t-transparent text-lg"
							class:text-red-500={calc.totalWeight > 1}
						>
							{formatAsPercentage(calc.totalWeight)}
						</td>
						<td class="text-right border-t-transparent"></td>
					</tr>
				</tfoot>
			</table>
		</div>

		<AssetAllocation />
	</div>
</main>
