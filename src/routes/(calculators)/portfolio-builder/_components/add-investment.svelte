<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Search } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { getPortfolioState } from '../calculator.svelte';
	import { ETF_MAP, getETFList, type ExchangeTradedFund } from '../investments';
	import { Button } from '$lib/components/ui/button';

	const { addInvestment } = getPortfolioState();
	const calc = getPortfolioState();

	let selectedInvestments = $derived(calc.portfolio.map((h) => h.investment.symbol));

	let search = $state('');
	let open = $state(false);

	let filteredInvestments = $derived(
		getETFList().filter((investment) => {
			const symbol = investment.symbol.toLowerCase();
			const name = investment.name.toLowerCase();
			const searchLower = search.toLowerCase();
			return (
				(symbol.includes(searchLower) && !selectedInvestments.includes(investment.symbol)) ||
				(name.includes(searchLower) && !selectedInvestments.includes(investment.symbol))
			);
		})
	);

	function handleAddInvestment(investment: ExchangeTradedFund) {
		addInvestment({
			investment,
			value: 0,
			weight: 0,
			cost: 0
		});
		search = '';
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="mb-2">
		<Button size="sm" class="w-full">Add Investment</Button>
	</Dialog.Trigger>

	<Dialog.Content class="bg-card">
		<h1>Add Investment</h1>

		<div class="relative w-full max-w-md cursor-pointer flex items-center text-muted-foreground">
			<Search class="absolute left-3 size-4 " />
			<Input
				placeholder="Search investment symbol or name"
				class="pl-10 py-5"
				bind:value={search}
				autofocus
			/>
		</div>

		<div>
			<ScrollArea class="w-full h-[200px]">
				<ul>
					{#each filteredInvestments as investment}
						<button
							class="border-t w-full cursor-pointer hover:bg-primary-dark/10 p-2 outline-none"
							onclick={() => handleAddInvestment(investment)}
						>
							<li class="text-start text-sm">
								<div class="text-white font-semibold">{investment.symbol}</div>
								<div class="text-muted-foreground">{investment.name}</div>
							</li>
						</button>
					{/each}
				</ul>
			</ScrollArea>
		</div>
	</Dialog.Content>
</Dialog.Root>
