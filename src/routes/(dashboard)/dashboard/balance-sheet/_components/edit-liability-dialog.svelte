<script lang="ts">
	import { getLiabilities, updateLiability } from '$lib/remotes/balance-sheet.remote';
	import * as Dialog from '$ui/dialog';
	import * as Field from '$ui/field';
	import * as NativeSelect from '$ui/native-select';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$ui/button';
	import type { Liability } from '$db/schemas/budget';
	import { OWNERS } from '$lib/constants/categories';

	const LIABILITY_CATEGORIES = ['mortgage', 'personal_loan', 'credit_card', 'other'] as const;

	let {
		open = $bindable(false),
		liability
	}: {
		open?: boolean;
		liability: Liability;
	} = $props();

	function formatCategory(c: string) {
		return c.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Liability</Dialog.Title>
		</Dialog.Header>
		<form
			{...updateLiability.enhance(async ({ form, submit }) => {
				await submit().updates(getLiabilities());
				if (updateLiability.result?.success) { form.reset(); open = false; }
			})}
			class="space-y-4"
		>
			<input {...updateLiability.fields.id.as('text')} type="hidden" value={liability.id} />
			<Field.Field>
				<Field.Label>Name</Field.Label>
				<Input {...updateLiability.fields.name.as('text')} value={liability.name} />
				<Field.Error />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label>Balance ($)</Field.Label>
					<Input
						{...updateLiability.fields.balance.as('text')}
						type="number"
						step="0.01"
						value={liability.balance / 100}
					/>
					<Field.Error />
				</Field.Field>
				<Field.Field>
					<Field.Label>Category</Field.Label>
					<NativeSelect.Root {...updateLiability.fields.category.as('text')} value={liability.category}>
						{#each LIABILITY_CATEGORIES as c}
							<NativeSelect.Option value={c}>{formatCategory(c)}</NativeSelect.Option>
						{/each}
					</NativeSelect.Root>
				</Field.Field>
			</div>
			<Field.Field>
				<Field.Label>Interest Rate % (optional)</Field.Label>
				<Input
					{...updateLiability.fields.interestRate.as('text')}
					type="number"
					step="0.01"
					value={liability.interestRate != null ? liability.interestRate / 100 : ''}
				/>
			</Field.Field>
			<Field.Field>
				<Field.Label>Owner</Field.Label>
				<NativeSelect.Root {...updateLiability.fields.owner.as('text')} value={liability.owner ?? Object.keys(OWNERS)[0]}>
					{#each Object.entries(OWNERS) as [key, label]}
						<NativeSelect.Option value={key}>{label}</NativeSelect.Option>
					{/each}
				</NativeSelect.Root>
			</Field.Field>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!updateLiability.pending}>Save</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
