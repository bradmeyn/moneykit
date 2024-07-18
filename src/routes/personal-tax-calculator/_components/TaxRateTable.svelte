<script lang="ts">
	import type { TaxRateConfiguration } from '../../portfolio-builder/types';
	import { formatAsPercentage, formatAsCurrency } from '$lib/utils/formatters';
	import Card from '$lib/components/ui/Card.svelte';

	export let taxRates: TaxRateConfiguration;

	function formatMax(max: number) {
		return max === Infinity ? '+' : ` - ${formatAsCurrency(max, false)}`;
	}
</script>

<section class="w-full grid grid-cols-1 max-w-[600px] gap-10">
	<Card>
		<h3>Income Tax</h3>
		<table>
			<thead>
				<th>Taxable Income</th>
				<th>Rate</th>
			</thead>
			<tbody>
				{#each taxRates.incomeTax.brackets as { min, max, rate }}
					<tr>
						<td>
							{formatAsCurrency(min, false)}{formatMax(max)}
						</td>
						<td>{formatAsPercentage(rate)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Card>
	<Card>
		<h3>Medicare Levy</h3>
		<table>
			<thead>
				<th>Condition</th>
				<th>Rate</th>
			</thead>
			<tbody>
				<tr>
					<td>General Rate</td>
					<td>{formatAsPercentage(taxRates.medicareLevy.rate)}</td>
				</tr>
				<!-- Iterate over offsets if needed -->
			</tbody>
		</table>
	</Card>
	<Card>
		<h3>Medicare Levy Surcharge</h3>
		<table>
			<thead>
				<th>Taxable Income</th>
				<th>Rate</th>
			</thead>
			<tbody>
				{#each taxRates.medicareLevySurcharge as { min, max, rate }}
					<tr>
						<td>
							{formatAsCurrency(min, false)}{formatMax(max)}
						</td>
						<td>{formatAsPercentage(rate)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Card>
</section>
