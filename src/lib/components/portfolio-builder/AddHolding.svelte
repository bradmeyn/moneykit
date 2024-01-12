<script lang="ts">
	import { INVESTMENTS } from '$lib/constants';
	import { Modal, Button, Input } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import type { Holding, Investment } from '$lib/types';

	export let addHolding: (holding: Holding) => void;

	let isModalOpen = false; // Reactive variable for the modal
	let searchTerm = ''; // Reactive variable for the search term
	let selectedInvestments: Investment[] = []; // Reactive variable for the selected investment

	// Reactive filtering of investments
	$: filteredInvestments = searchTerm
		? INVESTMENTS.filter(
				(investment) =>
					investment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
					investment.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: INVESTMENTS;

	function handleClick(investment: Investment) {
		if (selectedInvestments.includes(investment)) {
			selectedInvestments = selectedInvestments.filter((i) => i !== investment);
		} else {
			selectedInvestments = [...selectedInvestments, investment];
		}
	}

	function addHoldings() {
		selectedInvestments.forEach((investment) => {
			addHolding({
				investment,
				allocation: 0,
				cost: 0,
				value: 0
			});
		});
		isModalOpen = false;
	}
</script>

<Button class="mt-5 rounded ml-auto block" on:click={() => (isModalOpen = true)}>
	Add holding
</Button>

<Modal
	title="Add Portfolio Holding"
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
	<div class="max-h-60 overflow-y-auto">
		{#each filteredInvestments as investment}
			<button
				on:click={() => handleClick(investment)}
				class={'text-sm p-2 flex items-center justify-start w-full border-t border-1 border-slate-700  cursor-pointer ' +
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
	<Button
		class="mt-5 rounded ml-auto block"
		disabled={selectedInvestments.length === 0}
		on:click={addHoldings}
	>
		Add holdings
	</Button>
</Modal>
