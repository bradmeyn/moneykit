<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';
	import Icon from '@iconify/svelte';
	import type { Holding } from '$lib/types';
	import { removeHolding, updateHolding } from '$lib/stores/portfolioStore';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';

	// Props
	export let holding: Holding;

	let editActive = false;
	let editedAllocationValue = (holding.allocation * 100).toFixed(2);

	function handleBlur() {
		const valueAsNumber = Number(editedAllocationValue);
		const allocation = Number((valueAsNumber / 100).toFixed(2)); // Round to two decimal places
		updateHolding({ ...holding, allocation: allocation });
		editActive = false;
	}
</script>

<tr>
	<td>{holding.investment.code}</td>
	<td>{holding.investment.name}</td>
	<td>{formatAsCurrency(holding.value, false)}</td>

	{#if editActive}
		<td>
			<!-- <PercentageInput
				value={editedAllocationValue}
				on:input={(e) => {
					editedAllocationValue = e.target.value;
				}}
				on:blur={handleBlur}
			/> -->
		</td>
	{:else}
		<td>{formatAsPercentage(holding.allocation)}</td>
	{/if}
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
				on:click={() => {
					editActive = !editActive;
				}}
				class="p-3 text-slate-400 hover:bg-slate-700 rounded hover:text-brand-default"
			>
				{#if editActive}
					<Icon icon="bi:x-lg" class="w-5 h-5" />
				{:else}
					<Icon icon="bi:pencil" class="w-5 h-5" />
				{/if}
			</button>
			<button
				class="p-3 text-slate-400 hover:bg-slate-700 rounded hover:text-red-600"
				on:click={() => removeHolding(holding.investment.code)}
			>
				<Icon icon="bi:trash" class="w-5 h-5" />
			</button>
		{/if}
	</td>
</tr>
