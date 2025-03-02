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

<div>
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Chart Card - 1/3 width on desktop -->
		<div class="card p-4">
			<h2 class="text-lg font-medium mb-3">Allocation Chart</h2>
			<div class="flex flex-col items-center">
				<DoughnutChart data={assetAllocationChartData} formatter={formatAsPercentage} />
				<div class="mt-4 w-full">
					<LegendList data={assetAllocationChartData} formatter={formatAsPercentage} />
				</div>
			</div>
		</div>

		<!-- Table Card - 2/3 width on desktop -->
		<div class="card p-4 lg:col-span-2">
			<h3 class="text-lg font-medium mb-3">Investment Breakdown</h3>
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr>
							<th class="text-left">Investment</th>
							<th class="text-right">Value</th>
							<th class="text-right">Weight</th>
							<th class="text-right">Aus Eq</th>
							<th class="text-right">Int Eq</th>
							<th class="text-right">Aus FI</th>
							<th class="text-right">Int FI</th>
							<th class="text-right">Cash</th>
							<th class="text-right">Alt</th>
						</tr>
					</thead>
					<tbody>
						{#each portfolio.portfolio as holding}
							<tr>
								<td class="py-2">
									<div class="flex items-center gap-1">
										<span class="font-medium">{holding.investment.symbol}</span>
									</div>
									<div class="text-xs text-muted-foreground">
										{holding.investment.name}
									</div>
								</td>
								<td class="text-right py-2">{formatAsCurrency(holding.value)}</td>
								<td class="text-right py-2">{formatAsPercentage(holding.weight)}</td>
								<td class="text-right py-2">
									{#if holding.investment.assetAllocation.ausEquities > 0}
										<div
											class="inline-block w-full max-w-[40px] bg-gray-700 rounded-full h-1.5"
											title={formatAsPercentage(holding.investment.assetAllocation.ausEquities)}
										>
											<div
												class="bg-indigo-600 h-1.5 rounded-full"
												style={`width: ${holding.investment.assetAllocation.ausEquities * 100}%`}
											></div>
										</div>
									{/if}
								</td>
								<td class="text-right py-2">
									{#if holding.investment.assetAllocation.intEquities > 0}
										<div
											class="inline-block w-full max-w-[40px] bg-gray-700 rounded-full h-1.5"
											title={formatAsPercentage(holding.investment.assetAllocation.intEquities)}
										>
											<div
												class="bg-blue-500 h-1.5 rounded-full"
												style={`width: ${holding.investment.assetAllocation.intEquities * 100}%`}
											></div>
										</div>
									{/if}
								</td>
								<td class="text-right py-2">
									{#if holding.investment.assetAllocation.ausFixedInterest > 0}
										<div
											class="inline-block w-full max-w-[40px] bg-gray-700 rounded-full h-1.5"
											title={formatAsPercentage(
												holding.investment.assetAllocation.ausFixedInterest
											)}
										>
											<div
												class="bg-green-600 h-1.5 rounded-full"
												style={`width: ${holding.investment.assetAllocation.ausFixedInterest * 100}%`}
											></div>
										</div>
									{/if}
								</td>
								<td class="text-right py-2">
									{#if holding.investment.assetAllocation.intFixedInterest > 0}
										<div
											class="inline-block w-full max-w-[40px] bg-gray-700 rounded-full h-1.5"
											title={formatAsPercentage(
												holding.investment.assetAllocation.intFixedInterest
											)}
										>
											<div
												class="bg-emerald-500 h-1.5 rounded-full"
												style={`width: ${holding.investment.assetAllocation.intFixedInterest * 100}%`}
											></div>
										</div>
									{/if}
								</td>
								<td class="text-right py-2">
									{#if holding.investment.assetAllocation.cash > 0}
										<div
											class="inline-block w-full max-w-[40px] bg-gray-700 rounded-full h-1.5"
											title={formatAsPercentage(holding.investment.assetAllocation.cash)}
										>
											<div
												class="bg-amber-500 h-1.5 rounded-full"
												style={`width: ${holding.investment.assetAllocation.cash * 100}%`}
											></div>
										</div>
									{/if}
								</td>
								<td class="text-right py-2">
									{#if holding.investment.assetAllocation.alternatives > 0}
										<div
											class="inline-block w-full max-w-[40px] bg-gray-700 rounded-full h-1.5"
											title={formatAsPercentage(holding.investment.assetAllocation.alternatives)}
										>
											<div
												class="bg-orange-500 h-1.5 rounded-full"
												style={`width: ${holding.investment.assetAllocation.alternatives * 100}%`}
											></div>
										</div>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Metrics Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
		<div class="card p-4">
			<h4 class="text-sm text-muted-foreground mb-1">Growth Assets</h4>
			<p class="text-2xl font-semibold">
				{formatAsPercentage(growthAssets / portfolio.totalWeight)}
			</p>
			<div class="w-full bg-gray-700 rounded-full h-2 mt-2">
				<div
					class="bg-indigo-500 h-2 rounded-full"
					style={`width: ${(growthAssets / portfolio.totalWeight) * 100}%`}
				></div>
			</div>
		</div>

		<div class="card p-4">
			<h4 class="text-sm text-muted-foreground mb-1">Defensive Assets</h4>
			<p class="text-2xl font-semibold">
				{formatAsPercentage(defensiveAssets / portfolio.totalWeight)}
			</p>
			<div class="w-full bg-gray-700 rounded-full h-2 mt-2">
				<div
					class="bg-green-500 h-2 rounded-full"
					style={`width: ${(defensiveAssets / portfolio.totalWeight) * 100}%`}
				></div>
			</div>
		</div>
	</div>
</div>
