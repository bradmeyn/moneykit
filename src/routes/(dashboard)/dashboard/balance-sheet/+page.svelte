<script lang="ts">
	import {
		getAssets,
		getLiabilities,
		addAsset,
		updateAsset,
		deleteAsset,
		addLiability,
		updateLiability,
		deleteLiability
	} from '$lib/remotes/balance-sheet.remote';
	import { getNetWorth } from '$lib/remotes/portfolio.remote';
	import { formatCurrency } from '$lib/utils';
	import * as Dialog from '$ui/dialog';
	import * as Field from '$ui/field';
	import Input from '$ui/input/input.svelte';
	import { Button } from '$ui/button';
	import { Plus, Pencil, Trash2 } from '@lucide/svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import type { Asset, Liability } from '$db/schemas/budget';

	const assets = $derived(await getAssets());
	const liabilities = $derived(await getLiabilities());
	const netWorth = $derived(await getNetWorth());

	const ASSET_CATEGORIES = ['cash', 'property', 'vehicle', 'other'] as const;
	const LIABILITY_CATEGORIES = ['mortgage', 'personal_loan', 'credit_card', 'other'] as const;

	const totalManualAssets = $derived(assets.reduce((s, a) => s + a.value, 0));
	const totalAssets = $derived(totalManualAssets + netWorth.totalValue);
	const totalLiabilities = $derived(liabilities.reduce((s, l) => s + l.balance, 0));
	const netWorthTotal = $derived(totalAssets - totalLiabilities);

	let addAssetOpen = $state(false);
	let addLiabilityOpen = $state(false);
	let editAsset = $state<Asset | null>(null);
	let editLiability = $state<Liability | null>(null);
	let deleteAssetTarget = $state<Asset | null>(null);
	let deleteAssetOpen = $state(false);
	let deleteLiabilityTarget = $state<Liability | null>(null);
	let deleteLiabilityOpen = $state(false);

	function formatCategory(c: string) {
		return c.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}

	async function onAddAsset({ form, submit }: any) {
		await submit().updates(getAssets());
		if (addAsset.result?.success) { form.reset(); addAssetOpen = false; }
	}

	async function onEditAsset({ submit }: any) {
		await submit().updates(getAssets());
		if (updateAsset.result?.success) editAsset = null;
	}

	async function onAddLiability({ form, submit }: any) {
		await submit().updates(getLiabilities());
		if (addLiability.result?.success) { form.reset(); addLiabilityOpen = false; }
	}

	async function onEditLiability({ submit }: any) {
		await submit().updates(getLiabilities());
		if (updateLiability.result?.success) editLiability = null;
	}
</script>

<svelte:head><title>Balance Sheet | MoneyKit</title></svelte:head>

<svelte:boundary>
	{#snippet pending()}
		<div class="space-y-4">
			{#each [1, 2, 3] as _}<div class="h-20 animate-pulse rounded-2xl bg-muted"></div>{/each}
		</div>
	{/snippet}

	<div class="space-y-6">
		<div>
			<h1 class="text-2xl font-semibold">Balance Sheet</h1>
			<p class="mt-1 text-sm text-muted-foreground">A snapshot of what you own and what you owe.</p>
		</div>

		<!-- Net Worth Banner -->
		<div class="card bg-primary text-primary-foreground">
			<p class="text-sm opacity-80">Net Worth</p>
			<p class="mt-1 text-4xl font-bold">{formatCurrency(netWorthTotal)}</p>
			<p class="mt-1 text-sm opacity-70">
				{formatCurrency(totalAssets)} assets − {formatCurrency(totalLiabilities)} liabilities
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Assets -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-semibold">Assets <span class="ml-2 text-sm font-normal text-muted-foreground">{formatCurrency(totalAssets)}</span></h2>
					<Button size="sm" variant="outline" onclick={() => (addAssetOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add
					</Button>
				</div>

				<!-- Portfolio (auto) -->
				<div class="card flex items-center justify-between bg-muted/40">
					<div>
						<p class="font-medium">Investment Portfolio</p>
						<p class="text-xs text-muted-foreground">Auto-calculated from portfolios</p>
					</div>
					<p class="font-semibold">{formatCurrency(netWorth.totalValue)}</p>
				</div>

				{#each assets as asset (asset.id)}
					<div class="card flex items-center justify-between">
						<div>
							<p class="font-medium">{asset.name}</p>
							<p class="text-xs text-muted-foreground">{formatCategory(asset.category)}</p>
						</div>
						<div class="flex items-center gap-3">
							<p class="font-semibold">{formatCurrency(asset.value)}</p>
							<div class="flex gap-1">
								<Button variant="ghost" size="icon" onclick={() => (editAsset = asset)}>
									<Pencil class="size-3.5" />
								</Button>
								<Button variant="ghost" size="icon" onclick={() => { deleteAssetTarget = asset; deleteAssetOpen = true; }}>
									<Trash2 class="size-3.5 text-destructive" />
								</Button>
							</div>
						</div>
					</div>
				{/each}

				{#if assets.length === 0}
					<p class="text-sm text-muted-foreground">No manual assets yet.</p>
				{/if}
			</div>

			<!-- Liabilities -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-semibold">Liabilities <span class="ml-2 text-sm font-normal text-muted-foreground">{formatCurrency(totalLiabilities)}</span></h2>
					<Button size="sm" variant="outline" onclick={() => (addLiabilityOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add
					</Button>
				</div>

				{#each liabilities as liability (liability.id)}
					<div class="card flex items-center justify-between">
						<div>
							<p class="font-medium">{liability.name}</p>
							<p class="text-xs text-muted-foreground">
								{formatCategory(liability.category)}{liability.interestRate != null ? ` · ${(liability.interestRate / 100).toFixed(2)}% p.a.` : ''}
							</p>
						</div>
						<div class="flex items-center gap-3">
							<p class="font-semibold text-red-500">{formatCurrency(liability.balance)}</p>
							<div class="flex gap-1">
								<Button variant="ghost" size="icon" onclick={() => (editLiability = liability)}>
									<Pencil class="size-3.5" />
								</Button>
								<Button variant="ghost" size="icon" onclick={() => { deleteLiabilityTarget = liability; deleteLiabilityOpen = true; }}>
									<Trash2 class="size-3.5 text-destructive" />
								</Button>
							</div>
						</div>
					</div>
				{/each}

				{#if liabilities.length === 0}
					<p class="text-sm text-muted-foreground">No liabilities yet.</p>
				{/if}
			</div>
		</div>
	</div>
</svelte:boundary>

<!-- Add Asset Dialog -->
<Dialog.Root bind:open={addAssetOpen}>
	<Dialog.Content>
		<Dialog.Header><Dialog.Title>Add Asset</Dialog.Title></Dialog.Header>
		<form {...addAsset.enhance(onAddAsset)} class="space-y-4">
			<Field.Field>
				<Field.Label>Name</Field.Label>
				<Input {...addAsset.fields.name.as('text')} placeholder="e.g., Savings Account" />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label>Value ($)</Field.Label>
					<Input {...addAsset.fields.value.as('number')} step="0.01" placeholder="0.00" />
				</Field.Field>
				<Field.Field>
					<Field.Label>Category</Field.Label>
					<select {...addAsset.fields.category.as('text')} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
						{#each ASSET_CATEGORIES as c}<option value={c}>{formatCategory(c)}</option>{/each}
					</select>
				</Field.Field>
			</div>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (addAssetOpen = false)}>Cancel</Button>
				<Button type="submit">Add</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- Edit Asset Dialog -->
<Dialog.Root open={!!editAsset} onOpenChange={(o) => { if (!o) editAsset = null; }}>
	<Dialog.Content>
		<Dialog.Header><Dialog.Title>Edit Asset</Dialog.Title></Dialog.Header>
		{#if editAsset}
			<form {...updateAsset.enhance(onEditAsset)} class="space-y-4">
				<input type="hidden" {...updateAsset.fields.id.as('hidden')} value={editAsset.id} />
				<Field.Field>
					<Field.Label>Name</Field.Label>
					<Input {...updateAsset.fields.name.as('text')} value={editAsset.name} />
				</Field.Field>
				<div class="grid grid-cols-2 gap-3">
					<Field.Field>
						<Field.Label>Value ($)</Field.Label>
						<Input {...updateAsset.fields.value.as('number')} step="0.01" value={editAsset.value / 100} />
					</Field.Field>
					<Field.Field>
						<Field.Label>Category</Field.Label>
						<select {...updateAsset.fields.category.as('text')} value={editAsset.category} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
							{#each ASSET_CATEGORIES as c}<option value={c}>{formatCategory(c)}</option>{/each}
						</select>
					</Field.Field>
				</div>
				<div class="flex justify-end gap-2">
					<Button type="button" variant="outline" onclick={() => (editAsset = null)}>Cancel</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<!-- Add Liability Dialog -->
<Dialog.Root bind:open={addLiabilityOpen}>
	<Dialog.Content>
		<Dialog.Header><Dialog.Title>Add Liability</Dialog.Title></Dialog.Header>
		<form {...addLiability.enhance(onAddLiability)} class="space-y-4">
			<Field.Field>
				<Field.Label>Name</Field.Label>
				<Input {...addLiability.fields.name.as('text')} placeholder="e.g., Home Loan" />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label>Balance ($)</Field.Label>
					<Input {...addLiability.fields.balance.as('number')} step="0.01" placeholder="0.00" />
				</Field.Field>
				<Field.Field>
					<Field.Label>Category</Field.Label>
					<select {...addLiability.fields.category.as('text')} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
						{#each LIABILITY_CATEGORIES as c}<option value={c}>{formatCategory(c)}</option>{/each}
					</select>
				</Field.Field>
			</div>
			<Field.Field>
				<Field.Label>Interest Rate % (optional)</Field.Label>
				<Input {...addLiability.fields.interestRate.as('number')} step="0.01" placeholder="e.g., 6.25" />
			</Field.Field>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (addLiabilityOpen = false)}>Cancel</Button>
				<Button type="submit">Add</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- Edit Liability Dialog -->
<Dialog.Root open={!!editLiability} onOpenChange={(o) => { if (!o) editLiability = null; }}>
	<Dialog.Content>
		<Dialog.Header><Dialog.Title>Edit Liability</Dialog.Title></Dialog.Header>
		{#if editLiability}
			<form {...updateLiability.enhance(onEditLiability)} class="space-y-4">
				<input type="hidden" {...updateLiability.fields.id.as('hidden')} value={editLiability.id} />
				<Field.Field>
					<Field.Label>Name</Field.Label>
					<Input {...updateLiability.fields.name.as('text')} value={editLiability.name} />
				</Field.Field>
				<div class="grid grid-cols-2 gap-3">
					<Field.Field>
						<Field.Label>Balance ($)</Field.Label>
						<Input {...updateLiability.fields.balance.as('number')} step="0.01" value={editLiability.balance / 100} />
					</Field.Field>
					<Field.Field>
						<Field.Label>Category</Field.Label>
						<select {...updateLiability.fields.category.as('text')} value={editLiability.category} class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
							{#each LIABILITY_CATEGORIES as c}<option value={c}>{formatCategory(c)}</option>{/each}
						</select>
					</Field.Field>
				</div>
				<Field.Field>
					<Field.Label>Interest Rate % (optional)</Field.Label>
					<Input {...updateLiability.fields.interestRate.as('number')} step="0.01" value={editLiability.interestRate != null ? editLiability.interestRate / 100 : ''} />
				</Field.Field>
				<div class="flex justify-end gap-2">
					<Button type="button" variant="outline" onclick={() => (editLiability = null)}>Cancel</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<DeleteDialog bind:open={deleteAssetOpen} showTrigger={false} label={deleteAssetTarget?.name ?? 'asset'} onDelete={async () => { if (deleteAssetTarget) { await deleteAsset({ id: deleteAssetTarget.id }); deleteAssetTarget = null; deleteAssetOpen = false; } }} />
<DeleteDialog bind:open={deleteLiabilityOpen} showTrigger={false} label={deleteLiabilityTarget?.name ?? 'liability'} onDelete={async () => { if (deleteLiabilityTarget) { await deleteLiability({ id: deleteLiabilityTarget.id }); deleteLiabilityTarget = null; deleteLiabilityOpen = false; } }} />
