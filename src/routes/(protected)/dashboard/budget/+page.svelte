<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import BudgetTable from './_component/BudgetTable.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import LegendList from '$lib/components/charts/LegendList.svelte';

	const income = [
		{ name: 'Salary', value: 2100, frequency: 26, category: 'Salary/wages' },
		{ name: 'Bonus', value: 500, frequency: 1, category: 'Salary/wages' },
		{ name: 'Interest', value: 100, frequency: 12, category: 'Investments' }
	];

	const expenses = [
		{ name: 'Rent', value: 1000, frequency: 12, category: 'Housing' },
		{ name: 'Groceries', value: 200, frequency: 52, category: 'Food' },
		{ name: 'Car payment', value: 300, frequency: 12, category: 'Transportation' }
	];

	const savings = [
		{ name: 'Emergency Fund', value: 1000, frequency: 12, category: 'Savings' },
		{ name: 'Retirement', value: 500, frequency: 12, category: 'Savings' }
	];

	function calculateTotal(items) {
		return items.reduce((acc, i) => acc + i.value * i.frequency, 0);
	}

	const incomeTotal = calculateTotal(income);
	const expensesTotal = calculateTotal(expenses);
	const savingsTotal = calculateTotal(savings);

	const chartData = expenses.map((expense) => ({
		label: expense.category,
		value: expense.value * expense.frequency
	}));

	const overviewData = [
		{ label: 'Income', value: incomeTotal },
		{ label: 'Expenses', value: expensesTotal },
		{ label: 'Savings', value: savingsTotal }
	];
</script>

<div class="space-y-6 w-full mx-auto max-w-5xl">
	<div class="flex items-center justify-between">
		<h1 class="mb-4 text-white">Budget</h1>
	</div>

	<div class="flex flex-col lg:flex-row gap-4 w-full">
		<div class="gap-4 flex flex-col flex-1">
			<BudgetTable title="Income" items={income} total={incomeTotal} />
			<BudgetTable title="Expenses" items={expenses} total={expensesTotal} />
			<BudgetTable title="Savings" items={savings} total={savingsTotal} />
		</div>

		<div class="flex flex-row lg:flex-col flex-wrap gap-4">
			<div class="flex-1 card">
				<h2>Expense Categories</h2>
				<DoughnutChart data={chartData} formatter={formatAsCurrency} theme={'colourful'} />
				<LegendList data={chartData} formatter={formatAsCurrency} theme={'colourful'} />
			</div>
			<div class="flex-1 card">
				<h2>Overview</h2>
				<BarChart data={overviewData} formatter={formatAsCurrency} />
			</div>
		</div>
	</div>
</div>
