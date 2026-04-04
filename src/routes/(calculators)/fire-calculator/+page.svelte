<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Flame, XCircle } from 'lucide-svelte';
	import Inputs from './_components/fire-inputs.svelte';
	import GrowthChart from '../savings-calculator/_components/growth-chart.svelte';
	import ScrollableTable from '$ui/scrollable-table.svelte';
	import CalculatorActions from '$lib/components/calculator-actions.svelte';

	setCalculatorState();
	let calculator = getCalculatorState();
	let selectedView = $state('chart');
</script>

<svelte:head>
	<title>FIRE Calculator | BudgetKit</title>
	<meta
		name="description"
		content="Calculate how much you need to retire early based on your annual expenses and safe withdrawal rate."
	/>
</svelte:head>

<main class="container">
	<div class="flex justify-end items-center mb-4">
		<CalculatorActions
			filename={'fire-calculator.csv'}
			getCsvData={() => calculator.getTableData()}
		/>
	</div>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />

		<div class="w-full min-w-0 space-y-4">
			<div class="card">
				<div class="flex gap-2 flex-col md:flex-row md:justify-between w-full mb-4">
					<h2 class="card-heading">Outcome</h2>
					<Tabs.Root
						value={selectedView}
						onValueChange={(value) => (selectedView = value)}
						class="w-full md:w-fit"
					>
						<Tabs.List class="w-full min-w-48">
							<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
							<Tabs.Trigger value="table">Table</Tabs.Trigger>
						</Tabs.List>
					</Tabs.Root>
				</div>

				<div class="space-y-4 mb-4">
					<div class="flex gap-8 flex-wrap">
						{@render metric(
							'Value after ' + calculator.years + ' years',
							calculator.result.totalValue
						)}
						{@render metric('Total Contributions', calculator.result.totalContributions)}
						{@render metric('Total Interest', calculator.result.totalInterest)}
					</div>

					<div class="flex gap-8 flex-wrap items-start">
						{@render metric('FIRE Number', calculator.fireNumber)}

						<div>
							<p class="text-muted-foreground mb-1">Time to FIRE</p>
							{#if calculator.yearsToFire !== null}
								<div class="flex items-center gap-2">
									<Flame class="size-6 text-emerald-500 shrink-0" />
									<div>
										<p class="text-3xl md:text-4xl font-bold leading-none">
											{calculator.yearsToFire} <span class="text-xl font-semibold text-muted-foreground">yrs</span>
										</p>
										<p class="text-sm text-muted-foreground mt-0.5">
											Retire in {new Date().getFullYear() + calculator.yearsToFire}
										</p>
									</div>
								</div>
							{:else}
								<div class="flex items-center gap-2">
									<XCircle class="size-6 text-rose-500 shrink-0" />
									<p class="text-xl font-semibold text-muted-foreground">Not reached</p>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<Tabs.Root value={selectedView}>
					<Tabs.Content value="chart" class="m-0">
						<GrowthChart
							annualData={calculator.result.annualData}
							savingsGoal={calculator.fireNumber}
							bandData={calculator.bandData}
						/>
					</Tabs.Content>
					<Tabs.Content value="table" class="m-0">
						<ScrollableTable data={calculator.getTableData()} />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</section>
</main>

{#snippet metric(label: string, value: number)}
	<div>
		<p class="text-muted-foreground">{label}</p>
		<p class="font-semibold text-xl md:text-2xl">{formatAsCurrency(value)}</p>
	</div>
{/snippet}
