<script lang="ts">
	import { setPortfolioState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	// Overview components
	import CalculatorActions from '$lib/components/calculator-actions.svelte';

	// Tabs
	import OverviewTab from './_components/overview/overview-tab.svelte';
	import CostsTab from './_components/costs/costs-tab.svelte';
	import ReturnsTab from './_components/returns/returns-tab.svelte';
	import AllocationTab from './_components/asset-allocation/allocation-tab.svelte';
	import ComparisonOverview from './_components/comparison/comparison-overview.svelte';
	import ComparisonAllocation from './_components/comparison/comparison-allocation.svelte';
	import ComparisonCost from './_components/comparison/comparison-cost.svelte';
	import ComparisonReturn from './_components/comparison/comparison-return.svelte';

	const portfolio1 = setPortfolioState(1);
	const portfolio2 = setPortfolioState(2);

	let selectedTab = $state<string>('portfolio1');
	let selectedView = $state<string>('overview');

	let selectedPortfolio = $derived(selectedTab === 'portfolio1' ? portfolio1 : portfolio2);
</script>

<svelte:head>
	<title>Portfolio Builder</title>
</svelte:head>

<main class="flex-1 container">
	<div class="w-full">
		<div class="justify-between flex items-center mb-4">
			<h1 class="calculator-heading">Portfolio Builder</h1>
			<div class="flex gap-2">
				<CalculatorActions getCsvData={() => portfolio1.getAllDataCsv()} filename="portfolio.csv" />
			</div>
		</div>

		<div class="flex justify-between mb-4">
			<Tabs.Root value={selectedTab} onValueChange={(value) => (selectedTab = value)}>
				<Tabs.List>
					<Tabs.Trigger value="portfolio1">Portfolio 1</Tabs.Trigger>
					<Tabs.Trigger value="portfolio2">Portfolio 2</Tabs.Trigger>
					<Tabs.Trigger value="compare">Compare</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>

			<Tabs.Root value={selectedView} onValueChange={(value) => (selectedView = value)}>
				<Tabs.List>
					<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
					<Tabs.Trigger value="allocation">Allocation</Tabs.Trigger>
					<Tabs.Trigger value="costs">Costs</Tabs.Trigger>
					<Tabs.Trigger value="returns">Returns</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</div>
		{#if selectedTab === 'portfolio1' || selectedTab === 'portfolio2'}
			{#if selectedView === 'overview'}
				<OverviewTab portfolio={selectedPortfolio} />
			{:else if selectedView === 'allocation'}
				<AllocationTab portfolio={selectedPortfolio} />
			{:else if selectedView === 'costs'}
				<CostsTab portfolio={selectedPortfolio} />
			{:else if selectedView === 'returns'}
				<ReturnsTab portfolio={selectedPortfolio} />
			{/if}
		{:else if selectedTab === 'compare'}
			{#if selectedView === 'overview'}
				<ComparisonOverview {portfolio1} {portfolio2} />
			{:else if selectedView === 'allocation'}
				<ComparisonAllocation {portfolio1} {portfolio2} />
			{:else if selectedView === 'costs'}
				<ComparisonCost {portfolio1} {portfolio2} />
			{:else if selectedView === 'returns'}
				<ComparisonReturn {portfolio1} {portfolio2} />
			{/if}
		{/if}
	</div>
</main>
