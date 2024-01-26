<script lang="ts">
	import { formatAsCurrency } from '$lib/utils';

	// props
	export let principal: number;
	export let totalContributions: number;
	export let totalInterest: number;
	export let totalValue: number;
</script>

<h2 class="text-2xl bold mb-2">Outcome</h2>
<div class="grid grid-cols-3 gap-3">
	<div class=" p-3 bg-slate-800">
		<h2 class="text-sm">Start Value</h2>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(principal, false, true)}</p>
	</div>
	<div class=" p-3 bg-slate-800">
		<h2 class="text-sm">Contributions</h2>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(totalContributions, false, true)}
		</p>
	</div>

	<div class=" p-3 bg-slate-800">
		<h2 class="text-sm">Interest</h2>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(totalInterest, false, true)}</p>
	</div>

	<div class=" p-3 bg-slate-800 col-span-3">
		<h2 class="text-sm">Total Value</h2>
		<p class="font-bold text-2xl md:text-2xl">{formatAsCurrency(totalValue, false, true)}</p>
	</div>
</div>
