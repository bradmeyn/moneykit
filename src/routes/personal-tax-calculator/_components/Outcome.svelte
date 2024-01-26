<script lang="ts">
	import { formatAsCurrency } from '$lib/utils';
</script>

<div class=" p-3 bg-slate-800 col-span-3">
	<h2 class="text-sm">Taxable Income</h2>
	<p class="font-bold text-2xl md:text-2xl">{formatAsCurrency(100000, false, true)}</p>
</div>
