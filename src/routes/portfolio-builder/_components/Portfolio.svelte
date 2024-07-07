<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { portfolio, addHolding, portfolioDetails } from '$lib/stores/portfolioStore';
	import AddHolding from './AddHolding.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import AssetAllocation from './AssetAllocation.svelte';
	import ViewToggle from '$lib/components/ui/ViewToggle.svelte';
	import Investments from './Investments.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import { CHART_COLOURS } from '$lib/constants';

	let selectedView = 'Investment';
</script>

<div class="mb-3 flex w-full md:w-40">
	<CurrencyInput label="Portfolio value" bind:value={$portfolio.value} />
</div>

{#if $portfolioDetails.holdings.length > 0}
	<div class="flex flex-col lg:flex-row w-full gap-5">
		<Card class="flex-1 lg:min-w-[600px]">
			<div class="flex items-center justify-between">
				<h2>{selectedView}</h2>
				<ViewToggle
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
		<Card class="w-full lg:max-w-[300px] mx-auto">
			{#if selectedView === 'Investment'}
				<DoughnutChart
					labels={$portfolioDetails.holdings.map((holding) => holding.investment.code)}
					dataValues={$portfolioDetails.holdings.map((holding) => holding.allocation)}
				/>
			{:else}
				<DoughnutChart
					backgroundColors={CHART_COLOURS}
					legendPosition={'left'}
					labels={$portfolioDetails.assetAllocation.map((assetClass) => assetClass.name)}
					dataValues={$portfolioDetails.assetAllocation.map(
						(assetClass) => assetClass.value / $portfolio.value
					)}
				/>
			{/if}
		</Card>
	</div>
{:else}
	<AddHolding {addHolding} />
{/if}
