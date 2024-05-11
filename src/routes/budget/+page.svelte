<script lang="ts">
	import { AccordionItem, Accordion } from 'flowbite-svelte';

	let expense = [
		{
			id: 1,
			category: 'Food',
			amount: 100,
			description: 'Groceries'
		},
		{
			id: 2,
			category: 'Transportation',
			amount: 50,
			description: 'Gas'
		},
		{
			id: 3,
			category: 'Entertainment',
			amount: 200,
			description: 'Movies'
		}
	];

	$: total = expense.reduce((acc, item) => acc + item.amount, 0);
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1>Budget</h1>

	<div class="max-w-[700px]">
		<Accordion>
			{#each expense as item (item.id)}
				<AccordionItem
					title={item.category}
					subtitle={item.amount}
					defaultClass=" w-full flex items-center justify-between w-full font-medium text-left"
				>
					<div slot="header" class="flex justify-between w-full text-lg">
						<span>Category</span> <span class="mr-4">$0.00</span>
					</div>
				</AccordionItem>
			{/each}
		</Accordion>

		<div class="flex justify-between mt-4">
			<div>Total</div>
			<div>{total}</div>
		</div>
	</div>
</main>
