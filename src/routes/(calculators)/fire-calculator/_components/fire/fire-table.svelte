<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import ScrollArea from '$ui/scroll-area/scroll-area.svelte';
	import { getCalculatorState } from '../../calculator.svelte';

	let calc = getCalculatorState();
</script>

<ScrollArea class="h-[600px] w-full">
	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left p-2">Age</th>
				<th class="text-right p-2">Investment Value</th>
				<th class="text-right p-2">FIRE Target</th>
				<th class="text-right p-2">Expenses</th>
				{#if calc.secondaryIncome > 0}
					<th class="text-right p-2">Secondary Income</th>
					<th class="text-right p-2">Net Withdrawal</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each calc.calculationData as row}
				<tr class="border-t border-gray-700">
					<td class="p-2">{row.age}</td>
					<td class="text-right p-2">{formatAsCurrency(row.investmentValue)}</td>
					<td class="text-right p-2">{formatAsCurrency(row.fireTarget)}</td>
					<td class="text-right p-2">{row.withdrawal ? formatAsCurrency(row.withdrawal) : '-'}</td>
					{#if calc.secondaryIncome > 0}
						<td class="text-right p-2"
							>{row.secondaryIncome ? formatAsCurrency(row.secondaryIncome) : '-'}</td
						>
						<td class="text-right p-2"
							>{row.withdrawal ? formatAsCurrency(row.withdrawal - row.secondaryIncome) : '-'}</td
						>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</ScrollArea>
