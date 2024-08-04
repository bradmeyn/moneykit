<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import Icon from '@iconify/svelte';
	import type { Holding } from '../types';
	import { removeHolding, updateHolding } from '../store';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';

	export let holding: Holding;
	export let portfolioId: number;

	function handleWeightingChange(event: CustomEvent<number>) {
		console.log(event.detail);
		const weighting = event.detail;
		updateHolding(portfolioId, { ...holding, weighting });
	}
</script>

<tr>
	<td>{holding.investment.code}</td>
	<td>{holding.investment.name}</td>
	<td>{formatAsCurrency(holding.value, false)}</td>

	<td><PercentageInput value={holding.weighting} on:input={handleWeightingChange} /></td>

	{#if holding.investment.code !== 'CASH'}
		<td>{formatAsPercentage(holding.investment.cost)}</td>
		<td>{formatAsCurrency(holding.cost, true)}</td>
	{:else}
		<td />
		<td />
	{/if}
	<td>
		{#if holding.investment.code !== 'CASH'}
			<button
				class="p-3 text-slate-400 hover:bg-slate-700 rounded hover:text-red-600"
				on:click={() => removeHolding(portfolioId, holding.investment.code)}
			>
				<Icon icon="bi:trash" class="w-5 h-5" />
			</button>
		{/if}
	</td>
</tr>
