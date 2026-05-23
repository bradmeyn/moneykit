<script lang="ts">
	import { getPortfolioUnrealisedGains } from '$lib/remotes/portfolio.remote';
	import { page } from '$app/state';
	import * as Table from '$ui/table';
	import Button from '$ui/button/button.svelte';
	import { formatCurrency, downloadCSV } from '$lib/utils';
	import { ArrowLeft, Check, Download, Minus } from '@lucide/svelte';

	const portfolioId = page.params.portfolioId!;
	const data = $derived(await getPortfolioUnrealisedGains(portfolioId));

	const formatDate = (date: Date | string) => {
		return new Date(date).toLocaleDateString('en-AU', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const totalUnrealisedGain = $derived(data.holdings.reduce((sum, h) => sum + h.unrealisedGain, 0));

	const longTermLots = $derived(data.unrealisedLots.filter((lot) => lot.isLongTerm));
	const shortTermLots = $derived(data.unrealisedLots.filter((lot) => !lot.isLongTerm));

	const totalLongTermGain = $derived(
		longTermLots.reduce((sum, lot) => sum + lot.unrealisedGain, 0)
	);
	const totalShortTermGain = $derived(
		shortTermLots.reduce((sum, lot) => sum + lot.unrealisedGain, 0)
	);

	function generateUnrealisedGainsReport() {
		let csv = 'Unrealised Gains Report\n\n';

		// Summary
		csv += 'Summary\n';
		csv += 'Category,Amount\n';
		csv += `Total Unrealised Gain,${(totalUnrealisedGain / 100).toFixed(2)}\n`;
		csv += `Long-Term Unrealised Gain,${(totalLongTermGain / 100).toFixed(2)}\n`;
		csv += `Short-Term Unrealised Gain,${(totalShortTermGain / 100).toFixed(2)}\n\n`;

		// All Unrealised Lots
		csv += 'Unrealised Tax Lots (FIFO)\n';
		csv +=
			'Holding,Code,Purchase Date,Units,Cost/Unit,Current Price,Unrealised Gain,Discount Eligible\n';
		const sortedLots = [...data.unrealisedLots].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);
		sortedLots.forEach((lot) => {
			csv += `${lot.holdingName},${lot.holdingCode},${formatDate(lot.date)},${lot.quantity},${(lot.costPerUnit / 100).toFixed(2)},${(lot.currentPrice / 100).toFixed(2)},${(lot.unrealisedGain / 100).toFixed(2)},${lot.isLongTerm ? 'Yes' : 'No'}\n`;
		});

		downloadCSV(csv, 'Unrealised-Gains-Report');
	}
</script>

<div class="mb-6">
	<a
		href="/portfolios/{portfolioId}"
		class="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="size-4" />
		Back to Portfolio
	</a>
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-semibold">Unrealised Gains</h1>
		<Button onclick={generateUnrealisedGainsReport}>
			<Download class="size-4" />
			<span>Download Report</span>
		</Button>
	</div>
</div>

<!-- Summary Cards -->
<div class="mb-8 grid gap-4 md:grid-cols-3">
	<div class="card">
		<p class="text-sm text-muted-foreground">Total Unrealised Gain</p>
		<p class="text-3xl font-bold {totalUnrealisedGain >= 0 ? '' : 'text-red-600'}">
			{formatCurrency(totalUnrealisedGain)}
		</p>
	</div>
	<div class="card">
		<p class="text-sm text-muted-foreground">Long-Term Unrealised Gain</p>
		<p class="text-3xl font-bold {totalLongTermGain >= 0 ? '' : 'text-red-600'}">
			{formatCurrency(totalLongTermGain)}
		</p>
		<p class="text-xs text-muted-foreground">Held &gt; 12 months (50% discount eligible)</p>
	</div>
	<div class="card">
		<p class="text-sm text-muted-foreground">Short-Term Unrealised Gain</p>
		<p class="text-3xl font-bold {totalShortTermGain >= 0 ? '' : 'text-red-600'}">
			{formatCurrency(totalShortTermGain)}
		</p>
		<p class="text-xs text-muted-foreground">Held ≤ 12 months</p>
	</div>
</div>

<!-- Unrealised Tax Lots -->
<div class="mb-8">
	<h2 class="mb-4 text-2xl font-bold">Unrealised Tax Lots (FIFO)</h2>
	<p class="mb-4 text-muted-foreground">
		Your current holdings broken down by purchase date for CGT purposes.
	</p>

	{#if data.unrealisedLots.length > 0}
		<div class="card">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Holding</Table.Head>
						<Table.Head>Purchase Date</Table.Head>
						<Table.Head class="text-right">Units</Table.Head>
						<Table.Head class="text-right">Cost/Unit</Table.Head>
						<Table.Head class="text-right">Current Price</Table.Head>
						<Table.Head class="text-right">Unrealised Gain</Table.Head>
						<Table.Head>Discount Status</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.unrealisedLots.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) as lot}
						<Table.Row>
							<Table.Cell class="font-medium">{lot.holdingName} ({lot.holdingCode})</Table.Cell>
							<Table.Cell>{formatDate(lot.date)}</Table.Cell>
							<Table.Cell class="text-right">{lot.quantity}</Table.Cell>
							<Table.Cell class="text-right">{formatCurrency(lot.costPerUnit)}</Table.Cell>
							<Table.Cell class="text-right">{formatCurrency(lot.currentPrice)}</Table.Cell>
							<Table.Cell class="text-right {lot.unrealisedGain >= 0 ? '' : 'text-red-600'}">
								{formatCurrency(lot.unrealisedGain)}
							</Table.Cell>
							<Table.Cell class="text-center">
								{#if lot.isLongTerm}
									<span class=" size-4 rounded-full bg-green-200 p-2 text-xs"
										><Check class="inline-block size-4 " /></span
									>
								{:else}
									<span class="rounded px-2 py-1 text-xs text-amber-800"
										><Minus class="inline-block size-4" /></span
									>
								{/if}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{:else}
		<div class="card py-8 text-center text-muted-foreground">
			No unrealised tax lots. Add transactions to see your tax lot breakdown.
		</div>
	{/if}
</div>

<!-- Holdings Summary -->
<div class="mb-8">
	<h2 class="mb-4 text-2xl font-bold">Holdings Summary</h2>
	{#if data.holdings.length > 0}
		<div class="card">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Holding</Table.Head>
						<Table.Head class="text-right">Units</Table.Head>
						<Table.Head class="text-right">Current Price</Table.Head>
						<Table.Head class="text-right">Current Value</Table.Head>
						<Table.Head class="text-right">Unrealised Gain</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.holdings as holding}
						<Table.Row>
							<Table.Cell class="font-medium">{holding.name} ({holding.code})</Table.Cell>
							<Table.Cell class="text-right">{holding.units}</Table.Cell>
							<Table.Cell class="text-right">{formatCurrency(holding.currentPrice)}</Table.Cell>
							<Table.Cell class="text-right">{formatCurrency(holding.currentValue)}</Table.Cell>
							<Table.Cell class="text-right {holding.unrealisedGain >= 0 ? '' : 'text-red-600'}">
								{formatCurrency(holding.unrealisedGain)}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.Cell colspan={3} class="font-medium">Total</Table.Cell>
						<Table.Cell class="text-right font-bold">
							{formatCurrency(data.holdings.reduce((sum, h) => sum + h.currentValue, 0))}
						</Table.Cell>
						<Table.Cell
							class="text-right font-bold {totalUnrealisedGain >= 0 ? '' : 'text-red-600'}"
						>
							{formatCurrency(totalUnrealisedGain)}
						</Table.Cell>
					</Table.Row>
				</Table.Footer>
			</Table.Root>
		</div>
	{:else}
		<div class="card py-8 text-center text-muted-foreground">No holdings found.</div>
	{/if}
</div>
