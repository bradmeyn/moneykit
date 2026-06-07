<script lang="ts">
	import Button from '$ui/button/button.svelte';
	import * as Dialog from '$ui/dialog/index.js';
	import Input from '$ui/input/input.svelte';
	import * as Field from '$ui/field';
	import { updateTransaction } from '$lib/remotes/transaction.remote';
	import { getTransaction, getTransactions } from '$lib/remotes/transaction.remote';
	import { getHolding } from '$lib/remotes/holding.remote';
	import Spinner from '$ui/spinner/spinner.svelte';
	import DatePicker from '$ui/date-picker.svelte';
	import { parseDate, type DateValue } from '@internationalized/date';

	let {
		transactionId,
		holdingId,
		transaction,
		open = $bindable(false)
	}: {
		transactionId: string;
		holdingId: string;
		transaction: {
			type: string;
			quantity: number;
			pricePerUnit: number;
			brokerage?: number;
			transactionDate: Date | string;
		};
		open?: boolean;
	} = $props();

	// Format date for input field
	const formatDate = (date: Date | string) => {
		const d = new Date(date);
		return d.toISOString().split('T')[0];
	};

	let selectedDate = $state<DateValue | undefined>(
		parseDate(formatDate(transaction.transactionDate))
	);

	function handleDateChange(date: DateValue | undefined) {
		if (date) {
			selectedDate = date;
			updateTransaction.fields.transactionDate.set(date.toString());
		}
	}

	// Ensure field has initial ISO value for submission
	updateTransaction.fields.transactionDate.set(formatDate(transaction.transactionDate));
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Transaction</Dialog.Title>
			<Dialog.Description>Update your transaction details.</Dialog.Description>
		</Dialog.Header>

		{#each updateTransaction.fields.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}

		<form
			{...updateTransaction.for(transactionId).enhance(async (form) => {
				try {
					await form.submit();
					if (form.result?.success) {
						open = false;
					}
				} catch (e) {
					console.error('Error editing transaction', e);
				}
			})}
			class="space-y-4"
		>
			<Field.Field>
				<Field.Label for="type">Transaction Type</Field.Label>
				<select
					id="type"
					{...updateTransaction.fields.type.as('text')}
					value={transaction.type}
					class="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">Select type</option>
					<option value="buy">Buy</option>
					<option value="sell">Sell</option>
					<option value="reinvestment">Reinvestment</option>
				</select>
				<Field.Error />
			</Field.Field>

			<div class="grid grid-cols-2 gap-4">
				<Field.Field>
					<Field.Label for="quantity">Quantity</Field.Label>
					<Input
						id="quantity"
						{...updateTransaction.fields.quantity.as('number')}
						value={transaction.quantity}
						min="1"
						step="1"
					/>
					<Field.Error />
				</Field.Field>

				<Field.Field>
					<Field.Label for="pricePerUnit">Price Per Unit</Field.Label>
					<Input
						id="pricePerUnit"
						{...updateTransaction.fields.pricePerUnit.as('number')}
						value={transaction.pricePerUnit}
						min="0"
						step="0.01"
					/>
					<Field.Error />
				</Field.Field>
			</div>

			<Field.Field>
				<Field.Label for="brokerage">Brokerage</Field.Label>
				<Input
					id="brokerage"
					{...updateTransaction.fields.brokerage.as('number')}
					value={transaction.brokerage || 0}
					min="0"
					step="0.01"
				/>
				<Field.Error />
			</Field.Field>

			<Field.Field>
				<Field.Label for="transactionDate">Transaction Date</Field.Label>
				<DatePicker bind:value={selectedDate} onValueChange={handleDateChange} />
				<input type="hidden" {...updateTransaction.fields.transactionDate.as('text')} />
				<Field.Error />
			</Field.Field>

			<input type="hidden" name="id" value={transactionId} />

			<div class="mt-4 flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!updateTransaction.pending}>
					{#if updateTransaction.pending}
						<Spinner class="size-4" />
					{:else}
						Save Changes
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
