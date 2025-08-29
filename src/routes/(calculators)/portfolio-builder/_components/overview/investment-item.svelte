<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Trash2, EllipsisVertical } from 'lucide-svelte';
	import Button from '$ui/button/button.svelte';
	import PercentageInput from '$lib/components/inputs/percentage-input.svelte';
	import { formatAsPercentage } from '$lib/utils/formatters';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import EditInvestmentDialog from './edit-investment-dialog.svelte';
	import type { PortfolioHolding, PortfolioType } from '../../calculator.svelte';
	const {
		holding,
		portfolio
	}: {
		holding: PortfolioHolding;
		portfolio: PortfolioType;
	} = $props();
</script>

<!-- Desktop row -->
<tr class="hidden md:table-row">
	<td>
		<div class="font-semibold text-base">{holding.investment.symbol}</div>
		<div class="text-muted-foreground">{holding.investment.name}</div>
	</td>
	<td class="text-right text-base">
		{formatAsCurrency(holding.weight * portfolio.totalValue)}
	</td>
	<td class="text-right w-28">
		{#if holding.investment.symbol !== 'CASH'}
			<PercentageInput
				value={holding.weight}
				onchange={(value) => portfolio.updateWeight(holding.investment.symbol, value)}
			/>
		{:else}
			<div>{formatAsPercentage(holding.weight)}</div>
		{/if}
	</td>
	<td class="text-right">
		{#if holding.investment.symbol !== 'CASH'}
			<Button
				size="icon"
				variant="ghost"
				class="text-m hover:text-red-500"
				onclick={() => portfolio.removeInvestment(holding.investment.symbol)}
			>
				<Trash2 class="size-4" />
			</Button>
		{/if}
	</td>
</tr>

<!-- Mobile row -->
<tr class="md:hidden">
	<td class="font-semibold">
		{holding.investment.symbol}
	</td>
	<td class="text-right">
		{formatAsCurrency(holding.weight * portfolio.totalValue)}
	</td>
	<td class="text-right">
		{formatAsPercentage(holding.weight)}
	</td>
	<td class="text-right px-0">
		{#if holding.investment.symbol !== 'CASH'}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button size="icon" variant="ghost">
						<EllipsisVertical />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
							<EditInvestmentDialog {holding} {portfolio} />
						</DropdownMenu.Item>
						<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
							<button
								class="flex items-center gap-2"
								onclick={() => portfolio.removeInvestment(holding.investment.symbol)}
							>
								<Trash2 />
								<span>Delete</span>
							</button>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</td>
</tr>
