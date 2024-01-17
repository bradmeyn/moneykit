<script lang="ts">
	import { INVESTMENTS } from '$lib/constants';
	import { Modal, Button, Input } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import type { Holding, Investment } from '$lib/types';
	import PercentageInput from '../../../lib/components/PercentageInput.svelte';

	// Props
	export let addHolding: (holding: Holding) => void;

	let isModalOpen = false;
	let searchTerm = '';
	let newHoldings: Holding[] = [];

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
		newHoldings = [...newHoldings, { investment, allocation: 0, value: 0 }];
	}

	function unselectInvestment(investment: Investment) {
		newHoldings = newHoldings.filter((holding) => holding.investment !== investment);
	}

	function addHoldings() {
		newHoldings.forEach((holding) => {
			addHolding({ ...holding, allocation: holding.allocation / 100 });
		});
		newHoldings = [];
		isModalOpen = false;
	}
</script>

<Button size="lg" class="mt-5 rounded mr-auto block" on:click={() => (isModalOpen = true)}>
	Add holdings
</Button>

<Modal
	title="Add Portfolio Holdings"
	bind:open={isModalOpen}
	placement={'top-center'}
	class="mt-20"
	outsideclose
>
	<div class="mb-6">
		<Input
			id="newHolding"
			type="text"
			placeholder="Search investment name or code"
			size="lg"
			bind:value={searchTerm}
		>
			<Icon icon="carbon:search" slot="left" class="w-5 h-5 rounded text-emerald-300" />
		</Input>
	</div>
	<div class="max-h-40 overflow-y-auto">
		{#each filteredInvestments as investment, i}
			<button
				on:click={() => selectInvestment(investment)}
				class={'text-sm p-2 flex items-center justify-start w-full border-t border-1 border-slate-700 cursor-pointer ' +
					(selectedInvestments.includes(investment)
						? 'bg-slate-600 text-white'
						: 'bg-transparent text-slate-200 hover:bg-emerald-600 hover:text-white')}
			>
				<span class="w-14 inline-block text-start">{investment.code}</span><span
					>{investment.name}</span
				>
				{#if selectedInvestments.includes(investment)}
					<Icon icon="carbon:checkmark" class="w-5 h-5 ml-auto" />
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
						class="text-sm border-t flex items-center justify-between gap-2 border-1 border-slate-700 text-white"
					>
						<div class="flex items-center justify-between gap-2">
							<span class="w-14 inline-block text-start">{h.investment.code}</span>
							<span>{h.investment.name}</span>
						</div>
						<PercentageInput bind:value={h.allocation} size="sm" />
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<Button
		class="mt-5 rounded ml-auto block"
		disabled={selectedInvestments.length === 0}
		on:click={addHoldings}
	>
		Add holdings
	</Button>
</Modal>
