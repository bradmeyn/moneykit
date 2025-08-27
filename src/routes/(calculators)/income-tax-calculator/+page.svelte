<script lang="ts">
	import Inputs from './_components/tax-inputs.svelte';
	import TaxRateTable from './_components/rate-table.svelte';
	import { CURRENT_FINANCIAL_YEAR } from './tax-rates';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import TaxBand from './_components/tax-band.svelte';
	import StackedBar from '$lib/components/charts/stacked-bar.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

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
	<title>Tax Calculator</title>
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<main class="flex-1 container">
	<h1 class="mb-4 calculator-heading">Personal Tax Calculator ({CURRENT_FINANCIAL_YEAR})</h1>
	<div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
		<aside class=" min-w-[300px]">
			<Inputs />
		</aside>

		<section class="space-y-4 w-full">
			<div class="grid gap-4">
				<div class="card">
					<div class="mb-2">
						<p class="text-muted-foreground">Taxable Income</p>
						<p class="font-semibold text-2xl md:text-2xl">
							{formatAsCurrency(calculator.result.taxableIncome)}
						</p>
					</div>
					<TaxBand taxableIncome={calculator.result.income - calculator.result.deductions} />
				</div>
				<div class="card md:hidden">
					<h2 class="text-muted-foreground">Estimated Total Tax</h2>
					<p class="font-semibold text-2xl">
						{formatAsCurrency(calculator.result.totalTax)}
						<span class="text-muted-foreground text-base"
							>({formatAsPercentage(
								calculator.result.totalTax / calculator.result.taxableIncome
							)})</span
						>
					</p>
				</div>
			</div>
			<div class="flex gap-4 flex-col md:flex-row">
				<div class="flex-1 card">
					<Tabs.Root value={selectedView} onValueChange={(value) => (selectedView = value)}>
						<div class="flex gap-2 flex-col md:flex-row md:justify-between w-full mb-2">
							<h2 class="card-heading">Outcome</h2>
							<Tabs.Root
								value={selectedView}
								onValueChange={(value) => (selectedView = value)}
								class="w-full md:w-fit"
							>
								<Tabs.List class="w-full min-w-48">
									<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
									<Tabs.Trigger value="table">Table</Tabs.Trigger>
								</Tabs.List>
							</Tabs.Root>
						</div>

						<Tabs.Content value="chart" class="mt-4">
							<StackedBar {data} labels={['Total Tax']} formatter={formatAsCurrency} />
							<LegendList {data} formatter={formatAsCurrency} />
						</Tabs.Content>

						<Tabs.Content value="table" class="mt-4">
							<div>
								<table class="max-w-xl">
									<thead>
										<tr>
											<th>Detail</th>
											<th>Value ($)</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Taxable Income</td>
											<td>{formatAsCurrency(calculator.result.taxableIncome)}</td>
										</tr>

										<tr>
											<td>Income Tax</td>
											<td>{formatAsCurrency(calculator.result.incomeTax)}</td>
										</tr>

										{#if calculator.result.lowIncomeOffset > 0}
											<tr>
												<td>Low Income Offset</td>
												<td>({formatAsCurrency(calculator.result.lowIncomeOffset)})</td>
											</tr>
										{/if}

										<tr>
											<td>Medicare Levy</td>
											<td>{formatAsCurrency(calculator.result.medicareLevy)}</td>
										</tr>

										<tr>
											<td>Medicare Levy Surcharge</td>
											<td>{formatAsCurrency(calculator.result.medicareLevySurcharge)}</td>
										</tr>

										<tr>
											<td>HELP Repayment</td>
											<td>{formatAsCurrency(calculator.result.helpRepayment)}</td>
										</tr>

										<tr class="text-lg">
											<td>Total Tax</td>
											<td>{formatAsCurrency(calculator.result.totalTax)}</td>
										</tr>
									</tbody>
								</table>
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
