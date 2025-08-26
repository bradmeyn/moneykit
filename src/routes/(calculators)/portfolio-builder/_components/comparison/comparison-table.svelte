<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';

	type ComparisonView = 'value' | 'cost';

	let {
		portfolio1,
		portfolio2,
		view = 'value',
		title
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
		view?: ComparisonView;
		title?: string;
	} = $props();

	function getRows(portfolio: Portfolio, view: ComparisonView) {
		if (view === 'value') {
			const total = portfolio?.totalValue ?? 0;
			return (portfolio.holdings ?? []).map((h) => ({
				symbol: h.investment.symbol,
				name: h.investment.name,
				primaryValue: h.value,
				secondaryValue: total > 0 ? h.value / total : 0,
				secondaryLabel: formatAsPercentage(total > 0 ? h.value / total : 0)
			}));
		} else {
			return (portfolio.holdings ?? []).map((h) => ({
				symbol: h.investment.symbol,
				name: h.investment.name,
				primaryValue: h.cost,
				secondaryValue: h.investment.managementCost,
				secondaryLabel: `${formatAsPercentage(h.investment.managementCost)} pa`
			}));
		}
	}

	const rows1 = getRows(portfolio1, view);
	const rows2 = getRows(portfolio2, view);
	const allSymbols = Array.from(
		new Set([...rows1.map((r) => r.symbol), ...rows2.map((r) => r.symbol)])
	);

	// Calculate totals based on view
	const total1 = view === 'value' ? (portfolio1?.totalValue ?? 0) : (portfolio1?.totalCost ?? 0);
	const total2 = view === 'value' ? (portfolio2?.totalValue ?? 0) : (portfolio2?.totalCost ?? 0);

	// Calculate weighted average fees for cost view
	const weightedAvgFee1 =
		view === 'cost' && portfolio1 && portfolio1.totalAllocated > 0
			? portfolio1.totalCost / portfolio1.totalAllocated
			: 0;
	const weightedAvgFee2 =
		view === 'cost' && portfolio2 && portfolio2.totalAllocated > 0
			? portfolio2.totalCost / portfolio2.totalAllocated
			: 0;

	const totalLabel = view === 'value' ? 'Total' : 'Total Cost';
</script>

{#if title}
	<h2 class="card-heading">{title}</h2>
{/if}

<div class="overflow-x-auto">
	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left">Investment</th>
				<th class="text-right">Portfolio 1</th>
				<th class="text-right">Portfolio 2</th>
			</tr>
		</thead>
		<tbody>
			{#each allSymbols as symbol}
				{@const row1 = rows1.find((r) => r.symbol === symbol)}
				{@const row2 = rows2.find((r) => r.symbol === symbol)}
				<tr>
					<td>
						<div class="font-semibold">{symbol}</div>
						<div class="text-muted-foreground hidden md:block">{row1?.name || row2?.name}</div>
					</td>
					<td class="text-right">
						{#if row1}
							<div>{formatAsCurrency(row1.primaryValue)}</div>
							<div class="text-sm text-muted-foreground">
								{row1.secondaryLabel}
							</div>
						{/if}
					</td>
					<td class="text-right">
						{#if row2}
							<div>{formatAsCurrency(row2.primaryValue)}</div>
							<div class="text-sm text-muted-foreground">
								{row2.secondaryLabel}
							</div>
						{/if}
					</td>
				</tr>
			{/each}
			<tr class="font-semibold border-t">
				<td>{totalLabel}</td>
				<td class="text-right">
					<div>{formatAsCurrency(total1)}</div>
					{#if view === 'cost'}
						<div class="text-sm text-muted-foreground font-normal">
							{formatAsPercentage(weightedAvgFee1)} pa
						</div>
					{/if}
				</td>
				<td class="text-right">
					<div>{formatAsCurrency(total2)}</div>
					{#if view === 'cost'}
						<div class="text-sm text-muted-foreground font-normal">
							{formatAsPercentage(weightedAvgFee2)} pa
						</div>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
