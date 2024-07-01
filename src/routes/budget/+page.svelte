<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import BudgetItem from './_components/BudgetItem.svelte';
	import type { BudgetItem as Item } from './types';
	import ViewToggle from '$lib/components/ViewToggle.svelte';
	import BudgetTable from './_components/BudgetTable.svelte';

	let income: Item[] = [
		{
			id: 1,
			name: 'Salary',
			amount: 1000,
			category: 'Income',
			frequency: 12
		},
		{
			id: 2,
			name: 'Bonus',
			amount: 500,
			category: 'Income',
			frequency: 1
		}
	];

	let expenses: Item[] = [
		{
			id: 1,
			name: 'Rent',
			amount: 100,
			category: 'Housing',
			frequency: 12
		},
		{
			id: 2,
			name: 'Groceries',
			amount: 50,
			category: 'Food',
			frequency: 52
		},
		{
			id: 3,
			name: 'Gym Membership',
			amount: 30,
			category: 'Health',
			frequency: 12
		}
	];

	let savings: Item[] = [
		{
			id: 1,
			name: 'Emergency Fund',
			amount: 100,
			category: 'Savings',
			frequency: 12
		},
		{
			id: 2,
			name: 'Vacation Fund',
			amount: 50,
			category: 'Savings',
			frequency: 1
		},
		{
			id: 3,
			name: 'Retirement Fund',
			amount: 200,
			category: 'Savings',
			frequency: 12
		}
	];
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1>Budget</h1>

	<div class="flex flex-col md:flex-row gap-4 w-full">
		<div class="flex-1 max-w-[800px] flex gap-4 flex-col">
			<Card>
				<h2>Income</h2>
				<BudgetTable items={income} />
			</Card>
			<Card>
				<h2>Expenses</h2>
				<BudgetTable items={expenses} />
			</Card>

			<Card>
				<h2>Savings</h2>
				<BudgetTable items={savings} />
			</Card>
		</div>

		<Card classes="h-fit">
			<DoughnutChart
				labels={expenses.map((item) => item.category)}
				dataValues={expenses.map((item) => item.amount)}
				backgroundColors={['#FF6384', '#36A2EB', '#FFCE56']}
				legendPosition="bottom"
			/>
		</Card>
	</div>
</main>
