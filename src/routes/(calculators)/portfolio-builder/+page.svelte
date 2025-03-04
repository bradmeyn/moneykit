<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import AddInvestment from './_components/AddInvestment.svelte';
	import InvestmentItem from './_components/InvestmentItem.svelte';
	import { setPortfolioState } from './calculator.svelte';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import AssetAllocation from './_components/AssetAllocation.svelte';
	import AssetAllocationTable from './_components/AssetAllocationTable.svelte';

	const calc = setPortfolioState();

	let selectedView = $state<'overview' | 'allocation'>('overview');

	// Labels for asset classes
	const assetLabels = {
		ausEquities: 'Australian Equities',
		intEquities: 'International Equities',
		ausFixedInterest: 'Australian Fixed Interest',
		intFixedInterest: 'International Fixed Interest',
		cash: 'Cash',
		alternatives: 'Alternatives'
	};

	// Format asset allocation data for charts
	let assetAllocationChartData = $derived.by(() => {
		const allocation = calc.assetAllocation;
		return Object.entries(allocation)
			.filter(([_, value]) => value > 0)
			.map(([key, value]) => ({
				label: assetLabels[key as keyof typeof assetLabels],
				value
			}))
			.sort((a, b) => b.value - a.value);
	});

	// Calculate growth vs defensive asset ratios
	let growthAssets = $derived.by(() => {
		const allocation = calc.assetAllocation;
		return allocation.ausEquities + allocation.intEquities + allocation.alternatives;
	});

	let defensiveAssets = $derived.by(() => {
		const allocation = calc.assetAllocation;
		return allocation.ausFixedInterest + allocation.intFixedInterest + allocation.cash;
	});
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

		<div class="grid grid-cols-1 lg:grid-cols-[3fr,1fr] gap-4">
			<div class=" w-full card">
				<div class="flex justify-between items-center mb-4">
					<AddInvestment />
					<div class="flex items-center gap-2">
						<Tabs.Root
							value={selectedView}
							onValueChange={(value) => (selectedView = value)}
							class="w-[200px]"
						>
							<Tabs.List class="grid w-full grid-cols-2">
								<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
								<Tabs.Trigger value="allocation">Allocation</Tabs.Trigger>
							</Tabs.List>
						</Tabs.Root>
						<DownloadButton filename="growth-data.csv" data={[]} />
					</div>
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
								<td class=" border-t-transparent">Total</td>
								<td
									class="text-right border-t-transparent font-semibold"
									class:text-red-500={calc.totalWeight > 1}
								>
									{formatAsCurrency(calc.total)}
								</td>
								<td
									class="text-right border-t-transparent font-semibold"
									class:text-red-500={calc.totalWeight > 1}
								>
									{`${formatAsCurrency(calc.weightedManagementCost * calc.portfolioValue)} pa`}
									<div class="text-xs text-muted">
										{`${formatAsPercentage(calc.weightedManagementCost)} pa`}
									</div>
								</td>
								<td
									class="text-right border-t-transparent font-semibold"
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

			<AssetAllocation />
		</div>
	</div>
</main>
