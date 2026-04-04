<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header/header.svelte';
	import { calculators } from '$lib/constants/calculators';
	import { type Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	const year = new Date().getFullYear();
	const description = 'A collection of personal finance tools';
</script>

<svelte:head>
	<title>BudgetKit</title>
	<meta name="description" content={description} />
	<meta name="og:description" content={description} />
</svelte:head>

<div class="antialiased min-h-screen flex flex-col bg-background text-foreground app-shell">
	<Header />
	<div class="pb-12">
		{@render children()}
	</div>
	<footer class="mt-auto border-t border-border bg-card">
		<div class="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
			<span class="font-medium text-foreground">Budget<span class="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary-dark">Kit</span></span>
			<nav class="flex gap-4">
				{#each calculators as calculator}
					<a href={calculator.href} class="hover:text-foreground transition-colors">{calculator.name}</a>
				{/each}
			</nav>
			<p class="text-xs">© {year} BudgetKit</p>
		</div>
	</footer>
</div>
