<script lang="ts">
	import { getAssets, updateAsset } from '$lib/remotes/balance-sheet.remote';
	import * as Dialog from '$ui/dialog';
	import * as Field from '$ui/field';
	import * as NativeSelect from '$ui/native-select';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$ui/button';
	import type { Asset } from '$db/schemas/budget';
	import { OWNERS } from '$lib/constants/categories';

	const ASSET_CATEGORIES = ['cash', 'property', 'vehicle', 'other'] as const;

	let {
		open = $bindable(false),
		asset
	}: {
		open?: boolean;
		asset: Asset;
	} = $props();

	function formatCategory(c: string) {
		return c.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Asset</Dialog.Title>
		</Dialog.Header>
		<form
			{...updateAsset.enhance(async ({ form, submit }) => {
				await submit().updates(getAssets());
				if (updateAsset.result?.success) { form.reset(); open = false; }
			})}
			class="space-y-4"
		>
			<input {...updateAsset.fields.id.as('text')} type="hidden" value={asset.id} />
			<Field.Field>
				<Field.Label>Name</Field.Label>
				<Input {...updateAsset.fields.name.as('text')} value={asset.name} />
				<Field.Error />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label>Value ($)</Field.Label>
					<Input
						{...updateAsset.fields.amount.as('text')}
						type="number"
						step="0.01"
						value={asset.value / 100}
					/>
					<Field.Error />
				</Field.Field>
				<Field.Field>
					<Field.Label>Category</Field.Label>
					<NativeSelect.Root {...updateAsset.fields.category.as('text')} value={asset.category}>
						{#each ASSET_CATEGORIES as c}
							<NativeSelect.Option value={c}>{formatCategory(c)}</NativeSelect.Option>
						{/each}
					</NativeSelect.Root>
				</Field.Field>
			</div>
			<Field.Field>
				<Field.Label>Owner</Field.Label>
				<NativeSelect.Root {...updateAsset.fields.owner.as('text')} value={asset.owner ?? Object.keys(OWNERS)[0]}>
					{#each Object.entries(OWNERS) as [key, label]}
						<NativeSelect.Option value={key}>{label}</NativeSelect.Option>
					{/each}
				</NativeSelect.Root>
			</Field.Field>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!updateAsset.pending}>Save</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
