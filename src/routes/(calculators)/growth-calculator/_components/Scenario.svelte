<script lang="ts">
	import Inputs from './Inputs.svelte';
	import GrowthChart from './GrowthChart.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import Table from './Table.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { Download } from 'lucide-svelte';
	import type { GrowthResult, GrowthScenario } from '../calculator.svelte';

	let {
		scenario = $bindable(),
		result
	}: {
		scenario: GrowthScenario;
		result: GrowthResult;
	} = $props();
	let selectedView = $state('chart');
	let chartContainer: HTMLElement;

	function downloadCsv() {
		const headers = ['Year', 'Starting Value', 'Contributions', 'Interest', 'Ending Value'];
		const csvContent = [
			headers.join(','),
			...result.annualData.map((row) =>
				[
					row.year,
					row.startingValue,
					row.yearlyContribution,
					row.yearlyInterest,
					row.endingValue
				].join(',')
			)
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute('download', 'table_data.csv');
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
</script>

<section class="flex flex-col lg:flex-row gap-8">
	<aside class="max-w-[1000px] min-w-[300px]">
		<Inputs bind:scenario />
	</aside>

	<div class="w-full space-y-6">
		<div class="grid grid-cols-3 gap-3">
			{@render dataCard('Principal', scenario.principal, formatAsCurrency)}
			{@render dataCard('Contributions', result.totalContributions, formatAsCurrency)}
			{@render dataCard('Interest', result.totalInterest, formatAsCurrency)}
		</div>

		<div class="card" bind:this={chartContainer}>
			<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
				<div>
					<p class=" text-muted">
						After {scenario.years} years at {formatAsPercentage(scenario.interestRate)} p.a
					</p>
					<p class="font-semibold text-2xl md:text-2xl">
						{formatAsCurrency(result.totalValue)}
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
					<Button size="icon" variant="outline" class="hover:bg-primary" onclick={downloadCsv}
						><Download /></Button
					>
				</div>
			</div>

			<Tabs.Root value={selectedView} class="mt-4">
				<Tabs.Content value="chart" class="m-0">
					<GrowthChart data={result.annualData} />
				</Tabs.Content>

				<Tabs.Content value="table" class="m-0">
					<Table annualData={result.annualData} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</div>
</section>

{#snippet dataCard(label: string, value: number, formatter: (value: number) => string)}
	<div class="card col-span-3 md:col-span-2 lg:col-span-1">
		<h2 class="card-heading">{label}</h2>
		<p class="text-lg md:text-xl font-semibold">
			{formatter(value)}
		</p>
	</div>
{/snippet}
