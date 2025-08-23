<script lang="ts">
	import BarChart from '$lib/components/charts/bar-chart.svelte';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';
	import { assetLabels } from '../../investments';
	import { COLOURS } from '$lib/constants/colours';
	import { formatAsPercentage } from '$utils/formatters';
	import * as Tabs from '$lib/components/ui/tabs';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();

	let view = $state('chart');

	type AssetKey =
		| 'ausEquities'
		| 'intEquities'
		| 'ausFixedInterest'
		| 'intFixedInterest'
		| 'cash'
		| 'alternatives';
	const assetKeys: AssetKey[] = [
		'ausEquities',
		'intEquities',
		'ausFixedInterest',
		'intFixedInterest',
		'cash',
		'alternatives'
	];

	let labels = assetKeys.map((key: AssetKey) => assetLabels[key]);

	let datasets = $derived([
		{
			label: 'Portfolio 1',
			data: assetKeys.map((key: AssetKey) => portfolio1?.assetAllocation?.[key] ?? 0),
			backgroundColor: COLOURS[0],
			borderRadius: 5,
			borderWidth: 0
		},
		{
			label: 'Portfolio 2',
			data: assetKeys.map((key: AssetKey) => portfolio2?.assetAllocation?.[key] ?? 0),
			backgroundColor: COLOURS[1],
			borderRadius: 5,
			borderWidth: 0
		}
	]);

	// Table data for asset allocation comparison
	let tableData = $derived(
		assetKeys.map((key: AssetKey, i) => ({
			asset: assetLabels[key],
			p1: portfolio1?.assetAllocation?.[key] ?? 0,
			p2: portfolio2?.assetAllocation?.[key] ?? 0
		}))
	);
</script>

<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
	<div class="card">
		<h2 class="card-heading">Asset Allocation Comparison</h2>
		<BarChart
			{datasets}
			formatter={formatAsPercentage}
			showLegend={true}
			data={labels.map((label, i) => ({
				label,
				value: datasets[0].data[i]
			}))}
		/>
	</div>

	<div class="card">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead>
					<tr>
						<th class="text-left">Asset Class</th>
						<th class="text-right">P1</th>
						<th class="text-right">P2</th>
						<th class="text-right">Difference</th>
					</tr>
				</thead>
				<tbody>
					{#each tableData as row}
						<tr>
							<td>{row.asset}</td>
							<td class="text-right">
								{formatAsPercentage(row.p1)}
							</td>
							<td class="text-right">
								{formatAsPercentage(row.p2)}
							</td>
							<td class="text-right">
								{formatAsPercentage(row.p1 - row.p2)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
