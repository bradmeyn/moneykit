<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import AddAsset from './_components/AddAsset.svelte';
	import AddLiability from './_components/AddLiability.svelte';
	import type { PageData } from './$types';


	interface Props {
		data: PageData;
	}

	let { data }: Props =  $props();

	const assetTotal = 0;

	// Convert liability balances to numbers for calculations
	let liabilityTotal = $derived(data.liabilities
		? data.liabilities.reduce((acc, liability) => acc + parseFloat(liability.balance), 0)
		: 0);

	let netWorth = $derived(assetTotal - liabilityTotal);
	let totalValue = $derived(assetTotal + liabilityTotal);
	let assetPercentage = $derived((assetTotal / totalValue) * 100);
	let liabilityPercentage = $derived((liabilityTotal / totalValue) * 100);
</script>

<div class="space-y-6 max-w-4xl mx-auto">
	<h1 class="mb-4 text-white">Balance Sheet</h1>
	<section class="card col-span-1">
		<h2>Net worth</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(netWorth)}
		</p>
		<div class="w-full h-4 rounded-full overflow-hidden flex">
			<div class="h-full bg-green-500" style="width: {assetPercentage}%"></div>
			<div class="h-full bg-red-500" style="width: {liabilityPercentage}%"></div>
		</div>
		<div class="flex justify-between mt-2 text-sm text-ui-200">
			<span>Assets: {formatAsCurrency(assetTotal)}</span>
			<span>Liabilities: {formatAsCurrency(liabilityTotal)}</span>
		</div>
	</section>

	<section class="card">
		<div class="flex justify-between items-center">
			<div>
				<h2>Assets</h2>
				<p class="text-2xl font-semibold mb-2 text-white">
					{formatAsCurrency(assetTotal)}
				</p>
			</div>

			<AddAsset />
		</div>

		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Asset</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
				</tr>
			</thead>
			<tbody></tbody>
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
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Balance</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Interest Rate</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Repayment</th>
				</tr>
			</thead>
			<tbody>
				{#if data.liabilities?.length === 0}
					<tr>
						<td class="text-white p-2" colspan="4">No liabilities added yet</td>
					</tr>
				{:else}
					{#each data.liabilities as liability (liability.id)}
						<tr>
							<td class="text-white p-2 w-56">{liability.name}</td>
							<td class="text-white p-2 w-40">{formatAsCurrency(parseFloat(liability.balance))}</td>
							<td class="text-white p-2 w-32"
								>{(parseFloat(liability.interestRate) * 100).toFixed(2)}%</td
							>
							<td class="text-white p-2 w-32"
								>{formatAsCurrency(parseFloat(liability.repaymentAmount))}</td
							>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</section>
</div>
