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

	// Goal status for the main scenario
	const goalStatus = $derived.by(() => {
		const yearReached = calculator.result.annualData.findIndex(
			(data) => data.endingValue >= calculator.target
		);

		return {
			text: yearReached === -1 ? 'Not achieved' : `Achieved in ${yearReached + 1} years`,
			achieved: yearReached !== -1
		};
	});
</script>

<svelte:head>
	<title>Savings Growth Calculator</title>
	<meta name="description" content="Estimate your future savings and time to reach your goal" />
</svelte:head>

<main class="container">
	<div class="flex justify-between items-center">
		<h1 class="mb-4 calculator-heading">Savings Growth Calculator</h1>
		<CalculatorActions
			filename={'savings-calculator.csv'}
			getCsvData={() => calculator.getTableData()}
		/>
	</div>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />

		<div class="w-full space-y-4">
			<div class="card">
				<div class="flex gap-2 flex-col md:flex-row md:justify-between w-full mb-2">
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

				<div class="space-y-4">
					<div class="flex gap-8 flex-wrap">
						{@render metric(
							'Value after ' + calculator.years + ' Years',
							calculator.result.totalValue
						)}
						{@render metric('Total Contributions', calculator.result.totalContributions)}
						{@render metric('Total Interest', calculator.result.totalInterest)}
					</div>
					<div class="flex gap-8 flex-wrap">
						<div>
							<p class="text-muted-foreground">
								{calculator.fireMode ? 'FIRE' : 'Savings Goal'} Status
							</p>
							<div class="flex items-center gap-2">
								{#if goalStatus.achieved && calculator.fireMode}
									<Flame class="size-5 text-emerald-500" />
								{:else if goalStatus.achieved}
									<CheckCircle class="size-5 text-emerald-500" />
								{:else}
									<XCircle class="size-5 text-rose-500" />
								{/if}
								<p class="text-xl md:text-2xl font-semibold">
									{goalStatus.text}
								</p>
							</div>
						</div>
						{#if calculator.fireMode}
							{@render metric('FIRE Target', calculator.fireNumber)}
						{/if}
					</div>
				</div>

				<Tabs.Root value={selectedView} class="my-4">
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
		<h2 class="text-muted-foreground">{label}</h2>
		<p class="font-semibold text-xl md:text-2xl">
			{formatAsCurrency(value)}
		</p>
	</div>
{/snippet}
