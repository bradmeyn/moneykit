<script lang="ts">
	type Props = {
		income: number;
		deductions: number;
		incomeTax: number;
		medicareLevy: number;
		medicareLevySurcharge: number;
		totalTax: number;
	};
	// props
	export let results: Props;
	import { formatAsCurrency } from '$lib/utils';
	import ResultsTable from './ResultsTable.svelte';
	import ViewToggle from '$lib/components/ViewToggle.svelte';
	import PieChart from '$lib/components/PieChart.svelte';

	let viewOptions = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = 'chart';
</script>

<h2 class="text-2xl bold mb-2">Outcome</h2>

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
		<h2 class="text-sm">Income Tax</h2>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(results.incomeTax, false, true)}
		</p>
	</div>
	<div class=" p-3 bg-slate-800">
		<h2 class="text-sm">Medicare Levy</h2>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(results.medicareLevy, false, true)}
		</p>
	</div>
	<div class=" p-3 bg-slate-800">
		<h2 class="text-sm">Medicare Levy Surcharge</h2>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(results.medicareLevySurcharge, false, true)}
		</p>
	</div>
</div>
<ViewToggle {viewOptions} bind:selectedView />

{#if selectedView === 'chart'}
	<div>
		<PieChart
			labels={['Taxable Income', 'Tax']}
			dataValues={[results.income - results.deductions, results.totalTax]}
		/>
	</div>
{:else}
	<ResultsTable {results} />
{/if}
