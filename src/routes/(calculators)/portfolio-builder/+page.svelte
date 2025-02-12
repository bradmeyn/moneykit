<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import InvestmentItem from './_components/InvestmentItem.svelte';
	import { setPortfolioState } from './calculator.svelte';

	const calc = setPortfolioState();
</script>

<svelte:head>
	<title>MoneyKit | Portfolio Builder</title>
</svelte:head>

<main class="flex flex-col flex-1 container text-white max-w-[1200px]">
	<div class="flex justify-between items-center mb-8">
		<h1>Portfolio Builder</h1>

		<div class=" flex gap-2">
			<!-- <DownloadButton filename="budget.csv" data={budget.getDownloadData()} /> -->
		</div>
	</div>
	<div class=" w-full">
		<div class="md:w-[200px] mb-2">
			<CurrencyInput
				id="portfolio-value"
				bind:value={calc.portfolioValue}
				label="Portfolio Value"
			/>
		</div>
		<div class=" w-full">
			<table class="w-full rounded-lg overflow-hidden">
				<thead>
					<tr>
						<th class="text-left border-t-transparent">Code</th>
						<th class="text-left border-t-transparent">Name</th>
						<th class="text-right border-t-transparent">Value</th>
						<th class="text-right border-t-transparent">Allocation</th>
						<th class="text-right border-t-transparent"></th>
					</tr>
				</thead>
				<tbody>
					{#each calc.portfolio as holding}
						<InvestmentItem {holding} />
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<td colspan="2" class="text-lg border-t-transparent">Total</td>
						<td
							class="text-right border-t-transparent text-lg"
							class:text-red-500={calc.totalWeight > 1}
						>
							{formatAsCurrency(calc.total)}
						</td>
						<td
							class="text-right border-t-transparent text-lg"
							class:text-red-500={calc.totalWeight > 1}
						>
							{formatAsPercentage(calc.totalWeight)}
						</td>
						<td class="text-right border-t-transparent"></td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</main>
