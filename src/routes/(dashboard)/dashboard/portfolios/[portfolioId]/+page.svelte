<script lang="ts">
	import { getPortfolio, deletePortfolio } from '$lib/remotes/portfolio.remote';
	import { deleteHolding } from '$lib/remotes/holding.remote';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import * as Table from '$ui/table';
	import Button from '$ui/button/button.svelte';
	import AddHoldingDialog from '$lib/components/holding/add-holding-dialog.svelte';
	import EditHoldingDialog from '$lib/components/holding/edit-holding-dialog.svelte';
	import EditPortfolioDialog from '$lib/components/portfolio/edit-portfolio-dialog.svelte';
	import DeleteDialog from '$lib/components/delete-dialog.svelte';
	import RowActionsMenu from '$lib/components/row-actions-menu.svelte';
	import { formatCurrency } from '$lib/utils';

	const portfolio = $derived(await getPortfolio(page.params.portfolioId!));
	const portfolioId = page.params.portfolioId!;

	type Holding = (typeof portfolio.holdings)[number];

	let addHoldingOpen = $state(false);

	type Dialog =
		| { kind: 'edit-holding'; holding: Holding }
		| { kind: 'delete-holding'; holding: Holding }
		| { kind: 'edit-portfolio' }
		| { kind: 'delete-portfolio' }
		| null;

	let dialog = $state<Dialog>(null);
</script>

<div class="mb-4 flex items-center justify-between">
	<div class="flex items-center gap-3">
		<a href="/dashboard/portfolios" class="text-sm text-muted-foreground hover:text-foreground"
			>← Portfolios</a
		>
		<span class="text-muted-foreground">/</span>
		<h1 class="heading-primary">{portfolio.name}</h1>
	</div>
	<div class="flex items-center gap-1">
		<AddHoldingDialog {portfolioId} bind:open={addHoldingOpen} />
		<RowActionsMenu
			label={portfolio.name}
			editLabel="Edit portfolio"
			deleteLabel="Delete portfolio"
			onEdit={() => (dialog = { kind: 'edit-portfolio' })}
			onDelete={() => (dialog = { kind: 'delete-portfolio' })}
		/>
	</div>
</div>

<div class="mb-6 flex gap-1 border-b">
	<a
		href="/dashboard/portfolios/{portfolioId}"
		class="border-b-2 border-primary px-3 py-2 text-sm font-medium text-primary">Holdings</a
	>
	<a
		href="/dashboard/portfolios/{portfolioId}/reports/unrealised-gains"
		class="border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
		>Unrealised Gains</a
	>
	<a
		href="/dashboard/portfolios/{portfolioId}/reports/cgt"
		class="border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
		>CGT Report</a
	>
</div>

{#if portfolio.holdings.length > 0}
	<!-- Portfolio Summary -->
	<div class="mb-6 grid gap-4 md:grid-cols-4">
		<div class="card">
			<p class="text-sm text-muted-foreground">Current Value</p>
			<p class="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</p>
		</div>
		<div class="card">
			<p class="text-sm text-muted-foreground">Unrealised Gain</p>
			<p
				class="text-2xl font-bold {portfolio.totalUnrealisedGain >= 0
					? 'text-emerald-600'
					: 'text-red-600'}"
			>
				{portfolio.totalUnrealisedGain >= 0 ? '+' : ''}{formatCurrency(
					portfolio.totalUnrealisedGain
				)}
			</p>
		</div>
		<div class="card">
			<p class="text-sm text-muted-foreground">Return</p>
			<p
				class="text-2xl font-bold {portfolio.totalUnrealisedGainPercent >= 0
					? 'text-emerald-600'
					: 'text-red-600'}"
			>
				{portfolio.totalUnrealisedGainPercent >= 0
					? '+'
					: ''}{portfolio.totalUnrealisedGainPercent.toFixed(2)}%
			</p>
		</div>
	</div>
	<div class="card">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Code</Table.Head>
					<Table.Head class="text-right">Units</Table.Head>
					<Table.Head class="text-right">Avg Price</Table.Head>
					<Table.Head class="text-right">Current Price</Table.Head>
					<Table.Head class="text-right">Value</Table.Head>
					<Table.Head class="text-right">Gain/Loss</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each portfolio.holdings as holding}
					<Table.Row>
						<Table.Cell class="font-medium">{holding.name}</Table.Cell>
						<Table.Cell>{holding.code}</Table.Cell>
						<Table.Cell class="text-right">{holding.units}</Table.Cell>
						<Table.Cell class="text-right">{formatCurrency(holding.averagePrice)}</Table.Cell>
						<Table.Cell class="text-right">{formatCurrency(holding.currentPrice)}</Table.Cell>
						<Table.Cell class="text-right">{formatCurrency(holding.currentValue)}</Table.Cell>
						<Table.Cell
							class="text-right {holding.unrealisedGain >= 0 ? 'text-emerald-600' : 'text-red-600'}"
						>
							{holding.unrealisedGain >= 0 ? '+' : ''}{formatCurrency(holding.unrealisedGain)}
							<span class="text-xs">({holding.unrealisedGainPercent.toFixed(1)}%)</span>
						</Table.Cell>
						<Table.Cell class="text-right">
							<div class="flex items-center justify-end gap-1">
								<Button href="/dashboard/portfolios/{portfolioId}/{holding.id}" size="sm"
									>View</Button
								>
								<RowActionsMenu
									label={holding.name}
									onEdit={() => (dialog = { kind: 'edit-holding', holding })}
									onDelete={() => (dialog = { kind: 'delete-holding', holding })}
								/>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{:else}
	<div class="flex flex-col items-center justify-center py-12 text-center">
		<p class="mb-4 text-muted-foreground">
			No holdings yet. Add your first holding to get started.
		</p>
		<Button onclick={() => (addHoldingOpen = true)}>Add Holding</Button>
	</div>
{/if}

{#if dialog?.kind === 'edit-holding'}
	<EditHoldingDialog
		open
		onOpenChange={(o) => !o && (dialog = null)}
		holdingId={dialog.holding.id}
		{portfolioId}
		holding={{ investmentId: dialog.holding.investmentId }}
	/>
{/if}

{#if dialog?.kind === 'edit-portfolio'}
	<EditPortfolioDialog
		open
		onOpenChange={(o) => !o && (dialog = null)}
		{portfolioId}
		portfolioName={portfolio.name}
	/>
{/if}

<DeleteDialog
	open={dialog?.kind === 'delete-holding'}
	onOpenChange={(o) => !o && (dialog = null)}
	showTrigger={false}
	label={dialog?.kind === 'delete-holding' ? dialog.holding.name : 'holding'}
	onDelete={async () => {
		if (dialog?.kind === 'delete-holding') {
			await deleteHolding({ id: dialog.holding.id });
			dialog = null;
		}
	}}
/>

<DeleteDialog
	open={dialog?.kind === 'delete-portfolio'}
	onOpenChange={(o) => !o && (dialog = null)}
	showTrigger={false}
	label={portfolio.name}
	onDelete={async () => {
		await deletePortfolio({ id: portfolioId });
		dialog = null;
		await goto('/dashboard/portfolios');
	}}
/>
