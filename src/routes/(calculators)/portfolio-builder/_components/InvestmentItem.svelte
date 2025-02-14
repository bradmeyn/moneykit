<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Trash2 } from 'lucide-svelte';
	import Button from '$ui/button/button.svelte';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import { type PortfolioHolding, getPortfolioState } from '../calculator.svelte';
	let { holding }: { holding: PortfolioHolding } = $props();
	const { updateWeight, removeInvestment } = getPortfolioState();
</script>

<tr class="">
	<td>{holding.investment.code}</td>
	<td>{holding.investment.name}</td>
	<td class="text-right relative">
		{formatAsCurrency(holding.value)}
	</td>
	<td class="text-right relative w-16">
		<PercentageInput
			value={holding.weight}
			onchange={(value) => updateWeight(holding.investment.code, value)}
		/>
	</td>
	<td class="text-right">
		{#if holding.investment.code !== 'CASH'}
			<Button
				size="icon"
				variant="ghost"
				class="  text-muted hover:text-red-500"
				onclick={() => removeInvestment(holding.investment.code)}
			>
				<Trash2 class="size-4 " />
			</Button>
		{/if}
	</td>
</tr>
