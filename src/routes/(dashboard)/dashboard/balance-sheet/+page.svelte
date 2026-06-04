<script lang="ts">
	import {
		getAssets,
		getLiabilities,
		deleteAsset,
		deleteLiability
	} from '$lib/remotes/balance-sheet.remote';
	import { getNetWorth } from '$lib/remotes/portfolio.remote';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import AddAssetDialog from './_components/add-asset-dialog.svelte';
	import EditAssetDialog from './_components/edit-asset-dialog.svelte';
	import AddLiabilityDialog from './_components/add-liability-dialog.svelte';
	import EditLiabilityDialog from './_components/edit-liability-dialog.svelte';
	import type { Asset, Liability } from '$db/schemas/budget';
	import BalanceSheetSummary from './_components/balance-sheet-summary.svelte';
	import BalanceSheetSection from './_components/balance-sheet-section.svelte';
	import BalanceSheetRow from './_components/balance-sheet-row.svelte';

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
		</div>

		<BalanceSheetSummary {totalAssets} {totalLiabilities} />

		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Assets -->
			<BalanceSheetSection
				title="Assets"
				total={totalAssets}
				onAdd={() => (addAssetOpen = true)}
				empty={assets.length === 0 ? 'No manual assets yet.' : ''}
			>
				<BalanceSheetRow
					name="Investment Portfolio"
					subtitle="Auto-calculated from portfolios"
					amount={netWorth.totalValue}
					href="/dashboard/portfolios"
				/>

				{#each assets as asset (asset.id)}
					<BalanceSheetRow
						name={asset.name}
						subtitle={formatCategory(asset.category)}
						amount={asset.value}
						onEdit={() => {
							editAsset = asset;
							editAssetOpen = true;
						}}
						onDelete={() => {
							deleteAssetTarget = asset;
							deleteAssetOpen = true;
						}}
					/>
				{/each}
			</BalanceSheetSection>

			<!-- Liabilities -->
			<BalanceSheetSection
				title="Liabilities"
				total={totalLiabilities}
				onAdd={() => (addLiabilityOpen = true)}
				empty={liabilities.length === 0 ? 'No liabilities yet.' : ''}
			>
				{#each liabilities as liability (liability.id)}
					<BalanceSheetRow
						name={liability.name}
						subtitle={formatCategory(liability.category) +
							(liability.interestRate != null
								? ` · ${(liability.interestRate / 100).toFixed(2)}% p.a.`
								: '')}
						amount={liability.balance}
						onEdit={() => {
							editLiability = liability;
							editLiabilityOpen = true;
						}}
						onDelete={() => {
							deleteLiabilityTarget = liability;
							deleteLiabilityOpen = true;
						}}
					/>
				{/each}
			</BalanceSheetSection>
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
