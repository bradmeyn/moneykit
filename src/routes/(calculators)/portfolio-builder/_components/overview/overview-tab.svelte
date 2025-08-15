<script lang="ts">
	import { formatAsPercentage } from '$utils/formatters';
	import PortfolioOverviewTable from './overview-table.svelte';
	import CurrencyInput from '$lib/components/inputs/currency-input.svelte';
	import AddInvestment from './add-investment.svelte';
	import DoughnutChart from '$lib/components/charts/doughnut-chart.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';
	import type { PortfolioType } from '../../calculator.svelte';

	let {
		portfolio
	}: {
		portfolio: PortfolioType;
	} = $props();

	const data = $derived(
		portfolio.holdings.map((holding) => ({
			label: holding.investment.name,
			value: holding.weight
		}))
	);
</script>

<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mt-4">
	<div class="w-full card">
		<h2 class="card-heading">Portfolio Overview</h2>
		<div class="md:w-[200px] mb-2">
			<label for="portfolio-value" class="block text-xs text-muted-foreground mb-1"
				>Total Value</label
			>
			<CurrencyInput
				id="portfolio-value"
				value={portfolio.portfolioValue}
				onchange={(value: number) => (portfolio.portfolioValue = value)}
			/>
		</div>
		<PortfolioOverviewTable {portfolio} />
		<div class="flex justify-end mt-4">
			<AddInvestment {portfolio} />
		</div>
	</div>
	<div class="card">
		<h2 class="card-heading">Portfolio</h2>
		<div class="flex flex-col items-center">
			<DoughnutChart {data} formatter={formatAsPercentage} />
			<div class="mt-4 w-full">
				<LegendList {data} formatter={formatAsPercentage} />
			</div>
		</div>
	</div>
</div>
