<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { portfolio, portfolioDetails } from '../store';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import AssetAllocation from './AssetAllocation.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Investments from './Investments.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';

	let selectedView = 'Investment';
</script>

<div class="mb-3 flex w-full md:w-40">
	<CurrencyInput bind:value={$portfolio.value} />
</div>

{#if $portfolioDetails.holdings.length > 0}
	<div class="flex flex-col lg:flex-row w-full gap-5 items-stretch">
		<Card class=" lg:min-w-[600px] flex-grow">
			<div class="flex items-center justify-between mb-3">
				<h2>{selectedView}</h2>
				<Tabs
					options={[
						{ label: 'Investments', value: 'Investment' },
						{ label: 'Allocation', value: 'Allocation' }
					]}
					bind:selectedView
				/>
			</div>
			{#if selectedView === 'Investment'}
				<Investments />
			{:else if selectedView === 'Allocation'}
				<AssetAllocation />
			{/if}
		</Card>
		<Card class="w-full lg:max-w-[300px] mx-auto ">
			{#if selectedView === 'Investment'}
				<DoughnutChart
					data={$portfolioDetails.holdings.map((holding) => {
						return {
							label: holding.investment.code,
							value: holding.value
						};
					})}
				/>
			{:else}
				<DoughnutChart
					data={$portfolioDetails.assetAllocation.map((assetClass) => {
						return {
							label: assetClass.name,
							value: assetClass.value / $portfolio.value
						};
					})}
				/>
			{/if}
		</Card>
	</div>
{:else}
	<AddHolding />
{/if}
