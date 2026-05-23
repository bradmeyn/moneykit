<script lang="ts">
	import Button from '$ui/button/button.svelte';
	import * as Table from '$ui/table';
	import { Pencil, Trash2 } from '@lucide/svelte';
	import EditTransactionDialog from '$lib/components/transaction/edit-transaction-dialog.svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import { deleteTransaction } from '$lib/remotes/transaction.remote';
	import { formatCurrency } from '$lib/utils';

	let {
		transaction,
		holdingId
	}: {
		transaction: any;
		holdingId: string;
	} = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const formatDate = (date: Date | string) => {
		return new Date(date).toLocaleDateString('en-AU', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const typeClasses = $derived(
		transaction.type === 'buy'
			? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			: transaction.type === 'sell'
				? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
				: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
	);
</script>

<Table.Row>
	<Table.Cell>{formatDate(transaction.transactionDate)}</Table.Cell>
	<Table.Cell>
		<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {typeClasses}">
			{transaction.type.toUpperCase()}
		</span>
	</Table.Cell>
	<Table.Cell class="text-right">{transaction.quantity}</Table.Cell>
	<Table.Cell class="text-right">{formatCurrency(transaction.pricePerUnit)}</Table.Cell>
	<Table.Cell class="text-right">{formatCurrency(transaction.brokerage || 0)}</Table.Cell>
	<Table.Cell class="text-right">
		{formatCurrency(transaction.quantity * transaction.pricePerUnit)}
	</Table.Cell>
	<Table.Cell class="text-right">
		<div class="flex justify-end gap-2">
			<Button
				variant="ghost"
				size="icon"
				onclick={() => (editOpen = true)}
				aria-label="Edit transaction"
			>
				<Pencil class="size-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onclick={() => (deleteOpen = true)}
				aria-label="Delete transaction"
			>
				<Trash2 class="size-4" />
			</Button>
		</div>
	</Table.Cell>
</Table.Row>

<!-- Edit Transaction Dialog -->
<EditTransactionDialog
	transactionId={transaction.id}
	{holdingId}
	{transaction}
	bind:open={editOpen}
/>

<!-- Delete Transaction Dialog -->
<DeleteDialog
	bind:open={deleteOpen}
	label="transaction"
	showTrigger={false}
	onDelete={async () => {
		await deleteTransaction({ id: transaction.id });
		deleteOpen = false;
	}}
/>
