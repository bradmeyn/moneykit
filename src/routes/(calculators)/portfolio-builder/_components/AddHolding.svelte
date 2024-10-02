<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import type { Holding, Investment } from '../types';
	import { addHolding } from '../store';
	import { INVESTMENTS } from '../constants';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import SearchInput from '$lib/components/inputs/SearchInput.svelte';
	import { Check } from 'lucide-svelte';

	export let portfolioId: number;

	let isModalOpen = false;
	let searchTerm = '';
	let newHoldings: Holding[] = [];

	$: if (!isModalOpen) {
		searchTerm = '';
		newHoldings = [];
	}

	// Reactive filtering of investments
	$: filteredInvestments = searchTerm
		? INVESTMENTS.filter(
				(investment) =>
					investment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
					investment.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: INVESTMENTS;

	$: selectedInvestments = newHoldings.map((holding) => holding.investment);

	function selectInvestment(investment: Investment) {
		newHoldings = [...newHoldings, { investment, weighting: 0, value: 0, cost: 0 }];
	}

	function unselectInvestment(investment: Investment) {
		newHoldings = newHoldings.filter((holding) => holding.investment !== investment);
	}

	function addHoldings() {
		newHoldings.forEach((holding) => {
			addHolding(portfolioId, holding);
		});
		newHoldings = [];
		isModalOpen = false;
	}
</script>

<Dialog
	title="Add Portfolio Holdings"
	description="Add holdings to your portfolio"
	onAction={addHoldings}
	actionText="Add Holdings"
	triggerText="Add Holding"
	disabled={!newHoldings.length}
>
	<SearchInput bind:value={searchTerm} placeholder="Search investments" class="mb-2" />

	<div class="max-h-40 overflow-y-auto my-4">
		{#each filteredInvestments as investment, i}
			<button
				on:click={() =>
					selectedInvestments.includes(investment)
						? unselectInvestment(investment)
						: selectInvestment(investment)}
				class={'text-sm p-2 flex items-center rounded justify-start w-full border-t border-1 border-ui-700 cursor-pointer ' +
					(selectedInvestments.includes(investment)
						? 'bg-ui-700 text-white border-brand-default'
						: 'bg-transparent text-ui-200 hover:bg-ui-700 hover:text-white')}
			>
				<span class="w-14 inline-block text-start">{investment.code}</span><span
					>{investment.name}</span
				>
				{#if selectedInvestments.includes(investment)}
					<Check class="size-4 text-brand-default ml-auto" />
				{/if}
			</button>
		{/each}
	</div>

	{#if newHoldings.length > 0}
		<div class="mt-5">
			<h3 class="text-lg text-white">Selected investments</h3>
			<ul class="mt-2">
				{#each newHoldings as h}
					<li
						class="text-sm border-t flex p-1 items-center justify-between gap-2 border-1 border-ui-700 text-white"
					>
						<div class="flex items-center justify-between gap-2">
							<span>{h.investment.name}</span>
						</div>
						<div class="w-20">
							<PercentageInput bind:value={h.weighting} />
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</Dialog>
