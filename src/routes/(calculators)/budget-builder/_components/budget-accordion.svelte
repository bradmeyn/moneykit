<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { type BudgetItem, getBudgetState } from '../budget.svelte';

	let {
		category = '',
		type,
		categoryTotal = 0,
		children
	}: {
		category?: string;
		type: BudgetItem['type'];
		categoryTotal?: number;
		children: import('svelte').Snippet;
	} = $props();
</script>

<Accordion.Root type="single" class="w-full">
	<Accordion.Item value={category}>
		<Accordion.Trigger class="flex justify-between px-4 py-2 w-full border-b rounded-none">
			<div class="text-left">
				<h3 class="text-sm text-muted-foreground">{category}</h3>
				<p class="text-lg">{formatAsCurrency(categoryTotal, false)}</p>
			</div>
		</Accordion.Trigger>
		<Accordion.Content class="p-2">
			{@render children()}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
