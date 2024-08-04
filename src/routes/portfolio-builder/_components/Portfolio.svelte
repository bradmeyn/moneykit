<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import AssetAllocation from './AssetAllocation.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Investments from './Investments.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import { formatAsPercentage } from '$lib/utils/formatters';
	import type { Result, Scenario } from '../types';
	import Legend from '$lib/components/charts/Legend.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';

	export let scenario: Scenario;
	export let result: Result;

	$: investmentData = result.holdings.map((holding) => {
		return {
			label: holding.investment.code,
			value: holding.value / scenario.value
		};
	});

	$: assetAllocationData = result.assetAllocation.map((assetClass) => {
		return {
			label: assetClass.name,
			value: assetClass.value / scenario.value
		};
	});

	let selectedView = 'Investment';
</script>

<div class="mb-3 flex w-full md:w-40">
	<CurrencyInput bind:value={scenario.value} />
</div>

{#if result.holdings.length > 0}
	<div class="flex flex-col lg:flex-row w-full gap-5 items-stretch">
		<Card class=" lg:min-w-[600px] flex-grow">
			<div class="flex items-center justify-between mb-3">
				<h2>Portfolio {scenario.id}</h2>
				<Tabs
					options={[
						{ label: 'Investments', value: 'Investment' },
						{ label: 'Allocation', value: 'Allocation' }
					]}
					bind:selectedView
				/>
			</div>
			{#if selectedView === 'Investment'}
				<Investments {result} total={scenario.value} />
			{:else if selectedView === 'Allocation'}
				<AssetAllocation {result} total={scenario.value} />
			{/if}
		</Card>
		<Card class="w-full lg:max-w-[300px] mx-auto ">
			{#if selectedView === 'Investment'}
				<DoughnutChart data={investmentData} formatter={formatAsPercentage} theme="colourful" />
				<Legend data={investmentData} formatter={formatAsPercentage} theme="colourful" />
				<LegendList data={investmentData} formatter={formatAsPercentage} theme="colourful" />
			{:else}
				<DoughnutChart
					data={assetAllocationData}
					formatter={formatAsPercentage}
					theme="colourful"
				/>

				<LegendList data={assetAllocationData} formatter={formatAsPercentage} theme="colourful" />
			{/if}
		</Card>
	</div>
{:else}
	<AddHolding />
{/if}
