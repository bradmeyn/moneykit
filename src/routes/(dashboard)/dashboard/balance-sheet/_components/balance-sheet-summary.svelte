<script lang="ts">
	import { formatCurrency, formatPercentage } from '$utils/formatters';

	let {
		totalAssets,
		totalLiabilities
	}: {
		totalAssets: number;
		totalLiabilities: number;
	} = $props();

	let networth = $derived(totalAssets - totalLiabilities);
	let assetPercentage = $derived(formatPercentage(totalAssets / (totalAssets + totalLiabilities)));
	let liabilityPercentage = $derived(
		formatPercentage(totalLiabilities / (totalAssets + totalLiabilities))
	);
</script>

<div class="card">
	<p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Net Worth</p>
	<p class="mt-1 text-4xl font-medium tracking-tight tabular-nums">
		{formatCurrency(networth)}
	</p>

	<div class="h-3 flex rounded-lg overflow-auto mt-4">
		<div class="bg-primary h-full" style="width: {assetPercentage};"></div>
		<div class="bg-red-600 h-full" style="width: {liabilityPercentage};"></div>
	</div>
</div>
