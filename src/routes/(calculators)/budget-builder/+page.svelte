<script lang="ts">
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import BudgetTable from './_components/BudgetTable.svelte';
	import BudgetAccordion from './_components/BudgetAccordion.svelte';
	import { calculateCategoryTotal, downloadCsv, setBudgetState } from './budget.svelte';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import { FREQUENCIES } from '$lib/constants/frequencies';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';

	const budget = setBudgetState();

	let chartData = $derived(
		budget.expenseByCategory.map((item) => ({
			label: item.category,
			value: item.total
		}))
	);

	function handleDownload() {
		downloadCsv(budget.budgetItems);
	}
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

			<Button size="icon" variant="outline" class="hover:bg-primary" onclick={handleDownload}
				><Download /></Button
			>
		</div>
	</div>
	<div class="flex flex-col lg:flex-row gap-4 w-full">
		<div class="flex-1 flex gap-4 flex-col">
			<div class="card">
				{@render total('Income', budget.totalIncome)}

				<div class="mt-2">
					{#each budget.incomeCategories as category}
						<BudgetAccordion
							type="Income"
							{category}
							categoryTotal={calculateCategoryTotal(budget.income, category, budget.frequency)}
						>
							<BudgetTable items={budget.income.filter((item) => item.category === category)} />
						</BudgetAccordion>
					{/each}
				</div>
			</div>
			<div class="card">
				{@render total('Expenses', budget.totalExpenses)}
				<div class="mt-2">
					{#each budget.expenseCategories as category}
						<BudgetAccordion
							type="Expense"
							{category}
							categoryTotal={calculateCategoryTotal(budget.expenses, category, budget.frequency)}
						>
							<BudgetTable items={budget.expenses.filter((item) => item.category === category)} />
						</BudgetAccordion>
					{/each}
				</div>
			</div>

			<div class="card">
				{@render total('Savings', budget.totalSavings)}
				<div class="mt-2">
					{#each budget.savingsCategories as category}
						<BudgetAccordion
							type="Savings"
							{category}
							categoryTotal={calculateCategoryTotal(budget.savings, category, budget.frequency)}
						>
							<BudgetTable items={budget.savings.filter((item) => item.category === category)} />
						</BudgetAccordion>
					{/each}
				</div>
			</div>
			<div class="card">
				{@render total('Unallocated', budget.unallocated)}
			</div>
		</div>

		<div class="flex flex-row lg:flex-col flex-wrap gap-4 min-w-[300px]">
			<div class="card flex-1">
				<h2 class="card-heading">Category Breakdown</h2>
				<DoughnutChart data={chartData} formatter={formatAsCurrency} />
				<LegendList data={chartData} formatter={formatAsCurrency} />
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
	</div>
</main>

{#snippet total(title: string, total: number)}
	<h2 class="card-heading">{title}</h2>
	<div class="flex items-baseline gap-2">
		<p class={`text-2xl font-semibold  ${total < 0 ? 'text-red-400' : ''}`}>
			{formatAsCurrency(total)}
		</p>
		<p class="text-muted text-lg font-medium">
			/{FREQUENCIES[budget.frequency].singular}
		</p>
	</div>
{/snippet}
