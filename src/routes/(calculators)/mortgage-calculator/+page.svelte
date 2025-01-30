<script lang="ts">
	import { getCalculatorState, setCalculatorState } from './calculator.svelte';
	import Inputs from './_components/Inputs.svelte';
	import MortgageChart from './_components/MortgageChart.svelte';
	import MortgageSchedule from './_components/MortgageSchedule.svelte';
	import { formatAsCurrency } from '$utils/formatters';
	import { FREQUENCIES } from '$constants/frequencies';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';
	setCalculatorState();
	let calc = getCalculatorState();

	let selectedView = $state('chart');
</script>

<svelte:head>
	<title>MoneyKit | Mortgage Repayment Calculator</title>
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Mortgage Repayment Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />

		<div class="w-full">
			<div>
				<div class="card">
					<div class="flex justify-between mb-4">
						<div>
							<h2 class="card-heading">{FREQUENCIES[calc.frequency].label} Repayment</h2>
							<p class="text-2xl font-semibold">
								{formatAsCurrency(calc.projection.repayment + calc.extraRepayments)}
							</p>
							{#if calc.extraRepayments > 0}
								<small class="text-muted">
									Includes additional repayment of {formatAsCurrency(calc.extraRepayments)}
								</small>
							{/if}
						</div>
						<div class="flex items-center gap-2">
							<Tabs.Root
								value={selectedView}
								onValueChange={(value) => (selectedView = value)}
								class="w-[200px]"
							>
								<Tabs.List class="grid w-full grid-cols-2">
									<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
									<Tabs.Trigger value="table">Table</Tabs.Trigger>
								</Tabs.List>
							</Tabs.Root>
							<Button size="icon" variant="outline" class="hover:bg-primary"><Download /></Button>
						</div>
					</div>

					<div class="flex gap-8">
						{#if calc.loanType === 'Interest Only'}
							<div>
								<p class="text-muted">Interest Only Repayment</p>
								<p class="text-xl font-semibold">
									{formatAsCurrency(calc.projection.ioRepayment)}
								</p>
							</div>
						{/if}

						<div>
							<p class="text-muted">Total Repayments</p>
							<p class="text-xl font-semibold">
								{formatAsCurrency(calc.projection.totalRepayment)}
							</p>
						</div>

						<div>
							<p class="text-muted">Total Interest</p>
							<p class="text-xl font-semibold">
								{formatAsCurrency(calc.projection.totalInterest)}
							</p>
						</div>
					</div>

					<Tabs.Root value={selectedView}>
						<Tabs.Content value="chart" class="m-0">
							<MortgageChart />
						</Tabs.Content>

						<Tabs.Content value="table" class="m-0">
							<MortgageSchedule />
						</Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
		</div>
	</section>
</main>
