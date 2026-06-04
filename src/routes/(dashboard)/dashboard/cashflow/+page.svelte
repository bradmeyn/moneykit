<script lang="ts">
	import { getBudgetItems, deleteBudgetItem } from '$lib/remotes/budget-item.remote';
	import { getSubscriptions } from '$lib/remotes/subscription.remote';
	import { formatCurrency, formatPercentage } from '$lib/utils/formatters';
	import * as Table from '$ui/table';
	import { Button } from '$ui/button';
	import { Plus } from '@lucide/svelte';
	import RowActionsMenu from '$lib/components/row-actions-menu.svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import DoughnutChart from '$lib/components/charts/doughnut-chart.svelte';
	import LegendList from '$lib/components/charts/legend-list.svelte';
	import BudgetItemDialog from './_components/budget-item-dialog.svelte';
	import type { BudgetItem } from '$db/schemas/budget';

	const [budgetItems, subscriptions] = $derived(
		await Promise.all([getBudgetItems(), getSubscriptions()])
	);

	const income = $derived(budgetItems.filter((i) => i.type === 'income'));
	const expenses = $derived(budgetItems.filter((i) => i.type === 'expense'));

	// amounts are stored in cents
	const dollars = (cents: number) => cents / 100;

	function toMonthly(amount: number, frequency: string): number {
		switch (frequency) {
			case 'weekly':
				return (amount * 52) / 12;
			case 'fortnightly':
				return (amount * 26) / 12;
			case 'quarterly':
				return amount / 3;
			case 'yearly':
				return amount / 12;
			default:
				return amount;
		}
	}

	const monthlyIncome = $derived(
		income.reduce((s, i) => s + toMonthly(dollars(i.amount), i.frequency), 0)
	);
	const monthlySubscriptions = $derived(
		subscriptions.reduce((s, sub) => s + toMonthly(dollars(sub.amount), sub.frequency), 0)
	);
	const monthlyExpenseItems = $derived(
		expenses.reduce((s, e) => s + toMonthly(dollars(e.amount), e.frequency), 0)
	);
	const monthlyExpenses = $derived(monthlyExpenseItems + monthlySubscriptions);
	const monthlyNet = $derived(monthlyIncome - monthlyExpenses);

	const flowTotal = $derived(monthlyIncome + monthlyExpenses);
	const incomePct = $derived(flowTotal > 0 ? (monthlyIncome / flowTotal) * 100 : 0);
	const expensePct = $derived(flowTotal > 0 ? (monthlyExpenses / flowTotal) * 100 : 0);

	// Expense breakdown by category (monthly), with subscriptions as a single slice
	const chartData = $derived.by(() => {
		const byCategory = new Map<string, number>();
		for (const e of expenses) {
			byCategory.set(
				e.category,
				(byCategory.get(e.category) ?? 0) + toMonthly(dollars(e.amount), e.frequency)
			);
		}
		if (monthlySubscriptions > 0) byCategory.set('Subscriptions', monthlySubscriptions);

		return [...byCategory.entries()]
			.map(([label, value]) => ({
				label,
				value: monthlyExpenses > 0 ? value / monthlyExpenses : 0
			}))
			.filter((d) => d.value > 0)
			.sort((a, b) => b.value - a.value);
	});

	function formatFrequency(f: string) {
		return f.charAt(0).toUpperCase() + f.slice(1);
	}

	let addIncomeOpen = $state(false);
	let addExpenseOpen = $state(false);
	let editItem = $state<BudgetItem | null>(null);
	let editOpen = $state(false);
	let deleteTarget = $state<BudgetItem | null>(null);
	let deleteOpen = $state(false);

	$effect(() => {
		if (!editOpen) editItem = null;
	});

	function startEdit(item: BudgetItem) {
		editItem = item;
		editOpen = true;
	}
	function startDelete(item: BudgetItem) {
		deleteTarget = item;
		deleteOpen = true;
	}
</script>

<svelte:head><title>Cashflow | MoneyKit</title></svelte:head>

<svelte:boundary>
	{#snippet pending()}
		<div class="space-y-4">
			{#each [1, 2, 3] as _}<div class="h-20 animate-pulse rounded-2xl bg-muted/60"></div>{/each}
		</div>
	{/snippet}

	<div class="space-y-6">
		<div>
			<h1 class="heading-primary">Cashflow</h1>
			<p class="mt-1 text-sm text-muted-foreground">Monthly income vs expenses.</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Income -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-medium">Income</h2>
					<Button size="sm" variant="outline" onclick={() => (addIncomeOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add Income
					</Button>
				</div>

				<div class="card p-0">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Name</Table.Head>
								<Table.Head>Category</Table.Head>
								<Table.Head>Frequency</Table.Head>
								<Table.Head class="text-right">Monthly</Table.Head>
								<Table.Head class="w-10"></Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each income as item (item.id)}
								<Table.Row>
									<Table.Cell class="font-medium">{item.name}</Table.Cell>
									<Table.Cell class="text-muted-foreground">{item.category}</Table.Cell>
									<Table.Cell>{formatFrequency(item.frequency)}</Table.Cell>
									<Table.Cell class="text-right tabular-nums text-emerald-600">
										{formatCurrency(toMonthly(dollars(item.amount), item.frequency))}
									</Table.Cell>
									<Table.Cell class="text-right">
										<RowActionsMenu
											label={item.name}
											onEdit={() => startEdit(item)}
											onDelete={() => startDelete(item)}
										/>
									</Table.Cell>
								</Table.Row>
							{:else}
								<Table.Row>
									<Table.Cell colspan={5} class="py-6 text-center text-muted-foreground">
										No income added yet.
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>

			<!-- Expenses -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-medium">Expenses</h2>
					<Button size="sm" variant="outline" onclick={() => (addExpenseOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add Expense
					</Button>
				</div>

				<div class="card p-0">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Name</Table.Head>
								<Table.Head>Category</Table.Head>
								<Table.Head>Frequency</Table.Head>
								<Table.Head class="text-right">Monthly</Table.Head>
								<Table.Head class="w-10"></Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each expenses as item (item.id)}
								<Table.Row>
									<Table.Cell class="font-medium">{item.name}</Table.Cell>
									<Table.Cell class="text-muted-foreground">{item.category}</Table.Cell>
									<Table.Cell>{formatFrequency(item.frequency)}</Table.Cell>
									<Table.Cell class="text-right tabular-nums text-red-500">
										{formatCurrency(toMonthly(dollars(item.amount), item.frequency))}
									</Table.Cell>
									<Table.Cell class="text-right">
										<RowActionsMenu
											label={item.name}
											onEdit={() => startEdit(item)}
											onDelete={() => startDelete(item)}
										/>
									</Table.Cell>
								</Table.Row>
							{/each}

							{#if subscriptions.length > 0}
								<Table.Row class="bg-muted/30">
									<Table.Cell class="font-medium">Subscriptions</Table.Cell>
									<Table.Cell class="text-muted-foreground"
										>{subscriptions.length} active</Table.Cell
									>
									<Table.Cell class="text-muted-foreground">Monthly</Table.Cell>
									<Table.Cell class="text-right tabular-nums text-red-500">
										{formatCurrency(monthlySubscriptions)}
									</Table.Cell>
									<Table.Cell class="text-right">
										<a
											href="/dashboard/subscriptions"
											class="text-xs text-muted-foreground hover:text-foreground"
										>
											Manage →
										</a>
									</Table.Cell>
								</Table.Row>
							{/if}

							{#if expenses.length === 0 && subscriptions.length === 0}
								<Table.Row>
									<Table.Cell colspan={5} class="py-6 text-center text-muted-foreground">
										No expenses added yet.
									</Table.Cell>
								</Table.Row>
							{/if}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</div>

		<!-- Spending breakdown -->
		{#if chartData.length > 0}
			<div class="card">
				<h2 class="font-medium">Spending Breakdown</h2>
				<div class="grid items-center gap-6 sm:grid-cols-2">
					<DoughnutChart data={chartData} formatter={formatPercentage} />
					<LegendList data={chartData} formatter={formatPercentage} />
				</div>
			</div>
		{/if}
	</div>
</svelte:boundary>

<BudgetItemDialog type="income" bind:open={addIncomeOpen} />
<BudgetItemDialog type="expense" bind:open={addExpenseOpen} />

{#if editItem}
	<BudgetItemDialog
		type={editItem.type as 'income' | 'expense'}
		item={editItem}
		bind:open={editOpen}
	/>
{/if}

<DeleteDialog
	bind:open={deleteOpen}
	showTrigger={false}
	label={deleteTarget?.name ?? 'item'}
	onDelete={async () => {
		if (deleteTarget) {
			await deleteBudgetItem({ id: deleteTarget.id });
			deleteTarget = null;
			deleteOpen = false;
		}
	}}
/>
