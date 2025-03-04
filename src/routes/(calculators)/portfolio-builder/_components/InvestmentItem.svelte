<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Trash2 } from 'lucide-svelte';
	import Button from '$ui/button/button.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import { formatAsPercentage } from '$lib/utils/formatters';
	import { type PortfolioHolding, getPortfolioState } from '../calculator.svelte';
	let { holding }: { holding: PortfolioHolding } = $props();
	const { updateWeight, removeInvestment } = getPortfolioState();
</script>

<tr>
	<td>
		<div class="flex items-center gap-1">
			<span class="font-medium">{holding.investment.symbol}</span>
		</div>
		<div class="text-xs text-muted-foreground">
			{holding.investment.name}
		</div>
	</td>
	<td class="text-right relative">
		{formatAsCurrency(holding.value)}
	</td>
	<td class="text-right relative">
		{`${formatAsCurrency(holding.value * holding.investment.managementCost)} pa`}

		<div class="text-xs text-muted">
			{holding.investment.managementCost > 0
				? `${formatAsPercentage(holding.investment.managementCost)} pa`
				: 'N/A'}
		</div>
	</td>
	<td class="text-right relative w-28">
		<PercentageInput
			value={holding.weight}
			onchange={(value) => updateWeight(holding.investment.symbol, value)}
		/>
	</td>
	<td class="text-right">
		{#if holding.investment.symbol !== 'CASH'}
			<Button
				size="icon"
				variant="ghost"
				class="text-muted hover:text-red-500"
				onclick={() => removeInvestment(holding.investment.symbol)}
			>
				<Trash2 class="size-4" />
			</Button>
		{/if}
	</td>
</tr>
