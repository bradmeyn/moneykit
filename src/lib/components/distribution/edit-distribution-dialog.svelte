<script lang="ts">
	import Button from '$ui/button/button.svelte';
	import * as Dialog from '$ui/dialog/index.js';
	import Input from '$ui/input/input.svelte';
	import * as Field from '$ui/field';
	import { updateDistribution } from '$lib/remotes/distribution.remote';
	import { getHolding } from '$lib/remotes/holding.remote';
	import Spinner from '$ui/spinner/spinner.svelte';
	import DatePicker from '$ui/date-picker.svelte';
	import { Checkbox } from '$ui/checkbox';
	import Label from '$ui/label/label.svelte';
	import { formatCurrency } from '$lib/utils';
	import { parseDate, type DateValue } from '@internationalized/date';
	import type { distributionTable } from '$lib/server/db/schemas/portfolio';
	import type { InferSelectModel } from 'drizzle-orm';

	type Distribution = InferSelectModel<typeof distributionTable>;

	interface Props {
		distribution: Distribution;
		holdingId: string;
		open?: boolean;
	}

	let { distribution, holdingId, open = $bindable(false) }: Props = $props();

	// Parse dates for DatePicker
	function toDateValue(date: Date | string | null): DateValue | undefined {
		if (!date) return undefined;
		const d = new Date(date);
		return parseDate(d.toISOString().split('T')[0]);
	}

	// Initialize with existing values
	let datePaid = $state<DateValue | undefined>(toDateValue(distribution.datePaid));
	let reinvested = $state(distribution.reinvested);
	let grossPayment = $state(distribution.grossPayment / 100);
	let taxWithheld = $state(distribution.taxWithheld / 100);

	let netPayment = $derived((grossPayment - taxWithheld) * 100);

	// Reset values when dialog opens
	$effect(() => {
		if (open) {
			datePaid = toDateValue(distribution.datePaid);
			reinvested = distribution.reinvested;
			grossPayment = distribution.grossPayment / 100;
			taxWithheld = distribution.taxWithheld / 100;
			if (datePaid) updateDistribution.fields.datePaid.set(datePaid.toString());
		}
	});

	function handleDatePaidChange(date: DateValue | undefined) {
		if (date) {
			updateDistribution.fields.datePaid.set(date.toString());
		}
	}

	function handleAmountChange(field: 'grossPayment' | 'taxWithheld') {
		return (e: Event) => {
			const value = parseFloat((e.target as HTMLInputElement).value) || 0;
			if (field === 'grossPayment') grossPayment = value;
			else if (field === 'taxWithheld') taxWithheld = value;
		};
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Edit Distribution</Dialog.Title>
			<Dialog.Description>Update the distribution details.</Dialog.Description>
		</Dialog.Header>

		{#each updateDistribution.fields.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}

		<form
			{...updateDistribution.for(distribution.id).enhance(async (form) => {
				try {
					await form.submit();
					if (form.result?.success) {
						await getHolding(holdingId).refresh();
						open = false;
					}
				} catch (e) {
					console.error('Error editing distribution', e);
				}
			})}
			class="space-y-4"
		>
			<input type="hidden" name="id" value={distribution.id} />
			<input type="hidden" name="holdingId" value={holdingId} />
			<input type="hidden" {...updateDistribution.fields.datePaid.as('text')} />

			<!-- Date -->
			<Field.Field>
				<Field.Label for="datePaid">Date Paid</Field.Label>
				<DatePicker bind:value={datePaid} onValueChange={handleDatePaidChange} />
				<Field.Error />
			</Field.Field>

			<!-- Amounts -->
			<div class="grid grid-cols-2 gap-4">
				<Field.Field>
					<Field.Label for="grossPayment">Gross Payment</Field.Label>
					<Input
						id="grossPayment"
						{...updateDistribution.fields.grossPayment.as('number')}
						min="0"
						step="0.01"
						value={grossPayment}
						onchange={handleAmountChange('grossPayment')}
					/>
					<Field.Error />
				</Field.Field>

				<Field.Field>
					<Field.Label for="taxWithheld">Tax Withheld</Field.Label>
					<Input
						id="taxWithheld"
						{...updateDistribution.fields.taxWithheld.as('number')}
						min="0"
						step="0.01"
						value={taxWithheld}
						onchange={handleAmountChange('taxWithheld')}
					/>
					<Field.Error />
				</Field.Field>
			</div>

			<!-- Payment Summary -->
			<div class="rounded-lg bg-muted/50 p-4">
				<p class="text-sm text-muted-foreground">Net Payment</p>
				<p class="text-lg font-semibold">{formatCurrency(netPayment)}</p>
			</div>

			<!-- Reinvestment -->
			<div class="flex items-center gap-2 rounded-lg border p-4">
				<Checkbox id="reinvested" bind:checked={reinvested} />
				<input type="hidden" name="reinvested" value={reinvested ? 'true' : 'false'} />
				<Label for="reinvested">Distribution Reinvested (DRP)</Label>
			</div>

			<div class="flex justify-end gap-2 pt-4">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!updateDistribution.pending}>
					{#if updateDistribution.pending}
						<Spinner class="size-4" />
					{:else}
						Save Changes
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
