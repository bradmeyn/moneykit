<script lang="ts">
	import { calculators, type Calculator } from '$lib/constants/calculators';
</script>

<svelte:head>
	<title>MoneyKit</title>
	<meta name="description" content="Professional-grade personal finance toolkit." />
</svelte:head>

<main class="flex-1 container pt-2 pb-12 md:pb-16">
	<div class="text-center max-w-4xl mx-auto py-10 mt-4 mb-8 hero-fade">
		<h1 class="text-5xl md:text-8xl mb-6 text-foreground leading-[0.95]">
			Your personal finance
			<span class="relative">
				<span class="text-brand">toolkit</span>
			</span>
		</h1>
		<p class="text-lg md:text-2xl max-w-3xl mx-auto text-muted-foreground leading-relaxed">
			Easy-to-use financial tools designed to help you make
			<span class="text-foreground font-semibold">smarter decisions</span> with your money.
		</p>
	</div>

	<div
		class="grid grid-cols-3 gap-3 mx-auto max-w-7xl px-1
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
		class="block card calculator-card
		hover:border-primary/50 hover:shadow-lg
		transition-all duration-300 ease-out
		group w-full hover:-translate-y-1 h-full
		bg-card/85 border border-border/90 rounded-2xl p-4 md:p-6
		hover:bg-card
		col-span-3 md:col-span-1
		relative overflow-hidden backdrop-blur-sm"
	>
		<div
			class="absolute inset-0 bg-linear-to-b from-white/30 to-transparent pointer-events-none"
		></div>
		<div class="relative z-10">
			<!-- Responsive layout: horizontal on mobile, vertical on desktop -->
			<div
				class="flex md:flex-col items-start md:items-center md:text-center space-x-3 md:space-x-0 md:space-y-4"
			>
				<!-- Enhanced icon container -->
				<div
					class="size-12 md:size-16 rounded-lg md:rounded-xl bg-gradient-to-br from-brand/15 to-brand/5
					flex items-center justify-center shrink-0
					group-hover:scale-105 group-hover:rotate-2
					transition-all duration-300 ease-out
					border border-brand/20 group-hover:border-brand/35
					shadow-sm group-hover:shadow-md group-hover:shadow-brand/15"
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
						class="text-base md:text-lg font-semibold text-foreground group-hover:text-brand transition-colors duration-300"
					>
						{calculator.name}
					</h3>
					<p
						class="text-muted-foreground text-xs md:text-sm leading-relaxed group-hover:text-foreground/70 transition-colors duration-300"
					>
						{calculator.description}
					</p>
				</div>
			</div>
		</div>
	</a>
{/snippet}

<style>
	.hero-fade {
		animation: hero-fade 0.7s ease-out;
	}

	.calculator-card {
		animation: card-enter 0.55s ease-out;
	}

	@keyframes hero-fade {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes card-enter {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
