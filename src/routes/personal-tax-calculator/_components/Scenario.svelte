<script lang="ts">
	import Inputs from './Inputs.svelte';
	import TaxRateTable from './TaxRateTable.svelte';
	import type { Scenario, Result } from '../types';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import TaxBand from './TaxBand.svelte';

	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import StackedBar from '$lib/components/charts/StackedBar.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';

	export let scenario: Scenario;
	export let result: Result;

	let options = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = 'chart';
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
		<Card
			><div class="mb-2">
				<p class="text-sm font-semibold text-brand-light">Taxable Income</p>
				<p class="font-semibold text-2xl md:text-2xl">
					{formatAsCurrency(scenario.income - scenario.deductions, false)}
				</p>
			</div>
			<TaxBand taxableIncome={scenario.income - scenario.deductions} />
		</Card>
		<div class="flex gap-4 flex-col md:flex-row">
			<Card class="flex-1">
				<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
					<div>
						<p class="text-sm font-semibold text-brand-light">Total Tax</p>
						<p class="font-semibold text-2xl md:text-2xl">
							{formatAsCurrency(result.totalTax, false)}
						</p>
					</div>
					<Tabs {options} bind:selectedView />
				</div>

				{#if selectedView === 'chart'}
					<StackedBar
						theme={'colourful'}
						data={[
							{ label: 'Income Tax', value: result.incomeTax },
							{ label: 'Medicare Levy', value: result.medicareLevy },
							{ label: 'Medicare Levy Surcharge', value: result.medicareLevySurcharge },
							{ label: 'HELP Repayment', value: result.helpRepayment }
						]}
						labels={['Tax']}
						formatter={formatAsCurrency}
					/>
					<LegendList
						theme={'colourful'}
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
								<th>Detail</th>
								<th>Value ($)</th>
							</thead>
							<tbody>
								<tr class="text-lg">
									<td>Taxable Income</td>
									<td>{formatAsCurrency(result.taxableIncome, false)}</td>
								</tr>

								<tr>
									<td>Income Tax</td>
									<td>{formatAsCurrency(result.incomeTax, false)}</td>
								</tr>
								{#if result.lowIncomeOffset > 0}
									<tr>
										<td>Low Income Offset</td>
										<td>({formatAsCurrency(result.lowIncomeOffset, false)})</td>
									</tr>
								{/if}
								<tr>
									<td>Medicare Levy</td>
									<td>{formatAsCurrency(result.medicareLevy, false)}</td>
								</tr>
								<tr>
									<td>Medicare Levy Surcharge</td>
									<td>{formatAsCurrency(result.medicareLevySurcharge, false)}</td>
								</tr>
								<tr>
									<td>HELP Repayment</td>
									<td>{formatAsCurrency(result.helpRepayment, false)}</td>
								</tr>
								<tr class="text-lg">
									<td>Total Tax</td>
									<td>{formatAsCurrency(result.totalTax, false)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</Card>

			<Card class="flex-1">
				<h2 class="text-sm font-semibold text-brand-light mb-2">Rates</h2>
				<TaxRateTable />
			</Card>
		</div>
	</section>
</div>
