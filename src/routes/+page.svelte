<script lang="ts">
	import { calculators } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>BudgetKit — Personal Finance Tools</title>
	<meta name="description" content="Free personal finance tools to help you budget, save, and plan for the future. No account needed." />
</svelte:head>

<section class="container py-24 md:py-36 flex flex-col items-center text-center">
	<h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4 max-w-2xl leading-[1.05]">
		Simple tools for your finances
	</h1>
	<p class="text-muted-foreground text-lg max-w-md mb-12">
		Free, no account needed. Everything runs in your browser.
	</p>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
		{#each calculators as calculator}
			{@const Icon = calculator.icon}
			<a href={calculator.href} class="card group hover:border-primary/50 hover:shadow-md transition-all text-left flex items-center gap-4">
				<div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
					<Icon class="size-5 text-primary" />
				</div>
				<div>
					<p class="font-semibold group-hover:text-primary transition-colors">{calculator.name}</p>
					<p class="text-xs text-muted-foreground">{calculator.description}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
