<script lang="ts">
	import { getPortfolio } from '$lib/remotes/portfolio.remote';
	import { page } from '$app/state';
	import * as Table from '$ui/table';
	import Button from '$ui/button/button.svelte';
	import AddHoldingDialog from '$lib/components/holding/add-holding-dialog.svelte';
	import { formatCurrency } from '$lib/utils';

	const portfolio = $derived(await getPortfolio(page.params.portfolioId!));
	const portfolioId = page.params.portfolioId!;

	let addHoldingOpen = $state(false);
</script>

<div class="mb-6 flex items-center justify-between">
	<h1 class="text-3xl font-semibold">{portfolio.name}</h1>
	<div>
		<AddHoldingDialog {portfolioId} bind:open={addHoldingOpen} />
	</div>
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
		<Table.Root class="bg-white">
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
							<Button href="/portfolios/{portfolioId}/{holding.id}" size="sm">View</Button>
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
