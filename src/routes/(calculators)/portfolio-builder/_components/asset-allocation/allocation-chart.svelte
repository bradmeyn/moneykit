<script lang="ts">
	import { formatAsPercentage } from '$utils/formatters';
	import DoughnutChart from '$lib/components/charts/doughnut-chart.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';
	import { assetLabels } from '../../investments';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';

	let {
		portfolio
	}: {
		portfolio: Portfolio;
	} = $props();

	// Calculate unallocated value and percentage
	let unallocatedValue = $derived.by(() => {
		if (!portfolio) return 0;
		return Math.max(
			0,
			(portfolio.portfolioValue ?? 0) -
				(portfolio.holdings.reduce((acc: number, holding: any) => acc + holding.value, 0) ?? 0)
		);
	});

	let unallocatedPercentage = $derived.by(() => {
		if (!portfolio) return 0;
		return (portfolio.portfolioValue ?? 0) > 0 ? unallocatedValue / portfolio.portfolioValue : 0;
	});

	// Format asset allocation data for charts with unallocated
	let assetAllocationChartData = $derived.by(() => {
		if (!portfolio) return [];
		const allocation = portfolio.assetAllocation ?? {};

		// Start with the regular allocations
		let chartData = Object.entries(allocation)
			.filter(([_, value]) => typeof value === 'number' && value > 0)
			.map(([key, value]) => ({
				label: assetLabels[key as keyof typeof assetLabels],
				value: value as number
			}));

		// Add unallocated if present
		if (unallocatedPercentage > 0) {
			chartData.push({
				label: 'Unallocated',
				value: unallocatedPercentage as number
			});
		}

		return chartData.sort((a, b) => (b.value as number) - (a.value as number));
	});

	// Calculate growth vs defensive asset ratios
	let growthAssets = $derived.by(() => {
		if (!portfolio) return 0;
		const allocation = portfolio.assetAllocation ?? {};
		return (
			(allocation.ausEquities ?? 0) + (allocation.intEquities ?? 0) + (allocation.alternatives ?? 0)
		);
	});

	let defensiveAssets = $derived.by(() => {
		if (!portfolio) return 0;
		const allocation = portfolio.assetAllocation ?? {};
		return (
			(allocation.ausFixedInterest ?? 0) +
			(allocation.intFixedInterest ?? 0) +
			(allocation.cash ?? 0)
		);
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
	<h2 class="card-heading">Asset Allocation</h2>
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
