<script lang="ts">
	import html2canvas from 'html2canvas';
	import Inputs from './Inputs.svelte';
	import Chart from './Chart.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Table from './Table.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import type { Result, Scenario } from '../types';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import { Download } from 'lucide-svelte';

	export let scenario: Scenario;
	export let result: Result;

	let options = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = 'chart';

	let chartContainer: HTMLElement;

	async function downloadChart() {
		if (chartContainer) {
			// Temporarily hide the tabs
			const tabsElement = chartContainer.querySelector('.tabs-container');
			const downloadButton = chartContainer.querySelector('.download-button');
			if (tabsElement) tabsElement.classList.add('hidden');
			if (downloadButton) downloadButton.classList.add('hidden');

			const canvas = await html2canvas(chartContainer);
			const dataUrl = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = 'chart.png';
			link.href = dataUrl;
			link.click();

			// Show the tabs again
			if (tabsElement) tabsElement.classList.remove('hidden');
			if (downloadButton) downloadButton.classList.remove('hidden');
		}
	}
</script>

<section class="flex flex-col lg:flex-row gap-8">
	<aside class="max-w-[1000px] min-w-[300px]">
		<Inputs
			bind:principal={scenario.principal}
			bind:contributionAmount={scenario.contributionAmount}
			bind:interestRate={scenario.interestRate}
			bind:contributionFrequency={scenario.contributionFrequency}
			bind:years={scenario.years}
		/>
	</aside>
	<div class="w-full card" bind:this={chartContainer}>
		<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
			<div>
				<h2>Total value after {scenario.years} years</h2>
				<p class="font-semibold text-2xl md:text-2xl">
					{formatAsCurrency(result.totalValue, false)}
				</p>
			</div>
			<div class="flex items-center gap-2">
				<div class="tabs-container">
					<Tabs {options} bind:selectedView />
				</div>
				<button
					on:click={downloadChart}
					class="p-2 bg-ui-800 hover:bg-ui-700 rounded transition-colors duration-200 download-button"
					title={'Download' + (selectedView === 'chart' ? ' chart' : ' csv')}
				>
					<Download class="size-5" />
				</button>
			</div>
		</div>
		{#if selectedView === 'chart'}
			<Chart data={result.annualData} />
			<div class="md:max-w-xs">
				<p class="font-semibold text-ui-200">
					After {scenario.years} years at {formatAsPercentage(scenario.interestRate)} p.a
				</p>
				<LegendList
					formatter={formatAsCurrency}
					data={[
						{ label: 'Principle', value: result.annualData[0].startingValue },
						{ label: 'Contributions', value: result.totalContributions },
						{ label: 'Interest', value: result.totalInterest }
					]}
				/>
			</div>
		{:else if selectedView === 'table'}
			<Table annualData={result.annualData} />
		{/if}
	</div>
</section>
