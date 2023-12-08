<script lang="ts">
	import { formatCurrency } from '$lib/utils';

	// props
	export let principal: number;
	export let totalContributions: number;
	export let totalInterest: number;
	export let totalValue: number;
</script>

<h2 class="text-2xl bold mb-2">Results</h2>
<div class="grid grid-cols-3 gap-3">
	<div class=" p-3 dark:bg-slate-800 bg-slate-50">
		<h2 class="text-sm">Start Value</h2>
		<p class="font-semibold text-lg md:text-xl">{formatCurrency(principal)}</p>
	</div>
	<div class=" p-3 dark:bg-slate-800 bg-slate-50">
		<h2 class="text-sm">Contributions</h2>
		<p class="font-semibold text-lg md:text-xl">{formatCurrency(totalContributions)}</p>
	</div>

	<div class=" p-3 dark:bg-slate-800 bg-slate-50">
		<h2 class="text-sm">Interest</h2>
		<p class="font-semibold text-lg md:text-xl">{formatCurrency(totalInterest)}</p>
	</div>

	<div class=" p-3 dark:bg-slate-800 bg-slate-50 col-span-3">
		<h2 class="text-sm">Total Value</h2>
		<p class="font-bold text-xl md:text-2xl">{formatCurrency(totalValue)}</p>
	</div>
</div>
