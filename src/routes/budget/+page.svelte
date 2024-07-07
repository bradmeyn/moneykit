<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import DoughnutChart from '$lib/components/charts/DoughnutChart.svelte';
	import type { BudgetItem as Item } from './types';
	import BudgetTable from './_components/BudgetTable.svelte';
	import BudgetAdd from './_components/BudgetAdd.svelte';

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
			name: 'Rent/Mortgage',
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
		},
		{
			id: 4,
			name: 'Fuel',
			amount: 50,
			category: 'Car',
			frequency: 52
		},
		{
			id: 5,
			name: 'Utilities',
			amount: 100,
			category: 'Utilities',
			frequency: 12
		},
		{
			id: 6,
			name: 'Insurance',
			amount: 50,
			category: 'Insurance',
			frequency: 12
		},
		{
			id: 7,
			name: 'Phone',
			amount: 50,
			category: 'Phone',
			frequency: 12
		},
		{
			id: 8,
			name: 'Internet',
			amount: 50,
			category: 'Internet',
			frequency: 12
		},
		{
			id: 9,
			name: 'Streaming Services',
			amount: 50,
			category: 'Entertainment',
			frequency: 12
		},
		{
			id: 10,
			name: 'Eating Out',
			amount: 50,
			category: 'Food',
			frequency: 12
		},
		{
			id: 11,
			name: 'Clothing',
			amount: 50,
			category: 'Clothing',
			frequency: 12
		},
		{
			id: 12,
			name: 'Personal Care',
			amount: 50,
			category: 'Personal Care',
			frequency: 12
		},
		{
			id: 13,
			name: 'Gifts',
			amount: 50,
			category: 'Gifts',
			frequency: 12
		},
		{
			id: 14,
			name: 'Donations',
			amount: 50,
			category: 'Donations',
			frequency: 12
		},
		{
			id: 15,
			name: 'Miscellaneous',
			amount: 50,
			category: 'Miscellaneous',
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
				<h2 class="text-sm font-semibold text-brand-light">Income</h2>

				<BudgetTable items={income} />
			</Card>
			<Card>
				<h2 class="text-sm font-semibold text-brand-light">Expenses</h2>

				<BudgetTable items={expenses} />
			</Card>

			<Card>
				<h2 class="text-sm font-semibold text-brand-light">Savings</h2>

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
