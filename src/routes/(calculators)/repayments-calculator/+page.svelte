<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import Inputs from './_components/mortgage-inputs.svelte';
	import MortgageChart from './_components/mortgage-chart.svelte';
	import ScrollableTable from '$ui/scrollable-table.svelte';
	import CalculatorActions from '$lib/components/calculator-actions.svelte';
	import { FREQUENCIES } from '$constants/frequencies';

	setCalculatorState();
	let calc = getCalculatorState();
	let selectedView = $state('chart');
</script>

<svelte:head>
	<title>Repayments Calculator | MoneyKit</title>
	<meta
		name="description"
		content="Calculate loan repayments, total interest, and amortisation schedule for principal & interest, interest only, or variable rate loans."
	/>
</svelte:head>

<main class="container">
	<div class="flex justify-end items-center mb-4">
		<CalculatorActions
			filename="mortgage-calculator.csv"
			getCsvData={() => calc.getScheduleData()}
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
					<!-- Repayment — primary metric -->
					<div>
						<p class="text-muted-foreground text-sm">Repayment</p>
						<p class="text-3xl md:text-4xl font-bold leading-none">
							{formatAsCurrency(calc.projection.repayment + calc.extraRepayments)}
							<span class="text-lg font-normal text-muted-foreground">
								/ {FREQUENCIES[calc.frequency].singular}
							</span>
						</p>
						{#if calc.loanType === 'Interest Only'}
							<p class="text-sm text-muted-foreground mt-1">
								Interest only: {formatAsCurrency(calc.projection.ioRepayment)} / {FREQUENCIES[
									calc.frequency
								].singular}, then {formatAsCurrency(calc.projection.repayment)} / {FREQUENCIES[
									calc.frequency
								].singular}
							</p>
						{/if}
						{#if calc.extraRepayments > 0}
							<p class="text-xs text-muted-foreground mt-0.5">
								Includes {formatAsCurrency(calc.extraRepayments)} extra per {FREQUENCIES[
									calc.frequency
								].singular}
							</p>
						{/if}
					</div>

					<!-- Secondary metrics -->
					<div class="flex gap-8 flex-wrap">
						{@render metric('Total Repayments', calc.projection.totalRepayment)}
						{@render metric('Total Interest', calc.projection.totalInterest)}
						{#if calc.interestSaved > 0}
							<div>
								<p class="text-muted-foreground text-sm">Interest Saved</p>
								<p class="font-semibold text-xl md:text-2xl text-emerald-600">
									{formatAsCurrency(calc.interestSaved)}
								</p>
							</div>
						{/if}
					</div>
				</div>

				<Tabs.Root value={selectedView}>
					<Tabs.Content value="chart" class="m-0">
						<MortgageChart />
					</Tabs.Content>
					<Tabs.Content value="table" class="m-0">
						<ScrollableTable data={calc.getScheduleData()} />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</section>
</main>

{#snippet metric(label: string, value: number)}
	<div>
		<p class="text-muted-foreground text-sm">{label}</p>
		<p class="font-semibold text-xl md:text-2xl">{formatAsCurrency(value)}</p>
	</div>
{/snippet}
