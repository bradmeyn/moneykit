<script lang="ts">
	import { FREQUENCIES } from '$lib/constants/frequencies';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import BudgetCardMenu from './budget-card-menu.svelte';
	import { getBudgetState, calculateCategoryTotal, type BudgetItem } from '../budget.svelte';
	import BudgetTable from './budget-table.svelte';
	import BudgetAccordion from './budget-accordion.svelte';
	import Button from '$ui/button/button.svelte';
	import AddItemDialog from './add-item-dialog.svelte';
	import { Trash } from 'lucide-svelte';
	import ClearAllDialog from './clear-all-dialog.svelte';

	let {
		type,
		total,
		categories,
		items
	}: {
		categories: string[];
		type: BudgetItem['type'];
		total: number;
		items: BudgetItem[];
	} = $props();

	const budget = getBudgetState();

	function changeFrequency() {
		const keys = Object.keys(FREQUENCIES) as (keyof typeof FREQUENCIES)[];
		const currentIndex = keys.indexOf(budget.frequency);
		const nextIndex = (currentIndex + 1) % keys.length;
		budget.frequency = keys[nextIndex];
	}

	const title: Record<BudgetItem['type'], string> = {
		income: 'Income',
		expense: 'Expenses',
		savings: 'Savings'
	};
</script>

<div class="card">
	<div class="flex items-start justify-between">
		<div>
			<h2 class="card-heading mb-2">{title[type]}</h2>
			<div class="flex items-baseline gap-2">
				<p class={`text-2xl font-semibold  ${total < 0 ? 'text-red-400' : ''}`}>
					{formatAsCurrency(total)}
				</p>
				<button class=" text-muted-foreground hover:cursor-pointer" onclick={changeFrequency}>
					/ {FREQUENCIES[budget.frequency].singular}
				</button>
			</div>
		</div>
		<BudgetCardMenu {type} />
	</div>

	<div class="mt-2">
		{#each categories as category}
			{@const categoryItems = items.filter((i) => i.category === category && i.type === type)}

			<BudgetAccordion
				{type}
				{category}
				categoryTotal={calculateCategoryTotal(items, category, budget.frequency)}
			>
				<BudgetTable items={categoryItems} />
				<div class="flex items-center gap-2 justify-end mt-2">
					<AddItemDialog {category} {type} />
					{#if categoryItems.length > 0}
						<ClearAllDialog
							onDelete={() => budget.deleteItemsByCategory(type, category)}
							text={`all ${category} items`}
						>
							{#snippet trigger()}
								<Button variant="secondary" size="sm">Delete All</Button>
							{/snippet}
						</ClearAllDialog>
					{:else}
						<Button
							variant="secondary"
							size="sm"
							onclick={() => budget.deleteCategory(type, category)}>Delete Category</Button
						>
					{/if}
				</div>
			</BudgetAccordion>
		{/each}
	</div>
</div>
