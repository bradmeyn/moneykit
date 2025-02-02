<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import Inputs from './_components/Inputs.svelte';
	import GrowthChart from './_components/GrowthChart.svelte';
	import Table from './_components/Table.svelte';
	import ComparisonTable from './_components/ComparisonTable.svelte';
	import DownloadButton from '$lib/components/DownloadButton.svelte';

	setCalculatorState();
	let calculator = getCalculatorState();
	let selectedView = $state('chart');
	let isComparing = $state(false);

	let downloadData = $derived(
		isComparing ? calculator.getDownloadDataWithComparison() : calculator.getDownloadData()
	);
</script>

<svelte:head>
	<title>MoneyKit | Growth Calculator</title>
	<!-- <meta name="description" content={meta_description} />
	<meta name="og:description" content={meta_description} /> -->
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Growth Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs bind:isComparing />

		<div class="w-full space-y-4">
			{#if isComparing}
				<ComparisonTable />
			{/if}

			<div class="card">
				<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
					<div class="space-y-4">
						<div>
							<h2 class="card-heading">Total after {calculator.years} Years</h2>
							<p class="font-semibold text-2xl md:text-2xl">
								{formatAsCurrency(calculator.baseResult.totalValue)}
							</p>
						</div>
						<div class="flex gap-8">
							<div>
								<p class="text-muted">Total Contributions</p>
								<p class="text-xl font-semibold">
									{formatAsCurrency(calculator.baseResult.totalContributions)}
								</p>
							</div>

							<div>
								<p class="text-muted">Total Interest</p>
								<p class="text-xl font-semibold">
									{formatAsCurrency(calculator.baseResult.totalInterest)}
								</p>
							</div>
						</div>
					</div>

					<div class="flex items-center gap-2">
						<Tabs.Root
							value={selectedView}
							onValueChange={(value) => (selectedView = value)}
							class="w-[200px]"
						>
							<Tabs.List class="grid w-full grid-cols-2">
								<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
								<Tabs.Trigger value="table">Table</Tabs.Trigger>
							</Tabs.List>
						</Tabs.Root>
						<DownloadButton filename="growth-data.csv" data={downloadData} />
					</div>
				</div>

				<Tabs.Root value={selectedView} class="mt-4">
					<Tabs.Content value="chart" class="m-0">
						<GrowthChart
							baseData={calculator.baseResult.annualData}
							comparisonData={calculator.comparisonResult.annualData}
							savingsGoal={calculator.savingsGoal}
							{isComparing}
						/>
					</Tabs.Content>

					<Tabs.Content value="table" class="m-0">
						<Table annualData={calculator.baseResult.annualData} />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</section>
</main>
