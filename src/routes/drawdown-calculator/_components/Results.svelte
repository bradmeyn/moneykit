<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import Card from '$lib/components/ui/Card.svelte';

	// props
	export let principal: number;
	export let totalContributions: number;
	export let totalInterest: number;
	export let totalValue: number;
</script>

<h2>Outcome</h2>
<div class="grid grid-cols-3 gap-3">
	<Card>
		<p class="text-sm font- text-brand-light">Start Value</p>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(principal, false)}</p>
	</Card>
	<Card>
		<p class="text-sm font-semibold text-brand-light">Contributions</p>
		<p class="font-semibold text-lg md:text-xl">
			{formatAsCurrency(totalContributions, false)}
		</p>
	</Card>

	<Card>
		<p class="text-sm font-semibold text-brand-light">Interest</p>
		<p class="font-semibold text-lg md:text-xl">{formatAsCurrency(totalInterest, false)}</p>
	</Card>

	<Card classes={'col-span-3'}>
		<p class="text-sm font-semibold text-brand-light">Total Value</p>
		<p class="font-semibold text-2xl md:text-2xl">{formatAsCurrency(totalValue, false)}</p>
	</Card>
</div>
