<script lang="ts">
	import { formatAsCurrency } from '$lib/utils';

	// props
	export let principal: number;
	export let totalContributions: number;
	export let totalInterest: number;
	export let totalValue: number;
</script>

<h2>Outcome</h2>
<div class="grid grid-cols-3 gap-3">
	<div class="p-3 bg-slate-800">
		<p class="text-sm font-semibold">Start Value</p>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(principal, false, true)}</p>
	</div>
	<div class="p-3 bg-slate-800">
		<p class="text-sm font-semibold">Contributions</p>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(totalContributions, false, true)}
		</p>
	</div>

	<div class="p-3 bg-slate-800">
		<p class="text-sm font-semibold">Interest</p>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(totalInterest, false, true)}</p>
	</div>

	<div class="p-3 bg-slate-800 col-span-3">
		<p class="text-sm font-semibold">Total Value</p>
		<p class="font-semibold text-2xl md:text-2xl">{formatAsCurrency(totalValue, false, true)}</p>
	</div>
</div>
