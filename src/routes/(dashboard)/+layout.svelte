<script>
	import '../../app.css';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { House, PiggyBank, Repeat2, Scale, HeartPulse } from 'lucide-svelte';

	import { page } from '$app/stores';

	$: activeUrl = $page.url.pathname;

	const navItems = [
		{ href: '/dashboard', icon: House, tooltip: 'Dashboard' },
		{ href: '/dashboard/budget', icon: PiggyBank, tooltip: 'Budget' },
		{ href: '/dashboard/balance-sheet', icon: Scale, tooltip: 'Balance Sheet' },
		{ href: '/dashboard/subscriptions', icon: Repeat2, tooltip: 'Subscriptions' },
		{ href: '/dashboard/insurances', icon: HeartPulse, tooltip: 'Insurances' }
	];
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="flex flex-col h-screen bg-gradient-to-b from-ui-800 to-ui-900">
	<header class="h-16 relative bg-ui-900">
		<div class=" mx-8 h-full flex justify-between items-center relative">
			<div class="flex items-center gap-8 w-full">
				<a href="/" class="flex items-center gap-2">
					<span class="text-white font-semibold text-xl"
						>Wealth<span
							class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
							>Kit</span
						></span
					>
				</a>
			</div>
		</div>
	</header>

	<div class="flex flex-1 overflow-hidden">
		<aside class="w-16 bg-ui-900 shadow-md">
			<nav>
				<ul class="space-y-4 py-4">
					{#each navItems as { href, icon: Icon, tooltip }}
						<li class="flex justify-center">
							<a
								{href}
								class="p-2 rounded-lg transition-colors group relative"
								class:text-ui-600={activeUrl !== href}
								class:hover:bg-ui-800={activeUrl !== href}
								class:text-brand-default={activeUrl === href}
								class:bg-ui-800={activeUrl === href}
							>
								<Icon size={20} />
								<span
									class="absolute left-full ml-2 px-2 py-1 bg-ui-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
								>
									{tooltip}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
		<main class="flex-1 overflow-auto px-20 py-16">
			<slot />
		</main>
	</div>
	<Footer />
</div>
