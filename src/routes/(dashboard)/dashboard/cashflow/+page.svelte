<script lang="ts">
	import { getIncomes, addIncome, updateIncome, deleteIncome } from '$lib/remotes/income.remote';
	import { getSubscriptions } from '$lib/remotes/subscription.remote';
	import { formatCurrency } from '$lib/utils';
	import * as Dialog from '$ui/dialog';
	import * as Field from '$ui/field';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$ui/button';
	import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, Minus } from '@lucide/svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import type { Income } from '$db/schemas/budget';

	const incomes = $derived(await getIncomes());
	const subscriptions = $derived(await getSubscriptions());

	const FREQUENCIES = ['weekly', 'fortnightly', 'monthly', 'quarterly', 'yearly'] as const;
	const INCOME_CATEGORIES = ['Salary', 'Rental', 'Dividends', 'Business', 'Other'];

	function toMonthly(amount: number, frequency: string): number {
		switch (frequency) {
			case 'weekly': return amount * 52 / 12;
			case 'fortnightly': return amount * 26 / 12;
			case 'monthly': return amount;
			case 'quarterly': return amount / 3;
			case 'yearly': return amount / 12;
			default: return amount;
		}
	}

	const monthlyIncome = $derived(incomes.reduce((s, i) => s + toMonthly(i.amount, i.frequency), 0));
	const monthlyExpenses = $derived(subscriptions.reduce((s, sub) => s + toMonthly(sub.amount, sub.frequency), 0));
	const monthlyNet = $derived(monthlyIncome - monthlyExpenses);

	function formatFrequency(f: string) {
		return f.charAt(0).toUpperCase() + f.slice(1);
	}

	let addOpen = $state(false);
	let editTarget = $state<Income | null>(null);
	let deleteTarget = $state<Income | null>(null);
	let deleteOpen = $state(false);

	async function onAdd({ form, submit }: any) {
		await submit().updates(getIncomes());
		if (addIncome.result?.success) { form.reset(); addOpen = false; }
	}

	async function onEdit({ submit }: any) {
		await submit().updates(getIncomes());
		if (updateIncome.result?.success) editTarget = null;
	}
</script>

<svelte:head><title>Cashflow | MoneyKit</title></svelte:head>

<svelte:boundary>
	{#snippet pending()}
		<div class="space-y-4">
			{#each [1, 2, 3] as _}<div class="h-20 animate-pulse rounded-2xl bg-muted"></div>{/each}
		</div>
	{/snippet}

	<div class="space-y-6">
		<div>
			<h1 class="text-2xl font-semibold">Cashflow</h1>
			<p class="mt-1 text-sm text-muted-foreground">Monthly income vs expenses.</p>
		</div>

		<!-- Summary -->
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="card">
				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<TrendingUp class="size-4 text-emerald-600" /> Income
				</div>
				<p class="mt-1 text-2xl font-bold text-emerald-600">+{formatCurrency(monthlyIncome)}</p>
				<p class="text-xs text-muted-foreground">per month</p>
			</div>
			<div class="card">
				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<TrendingDown class="size-4 text-red-500" /> Expenses
				</div>
				<p class="mt-1 text-2xl font-bold text-red-500">−{formatCurrency(monthlyExpenses)}</p>
				<p class="text-xs text-muted-foreground">per month</p>
			</div>
			<div class="card">
				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<Minus class="size-4" /> Net
				</div>
				<p class="mt-1 text-2xl font-bold {monthlyNet >= 0 ? 'text-emerald-600' : 'text-red-500'}">
					{monthlyNet >= 0 ? '+' : ''}{formatCurrency(monthlyNet)}
				</p>
				<p class="text-xs text-muted-foreground">per month</p>
			</div>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Income -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-semibold">Income</h2>
					<Button size="sm" variant="outline" onclick={() => (addOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add
					</Button>
				</div>

				{#if incomes.length > 0}
					<div class="card divide-y divide-border p-0">
						{#each incomes as income (income.id)}
							<div class="flex items-center justify-between px-4 py-3">
								<div>
									<p class="font-medium">{income.name}</p>
									<p class="text-xs text-muted-foreground">
										{formatFrequency(income.frequency)}{income.category ? ` · ${income.category}` : ''}
									</p>
								</div>
								<div class="flex items-center gap-3">
									<div class="text-right">
										<p class="font-medium text-emerald-600">{formatCurrency(income.amount)}</p>
										<p class="text-xs text-muted-foreground">{formatCurrency(toMonthly(income.amount, income.frequency))}/mo</p>
									</div>
									<div class="flex gap-1">
										<Button variant="ghost" size="icon" onclick={() => (editTarget = income)}><Pencil class="size-3.5" /></Button>
										<Button variant="ghost" size="icon" onclick={() => { deleteTarget = income; deleteOpen = true; }}><Trash2 class="size-3.5 text-destructive" /></Button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="card flex flex-col items-center py-8 text-center">
						<p class="mb-3 text-sm text-muted-foreground">No income sources added yet.</p>
						<Button size="sm" onclick={() => (addOpen = true)}><Plus class="mr-1 size-3.5" /> Add Income</Button>
					</div>
				{/if}
			</div>

			<!-- Expenses (subscriptions) -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-semibold">Expenses</h2>
					<a href="/dashboard/subscriptions" class="text-sm text-muted-foreground hover:text-foreground">Manage →</a>
				</div>

				{#if subscriptions.length > 0}
					<div class="card divide-y divide-border p-0">
						{#each subscriptions as sub (sub.id)}
							<div class="flex items-center justify-between px-4 py-3">
								<div>
									<p class="font-medium">{sub.name}</p>
									<p class="text-xs text-muted-foreground">
										{formatFrequency(sub.frequency)}{sub.category ? ` · ${sub.category}` : ''}
									</p>
								</div>
								<div class="text-right">
									<p class="font-medium text-red-500">{formatCurrency(sub.amount)}</p>
									<p class="text-xs text-muted-foreground">{formatCurrency(toMonthly(sub.amount, sub.frequency))}/mo</p>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="card text-center py-8">
						<p class="text-sm text-muted-foreground">No subscriptions added yet.</p>
						<a href="/dashboard/subscriptions" class="mt-2 block text-sm text-primary hover:underline">Add subscriptions →</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</svelte:boundary>

<!-- Add Income Dialog -->
<Dialog.Root bind:open={addOpen}>
	<Dialog.Content>
		<Dialog.Header><Dialog.Title>Add Income</Dialog.Title></Dialog.Header>
		<form {...addIncome.enhance(onAdd)} class="space-y-4">
			<Field.Field>
				<Field.Label>Name</Field.Label>
				<Input {...addIncome.fields.name.as('text')} placeholder="e.g., Salary" />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label>Amount ($)</Field.Label>
					<Input {...addIncome.fields.amount.as('number')} step="0.01" placeholder="0.00" />
				</Field.Field>
				<Field.Field>
					<Field.Label>Frequency</Field.Label>
					<select {...addIncome.fields.frequency.as('text')} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
						{#each FREQUENCIES as f}<option value={f}>{formatFrequency(f)}</option>{/each}
					</select>
				</Field.Field>
			</div>
			<Field.Field>
				<Field.Label>Category (optional)</Field.Label>
				<select {...addIncome.fields.category.as('text')} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
					<option value="">None</option>
					{#each INCOME_CATEGORIES as c}<option value={c}>{c}</option>{/each}
				</select>
			</Field.Field>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (addOpen = false)}>Cancel</Button>
				<Button type="submit">Add</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- Edit Income Dialog -->
<Dialog.Root open={!!editTarget} onOpenChange={(o) => { if (!o) editTarget = null; }}>
	<Dialog.Content>
		<Dialog.Header><Dialog.Title>Edit Income</Dialog.Title></Dialog.Header>
		{#if editTarget}
			<form {...updateIncome.enhance(onEdit)} class="space-y-4">
				<input type="hidden" {...updateIncome.fields.id.as('hidden')} value={editTarget.id} />
				<Field.Field>
					<Field.Label>Name</Field.Label>
					<Input {...updateIncome.fields.name.as('text')} value={editTarget.name} />
				</Field.Field>
				<div class="grid grid-cols-2 gap-3">
					<Field.Field>
						<Field.Label>Amount ($)</Field.Label>
						<Input {...updateIncome.fields.amount.as('number')} step="0.01" value={editTarget.amount / 100} />
					</Field.Field>
					<Field.Field>
						<Field.Label>Frequency</Field.Label>
						<select {...updateIncome.fields.frequency.as('text')} value={editTarget.frequency} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
							{#each FREQUENCIES as f}<option value={f}>{formatFrequency(f)}</option>{/each}
						</select>
					</Field.Field>
				</div>
				<Field.Field>
					<Field.Label>Category (optional)</Field.Label>
					<select {...updateIncome.fields.category.as('text')} value={editTarget.category ?? ''} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
						<option value="">None</option>
						{#each INCOME_CATEGORIES as c}<option value={c}>{c}</option>{/each}
					</select>
				</Field.Field>
				<div class="flex justify-end gap-2">
					<Button type="button" variant="outline" onclick={() => (editTarget = null)}>Cancel</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<DeleteDialog
	bind:open={deleteOpen}
	showTrigger={false}
	label={deleteTarget?.name ?? 'income'}
	onDelete={async () => {
		if (deleteTarget) {
			await deleteIncome({ id: deleteTarget.id });
			deleteTarget = null;
			deleteOpen = false;
		}
	}}
/>
