<script lang="ts">
	import Button, { buttonVariants } from '$ui/button/button.svelte';
	import * as Dialog from '$ui/dialog/index.js';
	import Input from '$ui/input/input.svelte';
	import * as Field from '$ui/field';
	import { addDistribution } from '$lib/remotes/distribution.remote';
	import Spinner from '$ui/spinner/spinner.svelte';
	import { Plus } from '@lucide/svelte';
	import DatePicker from '$ui/date-picker.svelte';
	import type { DateValue } from '@internationalized/date';
	import { Checkbox } from '$ui/checkbox';
	import Label from '$ui/label/label.svelte';
	import { formatCurrency } from '$lib/utils';

	let {
		holdingId,
		open = $bindable(false),
		showTrigger = true
	}: {
		holdingId: string;
		open?: boolean;
		showTrigger?: boolean;
	} = $props();

	let datePaid = $state<DateValue | undefined>(undefined);
	let reinvested = $state(false);

	function handleDatePaidChange(date: DateValue | undefined) {
		if (date) {
			addDistribution.fields.datePaid.set(date.toString());
		}
	}

	let grossPayment = $state(0);
	let taxWithheld = $state(0);

	function handleAmountChange(field: 'grossPayment' | 'taxWithheld') {
		return (e: Event) => {
			const value = parseFloat((e.target as HTMLInputElement).value) || 0;
			if (field === 'grossPayment') grossPayment = value;
			else if (field === 'taxWithheld') taxWithheld = value;
		};
	}

	let netPayment = $derived((grossPayment - taxWithheld) * 100);
</script>

<Dialog.Root bind:open>
	{#if showTrigger}
		<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
			<Plus class="mr-2 size-4" />
			Add Distribution
		</Dialog.Trigger>
	{/if}

	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Add Distribution</Dialog.Title>
			<Dialog.Description>Record a distribution payment for this holding.</Dialog.Description>
			{#each addDistribution.for(holdingId).fields.allIssues() as issue}
				<p class="text-sm text-red-600">{issue.message}</p>
			{/each}
		</Dialog.Header>

		<form
			{...addDistribution.for(holdingId).enhance(async ({ form, submit }) => {
				try {
					addDistribution.validate({ includeUntouched: true });
					await submit();
					if (addDistribution.for(holdingId).result?.success) {
						form.reset();
						datePaid = undefined;
						reinvested = false;
						grossPayment = 0;
						taxWithheld = 0;
						open = false;
					}
				} catch (e) {
					console.error('Error adding distribution', e);
				}
			})}
			class="space-y-4"
		>
			<!-- Date -->
			<Field.Field>
				<Field.Label for="datePaid">Date Paid</Field.Label>
				<DatePicker bind:value={datePaid} onValueChange={handleDatePaidChange} />
				<input type="hidden" {...addDistribution.fields.datePaid.as('text')} />
				<Field.Error />
			</Field.Field>

			<!-- Amounts -->
			<div class="grid grid-cols-2 gap-4">
				<Field.Field>
					<Field.Label for="grossPayment">Gross Payment</Field.Label>
					<Input
						id="grossPayment"
						{...addDistribution.fields.grossPayment.as('number')}
						min="0"
						step="0.01"
						onchange={handleAmountChange('grossPayment')}
					/>
					<Field.Error />
				</Field.Field>

				<Field.Field>
					<Field.Label for="taxWithheld">Tax Withheld</Field.Label>
					<Input
						id="taxWithheld"
						{...addDistribution.fields.taxWithheld.as('number')}
						min="0"
						step="0.01"
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
				<Checkbox id="reinvested" name="reinvested" bind:checked={reinvested} />
				<Label for="reinvested">Distribution Reinvested (DRP)</Label>
			</div>

			<input type="hidden" name="holdingId" value={holdingId} />

			<div class="flex justify-end gap-2 pt-4">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button
					type="submit"
					disabled={!!addDistribution.pending ||
						!!addDistribution.for(holdingId).fields.allIssues()}
				>
					{#if addDistribution.pending}
						<Spinner class="size-4" />
					{:else}
						Add Distribution
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
