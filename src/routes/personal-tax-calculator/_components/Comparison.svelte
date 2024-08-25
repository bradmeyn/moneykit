<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { results } from '../store';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { COLOURFUL } from '$lib/constants/colours';
	import ComparisonChart from './ComparisonChart.svelte';
</script>

<section class="flex flex-col-reverse lg:flex-row gap-8">
	<Card class="w-full">
		<div class="overflow-x-auto">
			<p class="text-sm font-semibold text-brand-light">Comparison</p>
			<table class="w-full border-collapse">
				<thead>
					<tr>
						<th class="p-2 text-slate-300 text-sm">Scenario</th>
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
						<td class=" text-slate-300 text-sm">Taxable Income </td>
						{#each $results as result, i}
							<td class="p-2 text-nowrap">{formatAsCurrency(result.taxableIncome)}</td>
						{/each}
					</tr>
					<tr>
						<td class=" text-slate-300 text-sm">Income Tax</td>
						{#each $results as result, i}
							<td class="p-2 text-nowrap">{formatAsCurrency(result.incomeTax)}</td>
						{/each}
					</tr>
					<tr>
						<td class=" text-slate-300 text-sm">Low Income Offset</td>
						{#each $results as result, i}
							{#if result.lowIncomeOffset > 0}
								<td class="p-2">({formatAsCurrency(result.lowIncomeOffset, false)})</td>
							{:else}
								<td class="p-2">-</td>
							{/if}
						{/each}
					</tr>
					<tr>
						<td class="text-slate-300 text-sm">Medicare Levy</td>
						{#each $results as result}
							<td>{formatAsCurrency(result.medicareLevy, false)}</td>
						{/each}
					</tr>
					<tr>
						<td class="text-slate-300 text-sm">Medicare Levy Surcharge</td>
						{#each $results as result}
							<td>{formatAsCurrency(result.medicareLevySurcharge, false)}</td>
						{/each}
					</tr>
					<tr>
						<td class="text-slate-300 text-sm">HELP Repayment</td>
						{#each $results as result}
							<td>{formatAsCurrency(result.helpRepayment, false)}</td>
						{/each}
					</tr>
					<tr class="text-lg">
						<td class="text-slate-300 text-sm">Total Tax</td>
						{#each $results as result}
							<td>{formatAsCurrency(result.totalTax, false)}</td>
						{/each}
					</tr>
					<tr>
						<td class="text-slate-300 text-sm">Effective Rate</td>
						{#each $results as result}
							<td>{formatAsPercentage(result.totalTax / result.taxableIncome)}</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
	</Card>

	<Card class="w-full">
		<p class="text-sm font-semibold text-brand-light">Total Tax</p>
		<div class="flex items-center gap-6">
			{#each $results as result, i}
				<div class="flex justify-between mb-3">
					<div class="flex items-center gap-2">
						<div class="size-3 md:size-4 rounded-full" style="background-color: {COLOURFUL[i]}" />
						<p class="font-semibold text-xl md:text-2xl">
							{formatAsCurrency(result.totalTax, false)}
						</p>
					</div>
				</div>
			{/each}
		</div>
		<div>
			<!-- <Legend class="flex justify-center" {labels} theme={'colourful'} /> -->
			<ComparisonChart formatter={formatAsCurrency} theme={'colourful'} results={$results} />
		</div>
	</Card>
</section>
