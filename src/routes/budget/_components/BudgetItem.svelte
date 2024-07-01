<script lang="ts">
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { formatAsCurrency } from '$lib/utils';
	import type { BudgetItem } from '../types';
	import FrequencyInput from '$lib/components/inputs/FrequencySelect.svelte';

	export let i: BudgetItem;
</script>

<tr class="border-y border-y-slate-500">
	<td class="text-white p-2 text-sm w-48">{i.name}</td>
	<td class="text-white p-2 max-w-[80px]">
		<CurrencyInput name="test" label="" bind:value={i.amount} />
	</td>
	<td class="text-white p-2 w-40">
		<FrequencyInput bind:value={i.frequency} name={i.name + 'frequency'} showLabel={false} />
	</td>
	<td class="text-right min-w-[80px] text-lg font-semibold"
		>{formatAsCurrency(i.amount * i.frequency, false, true)}</td
	>
</tr>
