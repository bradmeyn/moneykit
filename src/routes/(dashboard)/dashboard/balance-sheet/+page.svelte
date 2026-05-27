<script lang="ts">
	import {
		getAssets,
		getLiabilities,
		deleteAsset,
		deleteLiability
	} from '$lib/remotes/balance-sheet.remote';
	import { getNetWorth } from '$lib/remotes/portfolio.remote';
	import { formatCurrency } from '$lib/utils';
	import { Button } from '$ui/button';
	import { Plus, Pencil, Trash2 } from '@lucide/svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import AddAssetDialog from './_components/add-asset-dialog.svelte';
	import EditAssetDialog from './_components/edit-asset-dialog.svelte';
	import AddLiabilityDialog from './_components/add-liability-dialog.svelte';
	import EditLiabilityDialog from './_components/edit-liability-dialog.svelte';
	import type { Asset, Liability } from '$db/schemas/budget';

	const [assets, liabilities, netWorth] = $derived(
		await Promise.all([getAssets(), getLiabilities(), getNetWorth()])
	);

	const totalManualAssets = $derived(assets.reduce((s, a) => s + a.value, 0));
	const totalAssets = $derived(totalManualAssets + netWorth.totalValue);
	const totalLiabilities = $derived(liabilities.reduce((s, l) => s + l.balance, 0));
	const netWorthTotal = $derived(totalAssets - totalLiabilities);

	let addAssetOpen = $state(false);
	let editAsset = $state<Asset | null>(null);
	let editAssetOpen = $state(false);
	let addLiabilityOpen = $state(false);
	let editLiability = $state<Liability | null>(null);
	let editLiabilityOpen = $state(false);

	$effect(() => {
		if (!editAssetOpen) editAsset = null;
	});
	$effect(() => {
		if (!editLiabilityOpen) editLiability = null;
	});
	let deleteAssetTarget = $state<Asset | null>(null);
	let deleteAssetOpen = $state(false);
	let deleteLiabilityTarget = $state<Liability | null>(null);
	let deleteLiabilityOpen = $state(false);

	function formatCategory(c: string) {
		return c.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}
</script>

<svelte:head><title>Balance Sheet | MoneyKit</title></svelte:head>

<svelte:boundary>
	{#snippet pending()}
		<div class="space-y-4">
			{#each [1, 2, 3] as _}<div class="h-20 animate-pulse rounded-2xl bg-muted/60"></div>{/each}
		</div>
	{/snippet}

	<div class="space-y-6">
		<div>
			<h1 class="heading-primary">Balance Sheet</h1>
			<p class="mt-1 text-sm text-muted-foreground">A snapshot of what you own and what you owe.</p>
		</div>

		<div class="card">
			<p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Net Worth</p>
			<p class="mt-1 text-4xl font-medium tracking-tight tabular-nums">
				{formatCurrency(netWorthTotal)}
			</p>
			<p class="mt-1 text-sm text-muted-foreground tabular-nums">
				{formatCurrency(totalAssets)} assets − {formatCurrency(totalLiabilities)} liabilities
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Assets -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-medium">
						Assets <span class="ml-2 text-sm text-muted-foreground tabular-nums"
							>{formatCurrency(totalAssets)}</span
						>
					</h2>
					<Button size="sm" variant="outline" onclick={() => (addAssetOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add
					</Button>
				</div>

				<div class="card divide-y divide-border p-0">
					<div class="flex items-center justify-between px-5 py-3.5">
						<div>
							<p class="font-medium">Investment Portfolio</p>
							<p class="text-xs text-muted-foreground">Auto-calculated from portfolios</p>
						</div>
						<p class="font-medium tabular-nums">{formatCurrency(netWorth.totalValue)}</p>
					</div>

					{#each assets as asset (asset.id)}
						<div class="flex items-center justify-between px-5 py-3.5">
							<div>
								<p class="font-medium">{asset.name}</p>
								<p class="text-xs text-muted-foreground">{formatCategory(asset.category)}</p>
							</div>
							<div class="flex items-center gap-2">
								<p class="font-medium tabular-nums">{formatCurrency(asset.value)}</p>
								<div class="flex gap-0.5">
									<Button
										variant="ghost"
										size="icon"
										onclick={() => {
											editAsset = asset;
											editAssetOpen = true;
										}}
									>
										<Pencil class="size-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onclick={() => {
											deleteAssetTarget = asset;
											deleteAssetOpen = true;
										}}
									>
										<Trash2 class="size-3.5 text-destructive" />
									</Button>
								</div>
							</div>
						</div>
					{/each}
				</div>

				{#if assets.length === 0}
					<p class="text-sm text-muted-foreground">No manual assets yet.</p>
				{/if}
			</div>

			<!-- Liabilities -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<h2 class="font-medium">
						Liabilities <span class="ml-2 text-sm text-muted-foreground tabular-nums"
							>{formatCurrency(totalLiabilities)}</span
						>
					</h2>
					<Button size="sm" variant="outline" onclick={() => (addLiabilityOpen = true)}>
						<Plus class="mr-1 size-3.5" /> Add
					</Button>
				</div>

				<div class="card divide-y divide-border p-0">
					{#each liabilities as liability (liability.id)}
						<div class="flex items-center justify-between px-5 py-3.5">
							<div>
								<p class="font-medium">{liability.name}</p>
								<p class="text-xs text-muted-foreground">
									{formatCategory(liability.category)}{liability.interestRate != null
										? ` · ${(liability.interestRate / 100).toFixed(2)}% p.a.`
										: ''}
								</p>
							</div>
							<div class="flex items-center gap-2">
								<p class="font-medium tabular-nums text-red-500">
									{formatCurrency(liability.balance)}
								</p>
								<div class="flex gap-0.5">
									<Button
										variant="ghost"
										size="icon"
										onclick={() => {
											editLiability = liability;
											editLiabilityOpen = true;
										}}
									>
										<Pencil class="size-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onclick={() => {
											deleteLiabilityTarget = liability;
											deleteLiabilityOpen = true;
										}}
									>
										<Trash2 class="size-3.5 text-destructive" />
									</Button>
								</div>
							</div>
						</div>
					{/each}

					{#if liabilities.length === 0}
						<p class="px-5 py-3.5 text-sm text-muted-foreground">No liabilities yet.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</svelte:boundary>

<AddAssetDialog bind:open={addAssetOpen} />
{#if editAsset}
	<EditAssetDialog bind:open={editAssetOpen} asset={editAsset} />
{/if}

<AddLiabilityDialog bind:open={addLiabilityOpen} />
{#if editLiability}
	<EditLiabilityDialog bind:open={editLiabilityOpen} liability={editLiability} />
{/if}

<DeleteDialog
	bind:open={deleteAssetOpen}
	showTrigger={false}
	label={deleteAssetTarget?.name ?? 'asset'}
	onDelete={async () => {
		if (deleteAssetTarget) {
			await deleteAsset({ id: deleteAssetTarget.id });
			deleteAssetTarget = null;
			deleteAssetOpen = false;
		}
	}}
/>

<DeleteDialog
	bind:open={deleteLiabilityOpen}
	showTrigger={false}
	label={deleteLiabilityTarget?.name ?? 'liability'}
	onDelete={async () => {
		if (deleteLiabilityTarget) {
			await deleteLiability({ id: deleteLiabilityTarget.id });
			deleteLiabilityTarget = null;
			deleteLiabilityOpen = false;
		}
	}}
/>
