<script lang="ts">
	import AddPortfolioDialog from '$lib/components/portfolio/add-portfolio-dialog.svelte';
	import { getPortfolios } from '$lib/remotes/portfolio.remote';
	import { ChevronRight } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-3xl py-4">
	<div class="mb-6 flex items-center justify-between pt-6">
		<h1 class="text-4xl">Portfolios</h1>
		<AddPortfolioDialog />
	</div>
	<svelte:boundary>
		{#snippet pending()}
			<div class="mb-3 h-7 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
		{/snippet}
	</svelte:boundary>

	{#each await getPortfolios() as portfolio}
		<a
			href="/portfolios/{portfolio.id}"
			class="card flex items-center justify-between transition-all hover:border-primary hover:shadow-sm"
		>
			<div>
				<div class="text-lg font-medium">
					{portfolio.name}
				</div>
				<p class="text-sm text-muted-foreground">
					{portfolio.holdings ? portfolio.holdings.length : 0} holdings
				</p>
			</div>
			<ChevronRight class="size-5 text-muted-foreground" />
		</a>
	{/each}

	{#if (await getPortfolios()).length === 0}
		<div class="rounded-xl bg-gray-50 p-4">
			<p class="text-center text-muted-foreground">
				No portfolios found. Add a portfolio to get started.
			</p>
		</div>
	{/if}
</div>
