<script lang="ts">
	import Inputs from './_components/Inputs.svelte';
	import TaxRateTable from './_components/TaxRateTable.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import TaxBand from './_components/TaxBand.svelte';
	import StackedBar from '$lib/components/charts/StackedBar.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Table from '$lib/components/ui/table';

	setCalculatorState();
	let calculator = getCalculatorState();
	let selectedView = $state('chart');

	let data = $derived(
		[
			{ label: 'Income Tax', value: calculator.result.incomeTax },
			{ label: 'Medicare Levy', value: calculator.result.medicareLevy },
			{ label: 'Medicare Levy Surcharge', value: calculator.result.medicareLevySurcharge },
			{ label: 'HELP Repayment', value: calculator.result.helpRepayment }
		].filter((item): item is { label: string; value: number } => item.value > 0)
	);
</script>

<svelte:head>
	<title>MoneyKit | Tax Calculator</title>
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Personal Tax Calculator</h1>
	<div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
		<aside class=" min-w-[300px]">
			<Inputs />
		</aside>

		<section class="space-y-4 w-full">
			<div class="card">
				<div class="mb-2">
					<p class="text-sm font-semibold text-primary-light">Taxable Income</p>
					<p class="font-semibold text-2xl md:text-2xl">
						{formatAsCurrency(calculator.result.taxableIncome)}
					</p>
				</div>
				<TaxBand taxableIncome={calculator.result.income - calculator.result.deductions} />
			</div>
			<div class="flex gap-4 flex-col md:flex-row">
				<div class="flex-1 card">
					<Tabs.Root value={selectedView} onValueChange={(value) => (selectedView = value)}>
						<div class="flex justify-between">
							<div>
								<h2 class="card-heading">Tax Payable</h2>
								<p class="font-semibold text-2xl">
									{formatAsCurrency(calculator.result.totalTax)}
								</p>
								<p class=" text-slate-400">
									({formatAsPercentage(
										calculator.result.totalTax / calculator.result.taxableIncome
									)})
								</p>
							</div>
							<Tabs.List class="grid grid-cols-2 w-[200px]">
								<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
								<Tabs.Trigger value="table">Table</Tabs.Trigger>
							</Tabs.List>
						</div>

						<Tabs.Content value="chart" class="mt-4">
							<StackedBar {data} formatter={formatAsCurrency} />
							<LegendList {data} formatter={formatAsCurrency} />
						</Tabs.Content>

						<Tabs.Content value="table" class="mt-4">
							<div>
								<Table.Root class="max-w-xl">
									<Table.Header>
										<Table.Row>
											<Table.Head>Detail</Table.Head>
											<Table.Head>Value ($)</Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell>Taxable Income</Table.Cell>
											<Table.Cell>{formatAsCurrency(calculator.result.taxableIncome)}</Table.Cell>
										</Table.Row>

										<Table.Row>
											<Table.Cell>Income Tax</Table.Cell>
											<Table.Cell>{formatAsCurrency(calculator.result.incomeTax)}</Table.Cell>
										</Table.Row>

										{#if calculator.result.lowIncomeOffset > 0}
											<Table.Row>
												<Table.Cell>Low Income Offset</Table.Cell>
												<Table.Cell
													>({formatAsCurrency(calculator.result.lowIncomeOffset)})</Table.Cell
												>
											</Table.Row>
										{/if}

										<Table.Row>
											<Table.Cell>Medicare Levy</Table.Cell>
											<Table.Cell>{formatAsCurrency(calculator.result.medicareLevy)}</Table.Cell>
										</Table.Row>

										<Table.Row>
											<Table.Cell>Medicare Levy Surcharge</Table.Cell>
											<Table.Cell
												>{formatAsCurrency(calculator.result.medicareLevySurcharge)}</Table.Cell
											>
										</Table.Row>

										<Table.Row>
											<Table.Cell>HELP Repayment</Table.Cell>
											<Table.Cell>{formatAsCurrency(calculator.result.helpRepayment)}</Table.Cell>
										</Table.Row>

										<Table.Row class="text-lg">
											<Table.Cell>Total Tax</Table.Cell>
											<Table.Cell>{formatAsCurrency(calculator.result.totalTax)}</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table.Root>
							</div>
						</Tabs.Content>
					</Tabs.Root>
				</div>

				<div class="flex-1 card">
					<TaxRateTable />
				</div>
			</div>
		</section>
	</div>
</main>
