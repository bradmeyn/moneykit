<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$utils/formatters';
	import type { PortfolioType as Portfolio } from '../../calculator.svelte';

	let {
		portfolio1,
		portfolio2
	}: {
		portfolio1: Portfolio;
		portfolio2: Portfolio;
	} = $props();

	function getRows(portfolio: Portfolio) {
		const total = portfolio?.totalValue ?? 0;
		return (portfolio.holdings ?? []).map((h) => ({
			symbol: h.investment.symbol,
			name: h.investment.name,
			value: h.value,
			percent: total > 0 ? h.value / total : 0
		}));
	}

	const rows1 = getRows(portfolio1);
	const rows2 = getRows(portfolio2);
	const allSymbols = Array.from(
		new Set([...rows1.map((r) => r.symbol), ...rows2.map((r) => r.symbol)])
	);
</script>

<table class="w-full text-sm">
	<thead>
		<tr>
			<th class="text-left">Investment</th>
			<th class="text-right">Portfolio 1</th>
			<th class="text-right">Portfolio 2</th>
		</tr>
	</thead>
	<tbody>
		{#each allSymbols as symbol}
			<tr>
				<td
					>{rows1.find((r) => r.symbol === symbol)?.name ||
						rows2.find((r) => r.symbol === symbol)?.name}</td
				>
				<td class="text-right">
					{#if rows1.find((r) => r.symbol === symbol)}
						{formatAsCurrency(rows1.find((r) => r.symbol === symbol).value)}
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(rows1.find((r) => r.symbol === symbol).percent)}
						</div>
					{/if}
				</td>
				<td class="text-right">
					{#if rows2.find((r) => r.symbol === symbol)}
						{formatAsCurrency(rows2.find((r) => r.symbol === symbol).value)}
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(rows2.find((r) => r.symbol === symbol).percent)}
						</div>
					{/if}
				</td>
			</tr>
		{/each}
		<tr class="font-semibold border-t">
			<td>Total</td>
			<td class="text-right">{formatAsCurrency(portfolio1?.totalValue ?? 0)}</td>
			<td class="text-right">{formatAsCurrency(portfolio2?.totalValue ?? 0)}</td>
		</tr>
	</tbody>
</table>
