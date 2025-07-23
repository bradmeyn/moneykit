<script lang="ts">
	import DoughnutChart from '$lib/components/charts/doughnut-chart.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { setBudgetState } from './budget.svelte';
	import BarChart from '$lib/components/charts/bar-chart.svelte';
	import FrequencySelect from '$lib/components/inputs/frequency-select.svelte';
	import BudgetCard from './_components/budget-card.svelte';
	const budget = setBudgetState();
	import ActionsMenu from './_components/actions-menu.svelte';

	let chartData = $derived.by(() => {
		const total = budget.totalExpenses + budget.totalSavings;
		let items = budget.expenseByCategory
			.map((item) => ({
				label: item.category,
				value: item.total / total
			}))
			.filter((item) => item.value !== 0);

		const savingsValue = budget.totalSavings / total;
		if (savingsValue !== 0) {
			items.push({
				label: 'Savings',
				value: savingsValue
			});
		}
		return items;
	});
</script>

<svelte:head>
	<title>Budget Builder</title>
</svelte:head>

<main class="flex flex-col flex-1 container text-white max-w-[1200px]">
	<div class="flex justify-between items-center mb-2">
		<h1>Budget Builder</h1>
		<div class=" flex gap-2">
			<div class="min-w-[150px]">
				<FrequencySelect
					name="budget-frequency"
					id="budget-frequency"
					bind:value={budget.frequency}
				/>
			</div>
			<ActionsMenu />
		</div>
	</div>
	<div class="flex flex-col lg:flex-row gap-4 w-full">
		<div class="flex-1 flex gap-4 flex-col">
			<BudgetCard
				type="income"
				categories={budget.categories['income']}
				total={budget.totalIncome}
				items={budget.income}
			/>
			<BudgetCard
				type="expense"
				categories={budget.categories['expense']}
				total={budget.totalExpenses}
				items={budget.expenses}
			/>
			<BudgetCard
				type="savings"
				categories={budget.categories['savings']}
				total={budget.totalSavings}
				items={budget.savings}
			/>
		</div>
		{#if budget.totalExpenses + budget.totalSavings > 0}
			<div class="flex flex-row lg:flex-col flex-wrap gap-4 min-w-[300px] h-fit">
				<div class="card flex-1">
					<h2 class="card-heading">Spending Breakdown</h2>
					<DoughnutChart data={chartData} formatter={formatAsPercentage} />
					<LegendList data={chartData} formatter={formatAsPercentage} />
				</div>

				<div class="flex-1 card">
					<h2 class="card-heading">Overview</h2>
					<BarChart
						data={[
							{
								label: 'Income',
								value: budget.totalIncome
							},
							{
								label: 'Expenses',
								value: budget.totalExpenses
							},
							{
								label: 'Savings',
								value: budget.totalSavings
							}
						]}
						formatter={formatAsCurrency}
					/>
				</div>
			</div>
		{/if}
	</div>
</main>
