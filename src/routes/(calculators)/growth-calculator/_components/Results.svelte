<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';

	
	interface Props {
		// props
		principal: number;
		totalContributions: number;
		totalInterest: number;
		totalValue: number;
	}

	let {
		principal,
		totalContributions,
		totalInterest,
		totalValue
	}: Props = $props();
</script>

<h2>Outcome</h2>
<div class="grid grid-cols-3 gap-3">
	<div class="card">
		<p class="text-sm font- text-brand-light">Start Value</p>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(principal, false)}</p>
	</div>
	<div class="card">
		<p class="text-sm font-semibold text-brand-light">Contributions</p>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(totalContributions, false)}
		</p>
	</div>

	<div class="card">
		<p class="text-sm font-semibold text-brand-light">Interest</p>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(totalInterest, false)}</p>
	</div>

	<div class="card col-span-3">
		<p class="text-sm font-semibold text-brand-light">Total Value</p>
		<p class="font-semibold text-2xl md:text-2xl">{formatAsCurrency(totalValue, false)}</p>
	</div>
</div>
