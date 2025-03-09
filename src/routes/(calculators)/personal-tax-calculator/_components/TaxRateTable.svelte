<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
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

	let selectedView = $state('income');
</script>

<div>
	<Tabs.Root value={selectedView} onValueChange={(value) => (selectedView = value)}>
		<div class="flex justify-between items-center">
			<h2 class="card-heading">Rates</h2>
			<Tabs.List class="grid grid-cols-2 w-[200px]">
				<Tabs.Trigger value="income">Income</Tabs.Trigger>
				<Tabs.Trigger value="help">HELP</Tabs.Trigger>
			</Tabs.List>
		</div>
		<Tabs.Content value="income" class="mt-4">
			<div class="space-y-4">
				<div>
					<h3 class="font-semibold px-2">Income Tax</h3>
					<table>
						<thead>
							<tr>
								<th>Taxable Income</th>
								<th>Rate</th>
							</tr>
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
							<tr>
								<th>Taxable Income</th>
								<th>Rate</th>
							</tr>
						</thead>
						<tbody>
							{#each MEDICARE_LEVY as { min, max, rate }}
								<tr>
									<td class="w-60">
										{formatAsCurrency(min, false)}{formatMax(max)}
									</td>
									<td>
										{#if rate === 0.1}
											{formatAsPercentage(rate)} of income between thresholds
										{:else}
											{formatAsPercentage(rate)}
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div>
					<h3 class="font-semibold px-2">Medicare Levy Surcharge</h3>
					<table>
						<thead>
							<tr>
								<th>Taxable Income</th>
								<th>Rate</th>
							</tr>
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
		</Tabs.Content>

		<Tabs.Content value="help" class="mt-4">
			<table>
				<thead>
					<tr>
						<th class="text-left">Taxable Income</th>
						<th class="text-right">Repayment rate</th>
					</tr>
				</thead>
				<tbody>
					{#each HELP_REPAYMENT_RATES as { min, max, rate }}
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
		</Tabs.Content>
	</Tabs.Root>
</div>
