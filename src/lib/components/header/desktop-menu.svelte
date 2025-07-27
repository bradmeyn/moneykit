<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown } from 'lucide-svelte';
	import { calculatorsByCategory, categories } from '$lib/constants/calculators';
	let activeUrl = $derived(page.url.pathname);
</script>

<div class="relative group md:relative hidden md:block w-fit">
	<button
		class="py-4 block text-lg md:text-sm text-left text-muted-foreground hover:text-white border-b-transparent w-fit"
	>
		<span>Calculators</span>
		<ChevronDown class="size-4 inline-block group-hover:rotate-180 transition-all duration-300" />
	</button>
	<div class="absolute card p-2 shadow-lg overflow-hidden hidden group-hover:block z-20 w-[500px]">
		{#each categories as category}
			<div class="p-4">
				<h3 class="font-semibold text-white text-xs mb-3">{category.toUpperCase()}</h3>
				<ul class="grid grid-cols-2 gap-4">
					{#each calculatorsByCategory[category] as calculator}
						<li>
							<a
								href={calculator.href}
								class="block text-left border-b-2 w-fit text-sm text-muted-foreground {activeUrl ===
								calculator.href
									? 'text-white border-b-2 border-b-brand'
									: 'text-card-foreground  hover:text-white border-b-transparent'}"
							>
								{calculator.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
