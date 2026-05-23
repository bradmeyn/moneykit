<script lang="ts">
	import { page } from '$app/state';
	import * as DropdownMenu from '$ui/dropdown-menu';
	import { ChevronDown, FileText, TrendingUp } from '@lucide/svelte';

	const portfolioId = $derived(page.url.pathname.match(/^\/portfolios\/([^/]+)/)?.[1]);
</script>

<header class="border-b bg-card">
	<div class="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
		<a href="/" class="text-xl font-medium tracking-tight">
			Money<span class="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary-dark"
				>Kit</span
			>
		</a>
		<nav class="flex items-center space-x-6">
			<a href="/portfolios" class="py-1 text-primary">Portfolios</a>
			{#if portfolioId}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="flex items-center gap-1 py-1 text-foreground hover:text-primary"
					>
						Reports
						<ChevronDown class="size-4" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>
							<a href="/portfolios/{portfolioId}/reports/cgt" class="flex w-full items-center">
								<FileText class="mr-2 size-4" />
								CGT Report
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<a
								href="/portfolios/{portfolioId}/reports/unrealised-gains"
								class="flex w-full items-center"
							>
								<TrendingUp class="mr-2 size-4" />
								Unrealised Gains
							</a>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</nav>
	</div>
</header>
