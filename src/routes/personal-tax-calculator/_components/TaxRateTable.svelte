<script lang="ts">
	import { formatAsPercentage, formatAsCurrency } from '$lib/utils/formatters';
	import Card from '$lib/components/ui/Card.svelte';
	import { INCOME_TAX_BRACKETS, MEDICARE_LEVY, MEDICARE_LEVY_SURCHARGE } from '../taxRates';

	function formatMax(max: number) {
		return max === Infinity ? '+' : ` - ${formatAsCurrency(max, false)}`;
	}
</script>

<div class="space-y-4">
	<div>
		<h3 class="font-semibold px-2">Income Tax</h3>
		<table>
			<thead>
				<th>Taxable Income</th>
				<th>Rate</th>
			</thead>
			<tbody>
				{#each INCOME_TAX_BRACKETS as { min, max, rate }}
					<tr>
						<td class="w-60">
							{formatAsCurrency(min, false)}{formatMax(max)}
						</td>
						<td>{formatAsPercentage(rate)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div>
		<h3 class="font-semibold px-2">Medicare Levy</h3>
		<table>
			<thead>
				<th>Taxable Income</th>
				<th>Rate</th>
			</thead>
			<tbody>
				{#each MEDICARE_LEVY as { min, max, rate }}
					<tr>
						<td class="w-60">
							{formatAsCurrency(min, false)}{formatMax(max)}
						</td>
						{#if rate === 0.1}
							<td>{formatAsPercentage(rate)} of income between thresholds</td>
						{:else}
							<td>{formatAsPercentage(rate)}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div>
		<h3 class="font-semibold px-2">Medicare Levy Surcharge</h3>
		<table>
			<thead>
				<th>Taxable Income</th>
				<th>Rate</th>
			</thead>
			<tbody>
				{#each MEDICARE_LEVY_SURCHARGE as { min, max, rate }}
					<tr>
						<td class="w-60">
							{formatAsCurrency(min, false)}{formatMax(max)}
						</td>
						<td>{formatAsPercentage(rate)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
