<script lang="ts">
	import { getBudgetItems, deleteBudgetItem } from '$lib/remotes/budget-item.remote';
	import { getSubscriptions } from '$lib/remotes/subscription.remote';
	import { formatCurrency } from '$lib/utils/formatters';
	import { toMonthly } from '$lib/utils/cashflow';
	import * as Table from '$ui/table';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import BudgetItemDialog from './_components/budget-item-dialog.svelte';
	import CashflowSection from './_components/cashflow-section.svelte';
	import type { BudgetItem } from '$db/schemas/budget';

	const [budgetItems, subscriptions] = $derived(
		await Promise.all([getBudgetItems(), getSubscriptions()])
	);

	const income = $derived(budgetItems.filter((i) => i.type === 'income'));
	const expenses = $derived(budgetItems.filter((i) => i.type === 'expense'));

	const monthlySubscriptions = $derived(
		subscriptions.reduce((s, sub) => s + toMonthly(sub.amount / 100, sub.frequency), 0)
	);

	type Dialog =
		| { kind: 'add'; type: 'income' | 'expense' }
		| { kind: 'edit'; item: BudgetItem }
		| { kind: 'delete'; item: BudgetItem }
		| null;

	let dialog = $state<Dialog>(null);
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
			<CashflowSection
				title="Income"
				addLabel="Add Income"
				items={income}
				amountClass="text-emerald-600"
				emptyMessage="No income added yet."
				isEmpty={income.length === 0}
				onAdd={() => (dialog = { kind: 'add', type: 'income' })}
				onEdit={(item) => (dialog = { kind: 'edit', item })}
				onDelete={(item) => (dialog = { kind: 'delete', item })}
			/>

			<CashflowSection
				title="Expenses"
				addLabel="Add Expense"
				items={expenses}
				amountClass="text-red-500"
				emptyMessage="No expenses added yet."
				isEmpty={expenses.length === 0 && subscriptions.length === 0}
				onAdd={() => (dialog = { kind: 'add', type: 'expense' })}
				onEdit={(item) => (dialog = { kind: 'edit', item })}
				onDelete={(item) => (dialog = { kind: 'delete', item })}
			>
				{#snippet extra()}
					{#if subscriptions.length > 0}
						<Table.Row class="bg-muted/30">
							<Table.Cell class="font-medium">Subscriptions</Table.Cell>
							<Table.Cell class="text-muted-foreground">{subscriptions.length} active</Table.Cell>
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
				{/snippet}
			</CashflowSection>
		</div>
	</div>
</svelte:boundary>

<BudgetItemDialog
	type="income"
	open={dialog?.kind === 'add' && dialog.type === 'income'}
	onOpenChange={(o) => (dialog = o ? { kind: 'add', type: 'income' } : null)}
/>
<BudgetItemDialog
	type="expense"
	open={dialog?.kind === 'add' && dialog.type === 'expense'}
	onOpenChange={(o) => (dialog = o ? { kind: 'add', type: 'expense' } : null)}
/>

{#if dialog?.kind === 'edit'}
	<BudgetItemDialog
		type={dialog.item.type as 'income' | 'expense'}
		item={dialog.item}
		open
		onOpenChange={(o) => !o && (dialog = null)}
	/>
{/if}

<DeleteDialog
	open={dialog?.kind === 'delete'}
	onOpenChange={(o) => !o && (dialog = null)}
	showTrigger={false}
	label={dialog?.kind === 'delete' ? dialog.item.name : 'item'}
	onDelete={async () => {
		if (dialog?.kind === 'delete') {
			await deleteBudgetItem({ id: dialog.item.id });
			dialog = null;
		}
	}}
/>
