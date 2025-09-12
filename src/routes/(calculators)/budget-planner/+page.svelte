<script lang="ts">
	import DoughnutChart from '$lib/components/charts/doughnut-chart.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import { setBudgetState } from './budget.svelte';
	import BudgetCard from './_components/budget-card.svelte';
	import ActionsMenu from './_components/actions-menu.svelte';
	import LoadBudgetAlert from './_components/load-budget-alert.svelte';

	import Button from '$ui/button/button.svelte';
	import { Save, User, Users } from 'lucide-svelte';

	const budget = setBudgetState();

	let chartData = $derived.by(() => {
		const total = budget.totalExpenses;
		let items = budget.expenseByCategory
			.map((item) => ({
				label: item.category,
				value: item.total / total
			}))
			.filter((item) => item.value !== 0);

		return items;
	});
</script>

<svelte:head>
	<title>Budget Planner | Free Budget Planner & Calculator</title>

	<!-- Primary Meta Tags -->
	<meta
		name="description"
		content="Create and manage your personal budget with our free budget planner. Track income, expenses, and savings goals with an easy-to-use budget calculator."
	/>
	<meta
		name="keywords"
		content="budget planner, budget calculator, personal budget, free budget tool, expense tracker, financial planning"
	/>
	<meta name="author" content="Your Site Name" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="Free Budget Planner & Calculator - Build Your Personal Budget"
	/>
	<meta
		property="og:description"
		content="Create and manage your personal budget with our free budget planner. Track income, expenses, and savings goals."
	/>
	<meta property="og:url" content="https://moneykit.au/budget-planner" />
	<meta property="og:image" content="https://moneykit.au/budget-preview.jpg" />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://moneykit.au/budget-planner" />
</svelte:head>

<main class="flex flex-col flex-1 mx-auto w-full px-4 md:px-6 max-w-[1200px]">
	<LoadBudgetAlert />
	<div class="flex justify-between items-center mb-2">
		<h1 class="calculator-heading">Budget Planner</h1>
		<div class="flex items-center gap-4">
			<Button
				size="sm"
				class="rounded-full"
				variant={budget.isJointBudget ? 'secondary' : 'outline'}
				onclick={() => (budget.isJointBudget = !budget.isJointBudget)}
			>
				{#if budget.isJointBudget}
					<Users /> <span>Joint</span>
				{:else}
					<User />
					<div>Personal</div>
				{/if}
			</Button>
			<div class="text-center">
				<Button
					size="sm"
					class="rounded-full"
					variant={budget.autoSaveEnabled ? 'secondary' : 'outline'}
					onclick={() => (budget.autoSaveEnabled = !budget.autoSaveEnabled)}
					aria-label="Toggle Auto Save"
				>
					<Save class={budget.autoSaveEnabled ? 'text-brand' : 'text-muted-foreground'} />
					<span class={budget.autoSaveEnabled ? 'text-white' : 'text-muted-foreground'}
						>Auto Save</span
					>
				</Button>
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
		</div>
		{#if budget.totalExpenses > 0}
			<div class="flex flex-row lg:flex-col flex-wrap gap-4 min-w-[300px] h-fit">
				<div class="card flex-1">
					<h2 class="card-heading">Spending Breakdown</h2>
					<DoughnutChart data={chartData} formatter={formatAsPercentage} />
					<LegendList data={chartData} formatter={formatAsPercentage} />
				</div>
			</div>
		{/if}
	</div>
</main>
