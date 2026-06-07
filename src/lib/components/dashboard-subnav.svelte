<script lang="ts">
	import { page } from '$app/state';

	const items = [
		{ href: '/dashboard', label: 'Overview', match: (p: string) => p === '/dashboard' },
		{
			href: '/dashboard/portfolios',
			label: 'Portfolios',
			match: (p: string) => p.startsWith('/dashboard/portfolios')
		},
		{
			href: '/dashboard/balance-sheet',
			label: 'Balance Sheet',
			match: (p: string) => p.startsWith('/dashboard/balance-sheet')
		},
		{
			href: '/dashboard/cashflow',
			label: 'Cashflow',
			match: (p: string) => p.startsWith('/dashboard/cashflow')
		},
		{
			href: '/dashboard/subscriptions',
			label: 'Subscriptions',
			match: (p: string) => p.startsWith('/dashboard/subscriptions')
		},
		{
			href: '/dashboard/insurances',
			label: 'Insurances',
			match: (p: string) => p.startsWith('/dashboard/insurances')
		}
	];

	const currentPath = $derived(page.url.pathname);
</script>

<div class="border-b bg-card">
	<div class="container">
		<nav class="flex gap-1">
			{#each items as item}
				<a
					href={item.href}
					class="border-b-2 px-3 py-2.5 text-sm font-medium transition-colors {item.match(
						currentPath
					)
						? 'border-primary text-primary'
						: 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</div>
