<script lang="ts">
	import { formatAsPercentage, formatAsCurrency } from '$utils/formatters';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import { getPortfolioState } from '../calculator.svelte';

	const portfolio = getPortfolioState();

	// Labels for asset classes
	const assetLabels = {
		ausEquities: 'Australian Equities',
		intEquities: 'International Equities',
		ausFixedInterest: 'Australian Fixed Interest',
		intFixedInterest: 'International Fixed Interest',
		cash: 'Cash',
		alternatives: 'Alternatives'
	};

	// Format asset allocation data for charts
	let assetAllocationChartData = $derived.by(() => {
		const allocation = portfolio.assetAllocation;
		return Object.entries(allocation)
			.filter(([_, value]) => value > 0)
			.map(([key, value]) => ({
				label: assetLabels[key as keyof typeof assetLabels],
				value
			}))
			.sort((a, b) => b.value - a.value);
	});

	// Calculate growth vs defensive asset ratios
	let growthAssets = $derived.by(() => {
		const allocation = portfolio.assetAllocation;
		return allocation.ausEquities + allocation.intEquities + allocation.alternatives;
	});

	let defensiveAssets = $derived.by(() => {
		const allocation = portfolio.assetAllocation;
		return allocation.ausFixedInterest + allocation.intFixedInterest + allocation.cash;
	});
</script>


<div class="card p-4">
	<h2 class="text-lg font-medium mb-3">Allocation Chart</h2>
	<div class="flex flex-col items-center">
		<DoughnutChart data={assetAllocationChartData} formatter={formatAsPercentage} />
		<div class="mt-4 w-full">
			<LegendList data={assetAllocationChartData} formatter={formatAsPercentage} />
		</div>
	</div>
</div>


