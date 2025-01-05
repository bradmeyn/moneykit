<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Download } from 'lucide-svelte';
	import Inputs from './_components/Inputs.svelte';
	import FireChart from './_components/FireChart.svelte';

	setCalculatorState();
	let calculator = getCalculatorState();
	let selectedView = $state('chart');

	// Function to generate CSV data for download
	function downloadData() {
		const csvContent = [
			['Age', 'Investment Value', 'FIRE Target'],
			...calculator.calculationData.map((d) => [d.age, d.investmentValue, d.fireTarget])
		]
			.map((row) => row.join(','))
			.join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'fire-calculation.csv';
		a.click();
		window.URL.revokeObjectURL(url);
	}
</script>

<svelte:head>
	<title>MoneyKit | FIRE</title>
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">FIRE Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />

		<div class="w-full space-y-4">
			<div class="flex gap-4">
				<div class="card flex-1">
					<h2 class="card-heading">FIRE Number</h2>
					<div class="text-2xl font-semibold">
						{formatAsCurrency(calculator.fireNumber)}
					</div>
					<div class="text-sm text-muted">25x Annual Expenses</div>
				</div>

				<div class="card flex-1">
					<h2 class="card-heading">FIRE Age</h2>
					<div class="text-2xl font-semibold">
						<span>{calculator.yearsToFire + calculator.age}</span>
					</div>
					<div class="text-sm text-muted">{calculator.yearsToFire} years</div>
				</div>
			</div>

			<div class="card">
				<div class="flex flex-col md:flex-row gap-4 justify-end mb-3">
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
						<Button size="icon" variant="outline" class="hover:bg-primary" onclick={downloadData}>
							<Download />
						</Button>
					</div>
				</div>

				<Tabs.Root value={selectedView} class="mt-4">
					<Tabs.Content value="chart" class="m-0">
						<FireChart />
					</Tabs.Content>

					<Tabs.Content value="table" class="m-0">
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead>
									<tr>
										<th class="text-left p-2">Age</th>
										<th class="text-right p-2">Investment Value</th>
										<th class="text-right p-2">FIRE Target</th>
									</tr>
								</thead>
								<tbody>
									{#each calculator.calculationData as row}
										<tr class="border-t border-gray-700">
											<td class="p-2">{row.age}</td>
											<td class="text-right p-2">{formatAsCurrency(row.investmentValue)}</td>
											<td class="text-right p-2">{formatAsCurrency(row.fireTarget)}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</section>
</main>
