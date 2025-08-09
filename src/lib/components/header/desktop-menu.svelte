<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown } from 'lucide-svelte';
	import { calculators } from '$lib/constants/calculators';
	let activeUrl = $derived(page.url.pathname);
</script>

<div class="relative group md:relative hidden md:block w-fit">
	<button
		class="py-4 block text-lg md:text-sm text-left text-muted-foreground hover:text-white border-b-transparent w-fit"
	>
		<span>Calculators</span>
		<ChevronDown class="size-4 inline-block group-hover:rotate-180 transition-all duration-300" />
	</button>
	<div class="absolute card shadow-lg overflow-hidden hidden group-hover:block z-20 w-[500px]">
		<h1 class="font-bold text-lg mb-4">Calculators</h1>
		<ul class="grid grid-cols-2 gap-4">
			{#each calculators as calculator}
				<li class="col-span-1">
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
</div>
