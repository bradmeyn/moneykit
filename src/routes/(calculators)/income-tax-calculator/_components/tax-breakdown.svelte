<script lang="ts">
	import DoughnutChart from '$lib/components/charts/doughnut-chart.svelte';
	import { getCalculatorState } from '../calculator.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { COLOURS } from '$lib/constants/colours';

	let calc = getCalculatorState();
</script>

{#if calc.chartData.length > 0}
	<div>
		<DoughnutChart data={calc.chartData} formatter={formatAsCurrency} />

		<ul class="mt-3 space-y-1.5">
			{#each calc.chartData as item, i (item.label)}
				<li class="flex items-center justify-between text-sm">
					<span class="flex items-center gap-2">
						<span
							class="inline-block size-2.5 rounded-full shrink-0"
							style="background-color: {COLOURS[i % COLOURS.length]}"
						></span>
						<span class="text-muted-foreground">{item.label}</span>
					</span>
					<span class="font-medium">{formatAsCurrency(item.value)}</span>
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<p class="text-muted-foreground text-sm">Enter your income to see a breakdown.</p>
{/if}
