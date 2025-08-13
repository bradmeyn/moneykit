<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import AddInvestment from './_components/overview/add-investment.svelte';
	import { setPortfolioState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	// Overview components
	import CostTable from './_components/costs/cost-table.svelte';
	import CalculatorActions from '$lib/components/calculator-actions.svelte';
	import PortfolioOverviewTable from './_components/overview/overview-table.svelte';

	// Asset allocation components
	import AssetAllocationChart from './_components/asset-allocation/allocation-chart.svelte';
	import AssetAllocationTable from './_components/asset-allocation/allocation-table.svelte';

	// Comparison components
	import ComparisonBarChart from './_components/comparison/comparison-bar-chart.svelte';
	import ComparisonCostTable from './_components/comparison/comparison-cost-table.svelte';
	import ComparisonOverviewTable from './_components/comparison/comparison-overview-table.svelte';

	import ReturnsTable from './_components/returns/returns-table.svelte';
	import ReturnsChart from './_components/returns/returns-chart.svelte';

	const portfolio1 = setPortfolioState();
	const portfolio2 = setPortfolioState();

	let selectedTab = $state<string>('portfolio1');
	let selectedView = $state<string>('overview');

	let selectedPortfolio = $derived(selectedTab === 'portfolio1' ? portfolio1 : portfolio2);
</script>

<svelte:head>
	<title>Portfolio Builder</title>
</svelte:head>

<main class="flex flex-col flex-1 container text-white">
	<div class="w-full">
		<div class="justify-between flex items-center mb-4">
			<h1 class="calculator-heading">Portfolio Builder</h1>
			<div class="flex gap-2">
				<CalculatorActions getCsvData={() => portfolio1.getAllDataCsv()} filename="portfolio.csv" />
			</div>
		</div>

		<Tabs.Root value={selectedTab} onValueChange={(value) => (selectedTab = value)}>
			<Tabs.List>
				<Tabs.Trigger value="portfolio1">Portfolio 1</Tabs.Trigger>
				<Tabs.Trigger value="portfolio2">Portfolio 2</Tabs.Trigger>
				<Tabs.Trigger value="compare">Compare</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
		{#if selectedTab === 'portfolio1' || selectedTab === 'portfolio2'}
			{#key selectedTab}
				<div class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-4">
					<div class="w-full card">
						<div class="flex justify-between items-start mb-4">
							<div class="md:w-[200px] mb-2">
								<label for="portfolio-value" class="block text-xs text-muted-foreground mb-1"
									>Total Value</label
								>
								<CurrencyInput
									id="portfolio-value"
									value={selectedTab === 'portfolio1'
										? portfolio1.portfolioValue
										: portfolio2.portfolioValue}
									onchange={(value) => {
										if (selectedTab === 'portfolio1') portfolio1.portfolioValue = value;
										else portfolio2.portfolioValue = value;
									}}
								/>
							</div>
							<Tabs.Root value={selectedView} onValueChange={(value) => (selectedView = value)}>
								<Tabs.List>
									<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
									<Tabs.Trigger value="allocation">Allocation</Tabs.Trigger>
									<Tabs.Trigger value="costs">Costs</Tabs.Trigger>
									<Tabs.Trigger value="returns">Returns</Tabs.Trigger>
								</Tabs.List>
							</Tabs.Root>
						</div>
						{#if selectedView === 'overview'}
							<PortfolioOverviewTable portfolio={selectedPortfolio} />
						{:else if selectedView === 'allocation'}
							<AssetAllocationTable portfolio={selectedPortfolio} />
						{:else if selectedView === 'costs'}
							<CostTable portfolio={selectedPortfolio} />
						{:else if selectedView === 'returns'}
							<ReturnsChart portfolio={selectedPortfolio} />
							<ReturnsTable portfolio={selectedPortfolio} />
						{/if}
						<div class="flex justify-end mt-4">
							<AddInvestment portfolio={selectedPortfolio} />
						</div>
					</div>
					<AssetAllocationChart portfolio={selectedPortfolio} />
				</div>
			{/key}
		{:else if selectedTab === 'compare'}
			<div class="mt-4">
				<h2 class="text-lg font-semibold mb-4">Portfolio Comparison</h2>
				<div class="mb-8 card">
					<h3 class="font-bold mb-2">Overview Comparison</h3>
					<ComparisonOverviewTable {portfolio1} {portfolio2} />
				</div>
				<div class="mb-8 card">
					<h3 class="font-bold mb-2">Asset Allocation Comparison</h3>
					<ComparisonBarChart {portfolio1} {portfolio2} />
				</div>
				<div class="mb-8 card">
					<h3 class="font-bold mb-2">Cost Comparison</h3>
					<ComparisonCostTable {portfolio1} {portfolio2} />
				</div>
			</div>
		{/if}
	</div>
</main>
