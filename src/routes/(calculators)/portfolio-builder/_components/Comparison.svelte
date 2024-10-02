<script lang="ts">
	import { scenarios, results } from '../store';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import type { Result } from '../types';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { COLOURFUL } from '$lib/constants/colours';
	import AllocationChart from './AllocationChart.svelte';

	let selectedView = 'Cost';

	$: costData = $results.map((result: Result) => {
		return {
			label: 'Scenario ' + result.id,
			value: result.totalCost
		};
	});

	$: allocationLabels = $results[0].assetAllocation.map((assetClass) => assetClass.name);
	$: allocationData = $results.map((result, i) => {
		return result.assetAllocation.map((assetClass) => assetClass.value / $scenarios[i].value);
	});
</script>

<section class="flex flex-col-reverse lg:flex-row gap-8">
	<div class="flex flex-col lg:flex-row w-full gap-5 items-stretch">
		<div class=" lg:min-w-[600px] flex-grow card">
			<div class="overflow-x-auto mb-4">
				<p class="text-sm font-semibold text-brand-light">Cost</p>
				<table class="w-full border-collapse">
					<thead>
						<tr>
							<th class="p-2 text-left" />
							{#each $results as result, i}
								<th class="p-2 text-left">
									<div class="flex items-center gap-2">
										<div class="w-3 h-3 rounded-full" style="background-color: {COLOURFUL[i]}" />
										<div class="text-white text-nowrap text-base">Scenario {result.id}</div>
									</div>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="p-2 text-ui-400 text-sm">Portfolio Balance</td>
							{#each $scenarios as scenario, i}
								<td class="p-2 text-nowrap">{formatAsCurrency(scenario.value)}</td>
							{/each}
						</tr>
						<tr>
							<td class="p-2 text-ui-400 text-sm">Total Cost</td>
							{#each $results as result, i}
								<td class="p-2 text-nowrap"
									><div>
										{formatAsCurrency(result.totalCost)}
										({formatAsPercentage(result.totalCostPercentage)}) p.a
									</div>
								</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>

			<p class="text-sm font-semibold text-brand-light">Asset Allocation</p>
			<table>
				<tr>
					<th class="p-2 text-left" />
					{#each $results as result, i}
						<th class="p-2 text-left">
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 rounded-full" style="background-color: {COLOURFUL[i]}" />
								<div class="text-white text-nowrap text-base">Scenario {result.id}</div>
							</div>
						</th>
					{/each}
				</tr>
				<tbody>
					{#each $results[0].assetAllocation as assetClass, j}
						<tr>
							<td class="text-sm text-ui-400">{assetClass.name}</td>
							{#each $results as result, i}
								<td
									>{formatAsCurrency(result.assetAllocation[j].value, false)}
									({formatAsPercentage(result.assetAllocation[j].value / $scenarios[i].value)})</td
								>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class=" mx-auto w-full lg:w-1/2 card">
			<div class="flex items-center justify-between mb-3">
				<p class="text-sm font-semibold text-brand-light">{selectedView}</p>
				<Tabs
					options={[
						{ label: 'Cost', value: 'Cost' },
						{ label: 'Allocation', value: 'Allocation' }
					]}
					bind:selectedView
				/>
			</div>
			{#if selectedView === 'Cost'}
				<BarChart data={costData} formatter={formatAsCurrency} theme="colourful" />
			{:else}
				<AllocationChart
					theme="colourful"
					labels={allocationLabels}
					datasets={allocationData}
					formatter={formatAsPercentage}
				/>
			{/if}
		</div>
	</div>
</section>
