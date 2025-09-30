<script lang="ts">
	import { calculators, type Calculator } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>MoneyKit</title>
	<meta name="description" content="Professional-grade personal finance toolkit." />
</svelte:head>

<main class="flex-1 container">
	<div class="text-center max-w-4xl mx-auto py-6 mt-4 mb-8">
		<h1 class="text-5xl md:text-8xl mb-6 text-white leading-none">
			Your personal finance
			<span class="relative">
				<span class="text-brand">toolkit</span>
			</span>
		</h1>
		<p class="text-xl md:text-2xl max-w-4xl mx-auto text-muted-foreground">
			Easy to use financial tools designed to help you make <span class="text-white"
				>smarter decisions</span
			> with your money.
		</p>
	</div>

	<div
		class="grid grid-cols-3 gap-3 mx-auto max-w-7xl px-4
	sm:gap-4
	md:gap-6
	 lg:gap-8 lg:max-w-6xl
	xl:max-w-5xl"
	>
		{#each calculators as calculator}
			{@render CalculatorCard(calculator)}
		{/each}
	</div>
</main>

{#snippet CalculatorCard(calculator: Calculator)}
	<a
		href={calculator.href}
		class="block card
		hover:border-brand hover:shadow-lg
		transition-all duration-300 ease-out
		group w-full hover:-translate-y-2 h-full
		bg-card border border-border rounded-lg p-4 md:p-6
		hover:bg-card/80
		col-span-3 md:col-span-1
		relative overflow-hidden"
	>
		<div class="relative z-10">
			<!-- Responsive layout: horizontal on mobile, vertical on desktop -->
			<div
				class="flex md:flex-col items-start md:items-center md:text-center space-x-3 md:space-x-0 md:space-y-4"
			>
				<!-- Enhanced icon container -->
				<div
					class="size-12 md:size-16 rounded-lg md:rounded-xl bg-gradient-to-br from-brand/20 to-brand/10
					flex items-center justify-center shrink-0
					group-hover:scale-110 group-hover:rotate-3
					transition-all duration-300 ease-out
					border border-brand/20 group-hover:border-brand/30
					shadow-sm group-hover:shadow-md group-hover:shadow-brand/20"
				>
					<svg
						class="size-5 md:size-7 text-brand group-hover:text-brand/90 transition-colors duration-300"
						viewBox={calculator.viewBox}
						fill="currentColor"
					>
						<path d={calculator.iconPath} />
					</svg>
				</div>

				<!-- Content -->
				<div class="space-y-1 md:space-y-2 min-w-0 flex-1">
					<h3
						class="text-base md:text-lg font-semibold text-white group-hover:text-brand transition-colors duration-300"
					>
						{calculator.name}
					</h3>
					<p
						class="text-muted-foreground text-xs md:text-sm leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300"
					>
						{calculator.description}
					</p>
				</div>
			</div>
		</div>
	</a>
{/snippet}
