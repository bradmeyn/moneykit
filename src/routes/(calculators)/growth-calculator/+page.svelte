<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Download } from 'lucide-svelte';
	import Inputs from './_components/Inputs.svelte';
	import BaseChart from './_components/BaseChart.svelte';
	import Table from './_components/Table.svelte';

	setCalculatorState();
	let selectedView = $state('chart');
	let calculator = getCalculatorState();
	let isComparing = $state(false);
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

		<div class="w-full space-y-6">
			<div class="grid grid-cols-3 gap-3">
				{@render dataCard('Principal', calculator.principal, formatAsCurrency)}
				{@render dataCard(
					'Contributions',
					calculator.baseResult.totalContributions,
					formatAsCurrency
				)}
				{@render dataCard('Interest', calculator.baseResult.totalInterest, formatAsCurrency)}
			</div>

			<div class="card">
				<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
					<div>
						<h2 class="card-heading">Total value</h2>
						<p class="font-semibold text-2xl md:text-2xl">
							{formatAsCurrency(calculator.baseResult.totalValue)}
						</p>
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
						<Button size="icon" variant="outline" class="hover:bg-primary"><Download /></Button>
					</div>
				</div>

				<Tabs.Root value={selectedView} class="mt-4">
					<Tabs.Content value="chart" class="m-0">
						<BaseChart
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

{#snippet dataCard(label: string, value: number, formatter: (value: number) => string)}
	<div class="card col-span-3 md:col-span-2 lg:col-span-1">
		<h2 class="card-heading">{label}</h2>
		<p class="text-lg md:text-xl font-semibold">
			{formatter(value)}
		</p>
	</div>
{/snippet}
