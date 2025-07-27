<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import Inputs from './_components/fire-inputs.svelte';
	import FireChart from './_components/fire-chart.svelte';
	import DownloadButton from '$lib/components/download-button.svelte';
	import ScrollableTable from '$ui/scrollable-table.svelte';

	setCalculatorState();
	let calculator = getCalculatorState();
	let selectedView = $state('chart');

	const { columns, rows } = calculator.getTableData();

	let downloadData = $derived.by(() => {
		return {
			headers: ['Age', 'Investment Value', 'FIRE Target'],
			rows: calculator.calculationData.map((d) => [d.age, d.investmentValue, d.fireTarget])
		};
	});
</script>

<svelte:head>
	<title>MoneyKit | FIRE</title>
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4 calculator-heading">FIRE Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />

		<div class="card w-full">
			<h2 class="card-heading mb-1">Outcome</h2>
			<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
				<div class="grid grid-cols-2 gap-16">
					<div class="col-span-2 md:col-span-1">
						<h3 class="">FIRE Number</h3>
						<div class="text-2xl font-semibold">
							{formatAsCurrency(calculator.fireNumber)}
						</div>
						<div class="text-sm">25x Annual Expenses</div>
					</div>

					<div class="col-span-2 md:col-span-1">
						<h3 class="">FIRE Age</h3>
						<div class="text-2xl font-semibold">
							<span>{calculator.yearsToFire + calculator.age}</span>
						</div>
						<div class="text-sm">{calculator.yearsToFire} years</div>
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
					<DownloadButton data={downloadData} filename="fire-calculation.csv" />
				</div>
			</div>

			<Tabs.Root value={selectedView}>
				<Tabs.Content value="chart" class="m-0">
					<FireChart />
				</Tabs.Content>

				<Tabs.Content value="table" class="m-0">
					<ScrollableTable {columns} {rows} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</section>
</main>
