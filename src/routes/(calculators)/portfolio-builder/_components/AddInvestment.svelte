<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Search } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { type Investment, getPortfolioState, investmentList } from '../calculator.svelte';

	const { addInvestment } = getPortfolioState();
	const calc = getPortfolioState();

	let selectedInvestments = $derived(calc.portfolio.map((h) => h.investment.code));

	let search = $state('');
	let open = $state(false);

	let filteredInvestments = $derived(
		investmentList.filter((investment) => {
			const code = investment.code.toLowerCase();
			const name = investment.name.toLowerCase();
			const searchLower = search.toLowerCase();
			return (
				(code.includes(searchLower) && !selectedInvestments.includes(investment.code)) ||
				(name.includes(searchLower) && !selectedInvestments.includes(investment.code))
			);
		})
	);

	function handleAddInvestment(investment: Investment) {
		addInvestment({
			investment,
			value: 0,
			weight: 0
		});
		search = '';
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="mb-2">
		<div class="relative w-full min-w-96 cursor-pointer flex items-center text-muted">
			<Input placeholder="Add investment..." readonly class="pl-10 block w-full " />
			<Search class="absolute left-3 size-4 " />
		</div>
	</Dialog.Trigger>

	<Dialog.Content>
		<h1>Add Investment</h1>

		<div class="relative w-full max-w-md cursor-pointer flex items-center text-muted">
			<Search class="absolute left-3 size-4 " />
			<Input
				placeholder="Search investment code or name"
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
							class="border-t-1 border-t w-full cursor-pointer hover:bg-primary-dark/10 p-2 outline-none"
							onclick={() => handleAddInvestment(investment)}
						>
							<li class="text-start">
								<div class="text-white font-semibold">{investment.code}</div>
								<div class="text-muted">{investment.name}</div>
							</li>
						</button>
					{/each}
				</ul>
			</ScrollArea>
		</div>
	</Dialog.Content>
</Dialog.Root>
