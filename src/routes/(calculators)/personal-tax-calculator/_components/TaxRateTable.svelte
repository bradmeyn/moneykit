<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Table from '$lib/components/ui/table';
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
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Taxable Income</Table.Head>
								<Table.Head>Rate</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each INCOME_TAX_BRACKETS as { min, max, rate }}
								<Table.Row>
									<Table.Cell class="w-60">
										{formatAsCurrency(min, false)}{formatMax(max)}
									</Table.Cell>
									<Table.Cell>{formatAsPercentage(rate)}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>

				<div>
					<h3 class="font-semibold px-2">Medicare Levy</h3>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Taxable Income</Table.Head>
								<Table.Head>Rate</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each MEDICARE_LEVY as { min, max, rate }}
								<Table.Row>
									<Table.Cell class="w-60">
										{formatAsCurrency(min, false)}{formatMax(max)}
									</Table.Cell>
									<Table.Cell>
										{#if rate === 0.1}
											{formatAsPercentage(rate)} of income between thresholds
										{:else}
											{formatAsPercentage(rate)}
										{/if}
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>

				<div>
					<h3 class="font-semibold px-2">Medicare Levy Surcharge</h3>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Taxable Income</Table.Head>
								<Table.Head>Rate</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each MEDICARE_LEVY_SURCHARGE as { min, max, rate }}
								<Table.Row>
									<Table.Cell class="w-60">
										{formatAsCurrency(min, false)}{formatMax(max)}
									</Table.Cell>
									<Table.Cell>{formatAsPercentage(rate)}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</Tabs.Content>

		<Tabs.Content value="help" class="mt-4">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="text-left">Taxable Income</Table.Head>
						<Table.Head class="text-right">Repayment rate</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each HELP_REPAYMENT_RATES as { min, max, rate }}
						<Table.Row>
							<Table.Cell>
								{formatAsCurrency(min, false)}{formatMax(max)}
							</Table.Cell>
							<Table.Cell class="text-right">
								{formatAsPercentage(rate)}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
