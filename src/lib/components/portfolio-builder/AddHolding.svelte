<script lang="ts">
	import { INVESTMENTS } from '$lib/constants';
	import { Modal, Button, Input } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import type { Holding, Investment } from '$lib/types';

	export let addHolding: (holding: Holding) => void;

	let clickOutsideModal = false;
	let searchTerm = ''; // Reactive variable for the search term

	// Reactive filtering of investments
	$: filteredInvestments = searchTerm
		? INVESTMENTS.filter(
				(investment) =>
					investment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
					investment.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: INVESTMENTS;

	function handleClick(investment: Investment) {
		// Add the holding to the portfolio
		addHolding({
			investment,
			allocation: 0,
			value: 0
		});
		clickOutsideModal = false;
	}
</script>

<Button class="mt-5 rounded ml-auto block" on:click={() => (clickOutsideModal = true)}>
	Add holding
</Button>

<Modal
	title="Add Portfolio Holding"
	bind:open={clickOutsideModal}
	placement={'top-center'}
	class="mt-20"
	autoclose
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
				class="text-sm p-2 border-t border-1 border-slate-700 text-slate-200 hover:text-white hover:bg-emerald-700 cursor-pointer"
			>
				<span class="w-14 inline-block">{investment.code}</span><span>{investment.name}</span>
			</button>
		{/each}
	</div>
</Modal>
