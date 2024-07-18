<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import BudgetTable from './_components/BudgetTable.svelte';
	import BudgetCategory from './_components/BudgetCategory.svelte';
	import { budget } from './store';
	import BudgetAdd from './_components/BudgetAdd.svelte';
	import BarChart from '$lib/components/charts/BarChart.svelte';

	$: chartData = $budget.expenseByCategory.map((item) => ({
		label: item.category,
		value: item.total
	}));
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Budget</h1>

	<div class="flex flex-col lg:flex-row gap-4 w-full">
		<div class="flex-1 max-w-[800px] flex gap-4 flex-col">
			<Card>
				<h2 class="text-sm font-semibold text-brand-light">Income</h2>
				<p class="text-2xl font-semibold mb-2">
					{formatAsCurrency($budget.annualIncome)}
				</p>

				<div class="mb-2">
					{#each $budget.incomeCategories as category}
						<BudgetCategory
							{category}
							categoryTotal={$budget.income
								.filter((item) => item.category === category)
								.reduce((acc, i) => acc + i.amount * i.frequency, 0)}
						>
							<BudgetTable
								slot="table"
								items={$budget.income.filter((item) => item.category === category)}
							/>
						</BudgetCategory>
					{/each}
				</div>
			</Card>
			<Card>
				<h2 class="text-sm font-semibold text-brand-light">Expenses</h2>
				<p class="text-2xl font-semibold mb-2">
					{formatAsCurrency($budget.annualExpenses)}
				</p>

				<div>
					{#each $budget.expenseCategories as category}
						<BudgetCategory
							{category}
							categoryTotal={$budget.expenses
								.filter((item) => item.category === category)
								.reduce((acc, i) => acc + i.amount * i.frequency, 0)}
						>
							<BudgetTable
								slot="table"
								items={$budget.expenses.filter((item) => item.category === category)}
							/>
						</BudgetCategory>
					{/each}
				</div>
			</Card>
			<Card>
				<h2 class="text-sm font-semibold text-brand-light">Savings</h2>
				<p class="text-2xl font-semibold mb-2">
					{formatAsCurrency($budget.annualSavings)}
				</p>
				<div>
					{#each $budget.savingsCategories as category}
						<BudgetCategory
							{category}
							categoryTotal={$budget.savings
								.filter((item) => item.category === category)
								.reduce((acc, i) => acc + i.amount * i.frequency, 0)}
						>
							<BudgetTable
								slot="table"
								items={$budget.savings.filter((item) => item.category === category)}
							/>
						</BudgetCategory>
					{/each}
				</div>
			</Card>
		</div>

		<div class="flex flex-row lg:flex-col gap-4">
			<Card classes="h-fit">
				<DoughnutChart data={chartData} formatter={formatAsCurrency} />
				<LegendList data={chartData} formatter={formatAsCurrency} />
			</Card>
			<Card classes="h-fit">
				<BarChart
					data={[
						{
							label: 'Income',
							value: $budget.annualIncome
						},
						{
							label: 'Expenses',
							value: $budget.annualExpenses
						},
						{
							label: 'Savings',
							value: $budget.annualSavings
						}
					]}
					formatter={formatAsCurrency}
				/>
				<LegendList data={chartData} formatter={formatAsCurrency} />
			</Card>
		</div>
	</div>
</main>
