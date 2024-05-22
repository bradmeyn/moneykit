<script lang="ts">
	import type { TaxRateConfiguration } from '$lib/types';

	type Results = {
		income: number;
		deductions: number;
		incomeTax: number;
		lowIncomeOffset: number;
		medicareLevy: number;
		medicareLevySurcharge: number;
		totalTax: number;
	};

	export let taxRates: TaxRateConfiguration;
	export let results: Results;

	import { formatAsCurrency } from '$lib/utils';
	import ResultsTable from './ResultsTable.svelte';
	import ViewToggle from '$lib/components/ViewToggle.svelte';
	import PieChart from '$lib/components/charts/PieChart.svelte';
	import TaxBand from './TaxBand.svelte';

	let viewOptions = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = 'chart';

	$: taxableIncome = results.income - results.deductions;
</script>

<section>
	<h2>Outcome</h2>

	<div class="grid grid-cols-1 gap-3">
		<div class=" p-3 bg-slate-800 mb-3">
			<h2 class="text-sm">Taxable Income</h2>
			<p class="font-semibold text-lg md:text-xl">
				{formatAsCurrency(results.income - results.deductions, false, true)}
			</p>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
		<div class=" p-3 bg-slate-800">
			<p class="text-sm">Income Tax</p>
			<p class="font-semibold text-lg md:text-xl">
				{formatAsCurrency(results.incomeTax, false, true)}
			</p>
		</div>
		<div class=" p-3 bg-slate-800">
			<p class="text-sm">Medicare Levy</p>
			<p class="font-semibold text-lg md:text-xl">
				{formatAsCurrency(results.medicareLevy, false, true)}
			</p>
		</div>
		<div class=" p-3 bg-slate-800">
			<p class="text-sm">Medicare Levy Surcharge</p>
			<p class="font-semibold text-lg md:text-xl">
				{formatAsCurrency(results.medicareLevySurcharge, false, true)}
			</p>
		</div>
	</div>
	<ViewToggle {viewOptions} bind:selectedView />

	{#if selectedView === 'chart'}
		<div class="flex justify-start gap-10 flex-wrap md:flex-row flex-col">
			<div class="min-w-[300px] flex-1">
				<h3>Breakdown</h3>
				<PieChart
					labels={['Taxable Income', 'Tax']}
					dataValues={[taxableIncome, results.totalTax]}
				/>
			</div>
			<div class="min-w-[300px] flex-1">
				<h3>Marginal Rate</h3>
				<TaxBand {taxRates} {taxableIncome} />
			</div>
		</div>
	{:else}
		<ResultsTable {results} />
	{/if}
</section>
