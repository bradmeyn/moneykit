<script lang="ts">
	import Inputs from './Inputs.svelte';
	import TaxRateTable from './TaxRateTable.svelte';
	import type { Scenario, Result } from '../types';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import TaxBand from './TaxBand.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import StackedBar from '$lib/components/charts/StackedBar.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	let { scenario, result }: { scenario: Scenario; result: Result } = $props();

	let options = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = $state('chart');
</script>

<div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
	<aside class=" min-w-[300px]">
		<Inputs
			bind:income={scenario.income}
			bind:deductions={scenario.deductions}
			bind:hasInsurance={scenario.hasInsurance}
			bind:hasHelpDebt={scenario.hasHelpDebt}
		/>
	</aside>

	<section class="space-y-4 w-full">
		<div class="card">
			<div class="mb-2">
				<p class="text-sm font-semibold text-primary-light">Taxable Income</p>
				<p class="font-semibold text-2xl md:text-2xl">
					{formatAsCurrency(result.taxableIncome)}
				</p>
			</div>
			<TaxBand taxableIncome={scenario.income - scenario.deductions} />
		</div>
		<div class="flex gap-4 flex-col md:flex-row">
			<div class="flex-1 card">
				<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
					<div>
						<p class="text-sm font-semibold text-primary-light">Total Tax</p>
						<p class="font-semibold text-2xl">
							{formatAsCurrency(result.totalTax)}
						</p>
						<p class=" text-slate-400">
							({formatAsPercentage(result.totalTax / result.taxableIncome)})
						</p>
					</div>
					<Tabs {options} bind:selectedView />
				</div>

				{#if selectedView === 'chart'}
					<StackedBar
						data={[
							{ label: 'Income Tax', value: result.incomeTax },
							{ label: 'Medicare Levy', value: result.medicareLevy },
							{ label: 'Medicare Levy Surcharge', value: result.medicareLevySurcharge },
							{ label: 'HELP Repayment', value: result.helpRepayment }
						]}
						formatter={formatAsCurrency}
					/>
					<LegendList
						data={[
							{ label: 'Income Tax', value: result.incomeTax },
							{ label: 'Medicare Levy', value: result.medicareLevy },
							{ label: 'Medicare Levy Surcharge', value: result.medicareLevySurcharge },
							{ label: 'HELP Repayment', value: result.helpRepayment }
						]}
						formatter={formatAsCurrency}
					/>
				{:else if selectedView === 'table'}
					<div>
						<table class="max-w-xl">
							<thead>
								<tr>
									<th>Detail</th>
									<th>Value ($)</th>
								</tr>
							</thead>
							<tbody>
								<tr class="text-lg">
									<td>Taxable Income</td>
									<td>{formatAsCurrency(result.taxableIncome)}</td>
								</tr>

								<tr>
									<td>Income Tax</td>
									<td>{formatAsCurrency(result.incomeTax)}</td>
								</tr>
								{#if result.lowIncomeOffset > 0}
									<tr>
										<td>Low Income Offset</td>
										<td>({formatAsCurrency(result.lowIncomeOffset)})</td>
									</tr>
								{/if}
								<tr>
									<td>Medicare Levy</td>
									<td>{formatAsCurrency(result.medicareLevy)}</td>
								</tr>
								<tr>
									<td>Medicare Levy Surcharge</td>
									<td>{formatAsCurrency(result.medicareLevySurcharge)}</td>
								</tr>
								<tr>
									<td>HELP Repayment</td>
									<td>{formatAsCurrency(result.helpRepayment)}</td>
								</tr>
								<tr class="text-lg">
									<td>Total Tax</td>
									<td>{formatAsCurrency(result.totalTax)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</div>

			<div class="flex-1 card">
				<TaxRateTable />
			</div>
		</div>
	</section>
</div>
