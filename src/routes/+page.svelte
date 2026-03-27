<script lang="ts">
	import { calculators } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>MoneyKit — Personal Finance Tools</title>
	<meta name="description" content="A collection of personal finance tools to help you budget, save, and plan for the future." />
</svelte:head>

<main class="container py-20 md:py-32 flex flex-col items-center text-center">
	<div class="max-w-lg mb-14">
		<h1 class="text-4xl md:text-5xl mb-5">Personal finance,<br />made simple.</h1>
		<p class="text-muted-foreground text-lg">Free tools to help you budget, save, and plan your financial future.</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
		{#each calculators as calculator}
			<a href={calculator.href} class="card group hover:border-primary/40 transition-colors text-left">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox={calculator.viewBox}
					class="size-6 fill-primary mb-4"
				>
					<path d={calculator.iconPath} />
				</svg>
				<h2 class="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{calculator.name}</h2>
				<p class="text-sm text-muted-foreground">{calculator.description}</p>
			</a>
		{/each}
	</div>
</main>
