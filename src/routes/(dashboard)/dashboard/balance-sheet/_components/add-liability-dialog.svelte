<script lang="ts">
	import { getLiabilities, addLiability } from '$lib/remotes/balance-sheet.remote';
	import * as Dialog from '$ui/dialog';
	import * as Field from '$ui/field';
	import * as NativeSelect from '$ui/native-select';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$ui/button';
	import { OWNERS } from '$lib/constants/categories';

	const LIABILITY_CATEGORIES = ['mortgage', 'personal_loan', 'credit_card', 'other'] as const;

	let { open = $bindable(false) }: { open?: boolean } = $props();

	function formatCategory(c: string) {
		return c.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add Liability</Dialog.Title>
		</Dialog.Header>
		<form
			{...addLiability.enhance(async ({ form, submit }) => {
				await submit().updates(getLiabilities());
				if (addLiability.result?.success) { form.reset(); open = false; }
			})}
			class="space-y-4"
		>
			<Field.Field>
				<Field.Label>Name</Field.Label>
				<Input {...addLiability.fields.name.as('text')} placeholder="e.g., Home Loan" />
				<Field.Error />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label>Balance ($)</Field.Label>
					<Input {...addLiability.fields.balance.as('text')} type="number" step="0.01" placeholder="0.00" />
					<Field.Error />
				</Field.Field>
				<Field.Field>
					<Field.Label>Category</Field.Label>
					<NativeSelect.Root {...addLiability.fields.category.as('text')}>
						{#each LIABILITY_CATEGORIES as c}
							<NativeSelect.Option value={c}>{formatCategory(c)}</NativeSelect.Option>
						{/each}
					</NativeSelect.Root>
				</Field.Field>
			</div>
			<Field.Field>
				<Field.Label>Interest Rate % (optional)</Field.Label>
				<Input {...addLiability.fields.interestRate.as('text')} type="number" step="0.01" placeholder="e.g., 6.25" />
			</Field.Field>
			<Field.Field>
				<Field.Label>Owner</Field.Label>
				<NativeSelect.Root {...addLiability.fields.owner.as('text')}>
					{#each Object.entries(OWNERS) as [key, label]}
						<NativeSelect.Option value={key}>{label}</NativeSelect.Option>
					{/each}
				</NativeSelect.Root>
			</Field.Field>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!addLiability.pending}>Add</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
