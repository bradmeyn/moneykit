<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import AddItem from './AddItem.svelte';

	interface Props {
		category?: string;
		type: 'Income' | 'Expense' | 'Savings';
		categoryTotal?: number;
		children: import('svelte').Snippet;
	}
	let { category = '', type, categoryTotal = 0, children }: Props = $props();
</script>

<Accordion.Root type="single" class="w-full">
	<Accordion.Item value={category}>
		<Accordion.Trigger
			class="flex justify-between px-4 py-2 w-full data-[state=open]:bg-ui-800 hover:bg-ui-800 rounded"
		>
			<div class="text-left">
				<h3 class="text-sm text-muted">{category}</h3>
				<p class="text-lg">{formatAsCurrency(categoryTotal, false)}</p>
			</div>
		</Accordion.Trigger>
		<Accordion.Content class="p-2">
			{@render children()}
			<AddItem {category} {type} />
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
