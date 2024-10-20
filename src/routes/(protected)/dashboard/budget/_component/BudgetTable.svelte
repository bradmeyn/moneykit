<script lang="ts">
	import { formatAsCurrency, getFrequencyLabel } from '$lib/utils/formatters';
	import AddItem from './AddItem.svelte';

	export let title: string;
	export let items: Array<{
		name: string;
		value: number;
		frequency: number;
		category: string;
	}>;
	export let total: number;

	function calculateAnnualValue(value: number, frequency: number): number {
		return value * frequency;
	}
</script>

<section class="card">
	<div>
		<h2>{title}</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(total)}
		</p>

		<AddItem />
	</div>

	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Name</th>
				<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
				<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
				<th class="text-right text-sm text-ui-400 p-2 border-t-transparent">Annual Total</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.name)}
				<tr class="text-white">
					<td class="p-2">{item.name}</td>
					<td class="p-2">{formatAsCurrency(item.value)}</td>
					<td class="p-2">{getFrequencyLabel(item.frequency)}</td>
					<td class="p-2 text-right">
						{formatAsCurrency(calculateAnnualValue(item.value, item.frequency))}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
