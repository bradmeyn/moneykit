<script lang="ts">
	import {
		getSubscriptions,
		addSubscription,
		updateSubscription,
		deleteSubscription
	} from '$lib/remotes/subscription.remote';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import * as Dialog from '$ui/dialog';
	import * as Field from '$ui/field';
	import * as NativeSelect from '$ui/native-select';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$ui/button';
	import { Plus, Pencil, Trash2, CalendarClock } from '@lucide/svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import type { Subscription } from '$db/schemas/budget';

	const subscriptions = $derived(await getSubscriptions());

	const FREQUENCIES = ['weekly', 'fortnightly', 'monthly', 'quarterly', 'yearly'] as const;
	const CATEGORIES = ['Entertainment', 'Software', 'Health', 'Finance', 'Utilities', 'Other'];

	let addOpen = $state(false);
	let editTarget = $state<Subscription | null>(null);
	let deleteTarget = $state<Subscription | null>(null);
	let deleteOpen = $state(false);

	function toDateInputValue(date: Date | string) {
		return new Date(date).toISOString().split('T')[0];
	}

	function formatFrequency(f: string) {
		return f.charAt(0).toUpperCase() + f.slice(1);
	}

	function formatDueDate(date: Date | string) {
		return new Date(date).toLocaleDateString('en-AU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	async function onDelete() {
		if (!deleteTarget) return;
		await deleteSubscription({ id: deleteTarget.id });
		deleteTarget = null;
		deleteOpen = false;
	}
</script>

<svelte:head>
	<title>Subscriptions | MoneyKit</title>
</svelte:head>

<svelte:boundary>
	{#snippet pending()}
		<div class="space-y-3">
			{#each [1, 2, 3] as _}
				<div class="h-16 animate-pulse rounded-2xl bg-muted/60"></div>
			{/each}
		</div>
	{/snippet}

	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="heading-primary">Subscriptions</h1>
				<p class="mt-1 text-sm text-muted-foreground">Track your recurring expenses.</p>
			</div>
			<Button onclick={() => (addOpen = true)}>
				<Plus class="mr-2 size-4" />
				Add
			</Button>
		</div>

		{#if subscriptions.length > 0}
			<div class="card divide-y divide-border p-0">
				{#each subscriptions as sub (sub.id)}
					<div class="flex items-center justify-between px-5 py-4">
						<div class="flex items-center gap-3">
							<div
								class="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
							>
								<CalendarClock class="size-4" />
							</div>
							<div>
								<p class="font-medium">{sub.name}</p>
								<p class="text-xs text-muted-foreground">
									{formatFrequency(sub.frequency)}{sub.category ? ` · ${sub.category}` : ''}
								</p>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="text-right">
								<p class="font-medium tabular-nums">{formatAsCurrency(sub.amount / 100)}</p>
								<p class="text-xs text-muted-foreground">Due {formatDueDate(sub.nextDueDate)}</p>
							</div>
							<div class="flex gap-0.5">
								<Button
									variant="ghost"
									size="icon"
									onclick={() => (editTarget = sub)}
									aria-label="Edit"
								>
									<Pencil class="size-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onclick={() => {
										deleteTarget = sub;
										deleteOpen = true;
									}}
									aria-label="Delete"
								>
									<Trash2 class="size-4 text-destructive" />
								</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="card flex flex-col items-center justify-center py-12 text-center">
				<CalendarClock class="mb-3 size-10 text-muted-foreground" />
				<p class="mb-1 font-medium">No subscriptions yet</p>
				<p class="mb-4 text-sm text-muted-foreground">Add your recurring expenses to track them.</p>
				<Button onclick={() => (addOpen = true)}>
					<Plus class="mr-2 size-4" />
					Add Subscription
				</Button>
			</div>
		{/if}
	</div>
</svelte:boundary>

<!-- Add Dialog -->
<Dialog.Root bind:open={addOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add Subscription</Dialog.Title>
		</Dialog.Header>

		{#each addSubscription.fields.issues() as issue}
			<p class="text-sm text-destructive">{issue.message}</p>
		{/each}

		<form
			{...addSubscription.enhance(async ({ form, submit }) => {
				await submit().updates(getSubscriptions());
				if (addSubscription.result?.success) {
					form.reset();
					addOpen = false;
				}
			})}
			class="space-y-4"
		>
			<Field.Field>
				<Field.Label for="name">Name</Field.Label>
				<Input id="name" {...addSubscription.fields.name.as('text')} placeholder="e.g., Netflix" />
				<Field.Error />
			</Field.Field>

			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label for="amount">Amount ($)</Field.Label>
					<Input
						id="amount"
						{...addSubscription.fields.amount.as('number')}
						step="0.01"
						placeholder="0.00"
					/>
					<Field.Error />
				</Field.Field>

				<Field.Field>
					<Field.Label>Frequency</Field.Label>
					<NativeSelect.Root {...addSubscription.fields.frequency.as('text')}>
						{#each FREQUENCIES as f}
							<NativeSelect.Option value={f}>{formatFrequency(f)}</NativeSelect.Option>
						{/each}
					</NativeSelect.Root>
				</Field.Field>
			</div>

			<Field.Field>
				<Field.Label for="nextDueDate">Next Due Date</Field.Label>
				<Input id="nextDueDate" {...addSubscription.fields.nextDueDate.as('date')} />
				<Field.Error />
			</Field.Field>

			<Field.Field>
				<Field.Label>Category (optional)</Field.Label>
				<NativeSelect.Root {...addSubscription.fields.category.as('text')}>
					<NativeSelect.Option value="">None</NativeSelect.Option>
					{#each CATEGORIES as c}
						<NativeSelect.Option value={c}>{c}</NativeSelect.Option>
					{/each}
				</NativeSelect.Root>
			</Field.Field>

			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (addOpen = false)}>Cancel</Button>
				<Button type="submit" disabled={!!addSubscription.pending}>Add</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- Edit Dialog -->
<Dialog.Root
	open={!!editTarget}
	onOpenChange={(o) => {
		if (!o) editTarget = null;
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Subscription</Dialog.Title>
		</Dialog.Header>

		{#each updateSubscription.fields.issues() as issue}
			<p class="text-sm text-destructive">{issue.message}</p>
		{/each}

		{#if editTarget}
			<form
				{...updateSubscription.enhance(async ({ form, submit }) => {
					await submit().updates(getSubscriptions());
					if (updateSubscription.result?.success) {
						form.reset();
						editTarget = null;
					}
				})}
				class="space-y-4"
			>
				<input {...updateSubscription.fields.id.as('text')} type="hidden" value={editTarget.id} />

				<Field.Field>
					<Field.Label for="edit-name">Name</Field.Label>
					<Input
						id="edit-name"
						{...updateSubscription.fields.name.as('text')}
						value={editTarget.name}
					/>
					<Field.Error />
				</Field.Field>

				<div class="grid grid-cols-2 gap-3">
					<Field.Field>
						<Field.Label for="edit-amount">Amount ($)</Field.Label>
						<Input
							id="edit-amount"
							{...updateSubscription.fields.amount.as('number')}
							step="0.01"
							value={editTarget.amount / 100}
						/>
						<Field.Error />
					</Field.Field>

					<Field.Field>
						<Field.Label>Frequency</Field.Label>
						<NativeSelect.Root
							{...updateSubscription.fields.frequency.as('text')}
							value={editTarget.frequency}
						>
							{#each FREQUENCIES as f}
								<NativeSelect.Option value={f}>{formatFrequency(f)}</NativeSelect.Option>
							{/each}
						</NativeSelect.Root>
					</Field.Field>
				</div>

				<Field.Field>
					<Field.Label for="edit-dueDate">Next Due Date</Field.Label>
					<Input
						id="edit-dueDate"
						{...updateSubscription.fields.nextDueDate.as('date')}
						value={toDateInputValue(editTarget.nextDueDate)}
					/>
					<Field.Error />
				</Field.Field>

				<Field.Field>
					<Field.Label>Category (optional)</Field.Label>
					<NativeSelect.Root
						{...updateSubscription.fields.category.as('text')}
						value={editTarget.category ?? ''}
					>
						<NativeSelect.Option value="">None</NativeSelect.Option>
						{#each CATEGORIES as c}
							<NativeSelect.Option value={c}>{c}</NativeSelect.Option>
						{/each}
					</NativeSelect.Root>
				</Field.Field>

				<div class="flex justify-end gap-2">
					<Button type="button" variant="outline" onclick={() => (editTarget = null)}>Cancel</Button
					>
					<Button type="submit" disabled={!!updateSubscription.pending}>Save</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<!-- Delete Dialog -->
<DeleteDialog
	bind:open={deleteOpen}
	showTrigger={false}
	label={deleteTarget?.name ?? 'subscription'}
	{onDelete}
/>
