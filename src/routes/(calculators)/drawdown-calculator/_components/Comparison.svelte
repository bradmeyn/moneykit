<script lang="ts">
	import { results, scenarios } from '../store';
	import ComparisonChart from './ComparisonChart.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { COLOURFUL } from '$lib/constants/colours';
</script>

<section class="flex flex-col-reverse lg:flex-row gap-8">
	<div class="">
		<div class="card">
			<div class="overflow-x-auto">
				<p class="text-sm font-semibold text-brand-light">Comparison</p>
				<table class="w-full border-collapse">
					<thead>
						<tr>
							<th class="p-2 text-ui-300 text-sm">Scenario</th>
							{#each $results as result, i}
								<th class="p-2 text-left">
									<div class="flex items-center gap-2">
										<div class="w-3 h-3 rounded-full" style="background-color: {COLOURFUL[i]}"></div>
										<div class="text-white text-nowrap text-base">Scenario {result.id}</div>
									</div>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="p-2 text-ui-300 text-sm">Principle</td>
							{#each $results as result, i}
								<td class="p-2 text-nowrap"
									>{formatAsCurrency(result.annualData[0].startingBalance)}</td
								>
							{/each}
						</tr>
						<tr>
							<td class="p-2 text-ui-300 text-sm">Drawdown (p.a.)</td>
							{#each $results as result}
								<td class="p-2 text-nowrap"
									>{formatAsCurrency(result.annualData[0].withdrawal)} p.a.</td
								>
							{/each}
						</tr>
						<tr>
							<td class="p-2 text-ui-300 text-sm">Interest (p.a.)</td>
							{#each $results as _, i}
								<td class="p-2">{formatAsPercentage($scenarios[i].interestRate)}</td>
							{/each}
						</tr>
						<tr>
							<td class="p-2 text-ui-300 text-sm">Duration</td>
							{#each $results as result}
								<td class="p-2">{result.annualData.length} years</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="w-full card">
		<p class="text-sm font-semibold text-brand-light">Duration</p>
		<div class="flex items-center gap-6">
			{#each $results as result, i}
				<div class="flex justify-between mb-3">
					<div class="flex items-center gap-2">
						<div class="size-3 md:size-4 rounded-full" style="background-color: {COLOURFUL[i]}"></div>
						<p class="font-semibold text-xl md:text-2xl">
							{result.yearsLasted} years
						</p>
					</div>
				</div>
			{/each}
		</div>
		<div>
			<!-- <Legend class="flex justify-center" {labels} theme={'colourful'} /> -->
			<ComparisonChart formatter={formatAsCurrency} theme={'colourful'} results={$results} />
		</div>
	</div>
</section>
