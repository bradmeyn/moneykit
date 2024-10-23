<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import AddLiability from './_components/AddLiability.svelte';

	const assets = [
		{ name: '205 Kings Road', value: 500000, category: 'Real Estate' },
		{ name: 'Toyota Corolla', value: 20000, category: 'Cars' },
		{ name: 'Vanguard ETF', value: 100000, category: 'Investments' }
	];

	const assetTotal = assets.reduce((acc, asset) => acc + asset.value, 0);

	const liabilities = [
		{ name: 'Mortgage', value: 300000, category: 'Real Estate' },
		{ name: 'Toyota Corolla', value: 10000, category: 'Cars' }
	];

	const liabilityTotal = liabilities.reduce((acc, liability) => acc + liability.value, 0);

	const netWorth = assetTotal - liabilityTotal;
	const totalValue = assetTotal + liabilityTotal;
	const assetPercentage = (assetTotal / totalValue) * 100;
	const liabilityPercentage = (liabilityTotal / totalValue) * 100;
</script>

<div class="space-y-6 max-w-4xl mx-auto">
	<h1 class="mb-4 text-white">Balance Sheet</h1>
	<section class="card col-span-1">
		<h2>Net worth</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(netWorth)}
		</p>
		<div class="w-full h-4 rounded-full overflow-hidden flex">
			<div class="h-full bg-green-500" style="width: {assetPercentage}%" />
			<div class="h-full bg-red-500" style="width: {liabilityPercentage}%" />
		</div>
		<div class="flex justify-between mt-2 text-sm text-ui-200">
			<span>Assets: {formatAsCurrency(assetTotal)}</span>
			<span>Liabilities: {formatAsCurrency(liabilityTotal)}</span>
		</div>
	</section>

	<section class="card">
		<h2>Assets</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(assetTotal)}
		</p>

		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Asset</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
				</tr>
			</thead>
			<tbody>
				{#each assets as asset (asset.name)}
					<tr>
						<td class="text-white p-2 w-56">{asset.name}</td>
						<td class="text-white p-2 w-40">{formatAsCurrency(asset.value)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section class="card">
		<div class="flex justify-between items-center">
			<div>
				<h2>Liabilities</h2>
				<p class="text-2xl font-semibold mb-2 text-white">
					{formatAsCurrency(liabilityTotal)}
				</p>
			</div>

			<AddLiability />
		</div>

		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Liability</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
				</tr>
			</thead>
			<tbody>
				{#each liabilities as liability (liability.name)}
					<tr>
						<td class="text-white p-2 w-56">{liability.name}</td>
						<td class="text-white p-2 w-40">{formatAsCurrency(liability.value)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>
