<script lang="ts">
	import { getBudgetState } from '../budget.svelte';
	import Button from '$ui/button/button.svelte';
	import { X } from 'lucide-svelte';

	let budget = getBudgetState();
</script>

<div class=" border-brand rounded-lg p-4 mb-4 max-w-xl border mx-auto">
	<div class="flex items-start justify-between gap-10">
		<div>
			<h3 class="font-semibold">Saved Budget Found</h3>
			<p class="text-sm opacity-80 mb-2">Would you like to load your previously saved budget?</p>
			<Button size="sm" onclick={() => budget.loadBudget()}>Load Budget</Button>
		</div>
		<div>
			<Button onclick={() => (budget.showLoadPrompt = false)} variant="ghost" size="icon"
				><X /></Button
			>
		</div>
	</div>
</div>
