<!-- Updated LoadBudgetAlert.svelte -->
<script lang="ts">
	import { getBudgetState } from '../budget.svelte';
	import Button from '$ui/button/button.svelte';
	import { X, FileText } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	let budget = getBudgetState();
</script>

{#if budget.showLoadPrompt}
	<div
		class="fixed top-6 right-6 z-50 max-w-sm w-full"
		transition:slide={{ duration: 300, axis: 'x' }}
	>
		<div class="card rounded-lg p-4 shadow-lg backdrop-blur-sm">
			<div class="flex items-start gap-3">
				<div class="flex-shrink-0 mt-0.5">
					<FileText class="w-5 h-5 text-blue-400" />
				</div>
				<div class="flex-1">
					<h3 class="font-semibold text-white text-sm">Saved Budget Found</h3>
					<p class="text-xs text-gray-300 mt-1 mb-3">
						Would you like to load your previously saved budget?
					</p>
					<div class="flex gap-2">
						<Button
							size="sm"
							class="text-xs px-3 py-1.5 h-auto"
							onclick={() => budget.loadBudget()}
						>
							Load Budget
						</Button>
						<Button
							size="sm"
							variant="ghost"
							class="text-xs px-3 py-1.5 h-auto text-gray-400 hover:text-white"
							onclick={() => (budget.showLoadPrompt = false)}
						>
							Dismiss
						</Button>
					</div>
				</div>
				<Button
					onclick={() => (budget.showLoadPrompt = false)}
					variant="ghost"
					size="icon"
					class="flex-shrink-0 w-6 h-6 -mt-1 -mr-1 text-gray-400 hover:text-white"
				>
					<X class="w-4 h-4" />
				</Button>
			</div>
		</div>
	</div>
{/if}
