<script lang="ts">
	import LinkCard from './_components/LinkCard.svelte';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const links = [
		{
			name: 'Growth Calculator',
			href: 'growth-calculator',
			description: 'Project your investment growth with our powerful calculator',
			iconPath: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6'
		},
		{
			name: 'Budget',
			href: 'budget-builder',
			description: 'Create and manage your personal budget with ease',
			iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
		},
		{
			name: 'Portfolio Builder',
			href: 'portfolio-builder',
			description: 'Design and optimize your investment portfolio',
			iconPath: 'M21 3v18M3 9h18M3 15h18M3 9a6 6 0 0 1 6-6M3 15a6 6 0 0 0 6 6'
		},
		{
			name: 'Personal Tax Calculator',
			href: 'personal-tax-calculator',
			description: 'Estimate your tax obligations and plan accordingly',
			iconPath:
				'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
		},
		{
			name: 'Drawdown Calculator',
			href: 'drawdown-calculator',
			description: 'Plan your retirement withdrawals strategically',
			iconPath: 'M21 12a9 9 0 1 1-6.219-8.56 M12 8v4l2.5 2.5'
		}
	];
</script>

<svelte:head>
	<title>Wealthkit - Smart Financial Tools</title>
	<meta
		name="description"
		content="All the tools you need to manage your money and build wealth effectively."
	/>
	<meta
		name="og:description"
		content="All the tools you need to manage your money and build wealth effectively."
	/>
	<meta name="twitter:creator" content="@jrib_" />
</svelte:head>

<div class="flex-1 container mx-auto px-4">
	<!-- Hero Section -->
	<div class="text-center max-w-4xl mx-auto pt-16 pb-24">
		<h1 class="text-4xl md:text-7xl font-light mb-6 text-white leading-tight">
			All the tools for managing your
			<span class="relative">
				<span
					class="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-default"
					>money</span
				>
				<!-- Decorative underline -->
			</span>
		</h1>
		<p class="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
			Professional-grade financial tools to help you make smarter decisions with your money
		</p>
	</div>

	<!-- Tools Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-24">
		{#each links as link}
			<LinkCard {...link} />
		{/each}
	</div>

	<!-- Optional Feature Section -->
	<div class="max-w-6xl mx-auto pb-24">
		<div class="grid md:grid-cols-3 gap-8 text-center">
			<div class="p-6">
				<div
					class="w-12 h-12 rounded-lg bg-brand-default/10 flex items-center justify-center mx-auto mb-4"
				>
					<svg
						class="w-6 h-6 text-brand-default"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
					</svg>
				</div>
				<h3 class="text-lg font-medium text-white mb-2">Easy to Use</h3>
				<p class="text-gray-400 text-sm">
					Intuitive interfaces designed for both beginners and professionals
				</p>
			</div>

			<div class="p-6">
				<div
					class="w-12 h-12 rounded-lg bg-brand-default/10 flex items-center justify-center mx-auto mb-4"
				>
					<svg
						class="w-6 h-6 text-brand-default"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M21 12a9 9 0 1 1-6.219-8.56" />
						<path d="M12 8v4l2.5 2.5" />
					</svg>
				</div>
				<h3 class="text-lg font-medium text-white mb-2">Real-time Calculations</h3>
				<p class="text-gray-400 text-sm">Instant results with professional-grade accuracy</p>
			</div>

			<div class="p-6">
				<div
					class="w-12 h-12 rounded-lg bg-brand-default/10 flex items-center justify-center mx-auto mb-4"
				>
					<svg
						class="w-6 h-6 text-brand-default"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					</svg>
				</div>
				<h3 class="text-lg font-medium text-white mb-2">Secure & Private</h3>
				<p class="text-gray-400 text-sm">Your financial data stays in your browser</p>
			</div>
		</div>
	</div>
</div>
