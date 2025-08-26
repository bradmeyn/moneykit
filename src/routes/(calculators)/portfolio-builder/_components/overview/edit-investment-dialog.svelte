<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import PercentageInput from '$lib/components/inputs/percentage-input.svelte';
	import type { PortfolioHolding, PortfolioType } from '../../calculator.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { Pencil } from 'lucide-svelte';

	let {
		holding,
		portfolio
	}: {
		holding: PortfolioHolding;
		portfolio: PortfolioType;
	} = $props();

	let open = $state(false);
	let editedWeight = $state(holding.weight);

	function handleSubmit() {
		portfolio.updateWeight(holding.investment.symbol, editedWeight);
		open = false;
	}

	function handleCancel() {
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<button class="flex items-center gap-2 w-full">
			<Pencil />
			<span>Edit</span>
		</button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[400px]">
		<Dialog.Header>
			<Dialog.Title class="text-left">Edit Investment</Dialog.Title>
			<Dialog.Description class="text-left"
				>Edit the allocation for {holding.investment.name} ({holding.investment
					.symbol}).</Dialog.Description
			>
		</Dialog.Header>
		<div class="space-y-4 py-4">
			<div>
				<label class="text-sm font-medium">Current Value</label>
				<div>{formatAsCurrency(holding.weight * portfolio.totalValue)}</div>
			</div>
			<div>
				<label class="text-sm font-medium">Allocation (%)</label>
				<PercentageInput bind:value={editedWeight} />
			</div>
		</div>
		<Dialog.Footer class="flex gap-2">
			<Button variant="outline" onclick={handleCancel}>Cancel</Button>
			<Button onclick={handleSubmit}>Update</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
