<script lang="ts">
	import { formatAsPercentage } from '$utils/formatters';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import { getPortfolioState } from '../calculator.svelte';
	import { assetLabels } from '../investments';
	const portfolio = getPortfolioState();

	// Calculate unallocated value and percentage
	let unallocatedValue = $derived.by(() => {
		return Math.max(
			0,
			portfolio.portfolioValue -
				portfolio.portfolio.reduce((acc, holding) => acc + holding.value, 0)
		);
	});

	let unallocatedPercentage = $derived.by(() => {
		return portfolio.portfolioValue > 0 ? unallocatedValue / portfolio.portfolioValue : 0;
	});

	// Format asset allocation data for charts with unallocated
	let assetAllocationChartData = $derived.by(() => {
		const allocation = portfolio.assetAllocation;

		// Start with the regular allocations
		let chartData = Object.entries(allocation)
			.filter(([_, value]) => value > 0)
			.map(([key, value]) => ({
				label: assetLabels[key as keyof typeof assetLabels],
				value
			}));

		// Add unallocated if present
		if (unallocatedPercentage > 0) {
			chartData.push({
				label: 'Unallocated',
				value: unallocatedPercentage
			});
		}

		return chartData.sort((a, b) => b.value - a.value);
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

	// Add growthDefensiveChartData that includes unallocated
	let growthDefensiveChartData = $derived.by(() => {
		let data = [];

		if (growthAssets > 0) {
			data.push({
				label: 'Growth Assets',
				value: growthAssets
			});
		}

		if (defensiveAssets > 0) {
			data.push({
				label: 'Defensive Assets',
				value: defensiveAssets
			});
		}

		if (unallocatedPercentage > 0) {
			data.push({
				label: 'Unallocated',
				value: unallocatedPercentage
			});
		}

		return data;
	});
</script>

<div class="card">
	<h2 class="text-lg font-medium mb-3">Asset Allocation</h2>
	<div class="flex flex-col items-center">
		<DoughnutChart data={assetAllocationChartData} formatter={formatAsPercentage} />
		<div class="mt-4 w-full">
			<LegendList data={assetAllocationChartData} formatter={formatAsPercentage} />
		</div>
		<div class="mt-6 w-full">
			{#if growthAssets > 0 || defensiveAssets > 0}
				<div class="h-2 bg-muted rounded-full mb-3 w-full flex">
					{#if growthAssets > 0}
						<div
							class="h-2 bg-[#FF7043] rounded-l-full {defensiveAssets === 0
								? 'rounded-r-full'
								: ''}"
							style="width: {(growthAssets / (growthAssets + defensiveAssets)) * 100}%"
						></div>
					{/if}

					{#if growthAssets > 0 && defensiveAssets > 0}
						<div class="w-1 h-2 bg-muted"></div>
					{/if}

					{#if defensiveAssets > 0}
						<div
							class="h-2 bg-[#42A5F5] rounded-r-full {growthAssets === 0 ? 'rounded-l-full' : ''}"
							style="width: {(defensiveAssets / (growthAssets + defensiveAssets)) * 100}%"
						></div>
					{/if}
				</div>
			{:else}
				<div class="h-2 bg-muted rounded-full mb-3 w-full"></div>
			{/if}

			<div class="flex justify-between text-sm mb-4">
				<div>
					<span class="inline-block size-2 rounded-full bg-[#FF7043] mr-1"></span>
					Growth {formatAsPercentage(growthAssets)}
				</div>
				<div>
					<span class="inline-block size-2 rounded-full bg-[#42A5F5] mr-1"></span>
					Defensive {formatAsPercentage(defensiveAssets)}
				</div>
			</div>
		</div>
	</div>
</div>
