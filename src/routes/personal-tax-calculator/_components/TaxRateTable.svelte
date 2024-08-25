<script lang="ts">
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import { formatAsPercentage, formatAsCurrency } from '$lib/utils/formatters';
	import {
		HELP_REPAYMENT_RATES,
		INCOME_TAX_BRACKETS,
		MEDICARE_LEVY,
		MEDICARE_LEVY_SURCHARGE
	} from '../taxRates';

	function formatMax(max: number) {
		return max === Infinity ? '+' : ` - ${formatAsCurrency(max, false)}`;
	}

	let options = [
		{ label: 'Income', value: 'income' },
		{ label: 'HELP', value: 'help' }
	];
	let selectedView = 'income';
</script>

<div class="flex justify-between items-center">
	<h2 class="text-sm font-semibold text-brand-light mb-2">Rates</h2>
	<Tabs {options} bind:selectedView />
</div>
{#if selectedView === 'income'}
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
{:else if selectedView === 'help'}
	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left">Taxable Income</th>

				<th class="text-right">Repayment rate</th>
			</tr>
		</thead>
		<tbody>
			{#each HELP_REPAYMENT_RATES as { min, max, rate }, i}
				<tr>
					<td>
						{formatAsCurrency(min, false)}{formatMax(max)}
					</td>

					<td class="text-right">
						{formatAsPercentage(rate)}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
