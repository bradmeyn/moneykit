<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { CheckCircle, Flame, XCircle } from 'lucide-svelte';
	import Inputs from './_components/savings-inputs.svelte';
	import GrowthChart from './_components/growth-chart.svelte';
	import ScrollableTable from '$ui/scrollable-table.svelte';
	import CalculatorActions from '$lib/components/calculator-actions.svelte';

	setCalculatorState();
	let calculator = getCalculatorState();
	let selectedView = $state('chart');
</script>

<svelte:head>
	<title>Savings & FIRE Calculator | MoneyKit</title>
	<meta
		name="description"
		content="Calculate your savings growth, reach your financial goals, or plan your path to FIRE — Financial Independence, Retire Early."
	/>
</svelte:head>

<main class="container">
	<div class="flex justify-end items-center mb-4">
		<CalculatorActions
			filename={'savings-calculator.csv'}
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
						{#if calculator.fireMode}
							{@render metric('FIRE Number', calculator.fireNumber)}
						{:else}
							{@render metric('Savings Goal', calculator.savingsGoal)}
						{/if}

						<div>
							<p class="text-muted-foreground">{calculator.fireMode ? 'FIRE' : 'Goal'} Status</p>
							<div class="flex items-center gap-2 mt-0.5">
								{#if calculator.isGoalAchieved && calculator.fireMode}
									<Flame class="size-5 text-emerald-500 shrink-0" />
								{:else if calculator.isGoalAchieved}
									<CheckCircle class="size-5 text-emerald-500 shrink-0" />
								{:else}
									<XCircle class="size-5 text-rose-500 shrink-0" />
								{/if}
								<p class="text-xl md:text-2xl font-semibold">
									{calculator.yearsToGoal !== null
										? `Achieved in ${calculator.yearsToGoal} years`
										: 'Not achieved'}
								</p>
							</div>
						</div>
					</div>
				</div>

				<Tabs.Root value={selectedView}>
					<Tabs.Content value="chart" class="m-0">
						<GrowthChart
							annualData={calculator.result.annualData}
							savingsGoal={calculator.target}
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
