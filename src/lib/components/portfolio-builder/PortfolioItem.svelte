<script lang="ts">
	import { TableBodyCell, TableBodyRow, Input } from 'flowbite-svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import type { Holding } from '$lib/types';
	import { removeHolding, updateHolding } from '$lib/stores/portfolioStore';

	// Props
	export let holding: Holding;

	let editActive = false;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		updateHolding({ ...holding, allocation: Number(target.value) / 100 });
	}
</script>

<TableBodyRow>
	<TableBodyCell>{holding.investment.code}</TableBodyCell>
	<TableBodyCell>{holding.investment.name}</TableBodyCell>
	<TableBodyCell>{formatCurrency(holding.value)}</TableBodyCell>
	{#if editActive}
		<TableBodyCell>
			<Input let:props class="rounded ">
				<Icon icon="carbon:percentage" slot="right" class="w-5 h-5 text-emerald-300" />
				<input
					value={holding.allocation * 100}
					type="number"
					step="1"
					{...props}
					on:blur={() => (editActive = false)}
					autofocus
					on:input={handleInput}
				/>
			</Input>
		</TableBodyCell>
	{:else}
		<TableBodyCell>{formatPercentage(holding.allocation)}</TableBodyCell>
	{/if}
	<TableBodyCell>
		<button
			on:click={() => {
				editActive = !editActive;
			}}
			class="p-3 text-slate-400 hover:bg-slate-700 rounded hover:text-emerald-600"
		>
			{#if editActive}
				<Icon icon="bi:x" class="w-5 h-5" />
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
	</TableBodyCell>
</TableBodyRow>
