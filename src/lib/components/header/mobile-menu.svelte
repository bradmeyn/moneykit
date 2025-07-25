<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown, X } from 'lucide-svelte';
	import { calculatorsByCategory, categories } from '$lib/constants/calculators';

	let activeUrl = $derived(page.url.pathname);
	let isOpen = $state(false);
	let expandedCategory = $state<string | null>(null);

	function clickOutside(node: HTMLElement, callback: () => void) {
		function handleClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	function toggleMenu() {
		isOpen = !isOpen;
		if (!isOpen) {
			expandedCategory = null;
		}
	}

	function toggleCategory(category: string) {
		expandedCategory = expandedCategory === category ? null : category;
	}

	function closeMenu() {
		isOpen = false;
		expandedCategory = null;
	}

	function handleOutsideClick() {
		if (isOpen) {
			closeMenu();
		}
	}
</script>

<div class="relative md:hidden block" use:clickOutside={handleOutsideClick}>
	<!-- Menu Button -->
	<button
		onclick={toggleMenu}
		class=" flex items-center justify-center text-muted-foreground hover:text-white transition-colors ml-auto hover:bg-muted rounded-lg size-5 p-5"
		aria-expanded={isOpen}
		aria-haspopup="true"
		aria-label="Toggle menu"
	>
		{#if isOpen}
			<X class="size-5" />
		{:else}
			<!-- Hamburger Icon -->
			<div class="flex flex-col gap-1">
				<div class="w-4 h-0.5 bg-current transition-all duration-200"></div>
				<div class="w-4 h-0.5 bg-current transition-all duration-200"></div>
			</div>
		{/if}
	</button>

	<!-- Mobile Menu Overlay -->
	{#if isOpen}
		<!-- Menu Content -->
		<div class="fixed top-0 left-0 right-0 bg-card shadow-lg z-50 max-h-screen overflow-y-auto">
			<!-- Header -->
			<div class="flex items-center justify-between p-4 border-b border-border">
				<span class="text-white text-xl"
					>Money<span class="text-transparent bg-clip-text bg-linear-to-b from-brand to-brand"
						>Kit</span
					></span
				>
				<button
					onclick={closeMenu}
					class="p-2 hover:bg-muted rounded-lg transition-colors"
					aria-label="Close menu"
				>
					<X class="size-5 text-muted-foreground" />
				</button>
			</div>

			<!-- Categories -->
			<div class="p-4 space-y-2">
				{#each categories as category}
					<div class="border border-border rounded-lg overflow-hidden">
						<!-- Category Header -->
						<button
							onclick={() => toggleCategory(category)}
							class="w-full p-4 text-left flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors text-muted-foreground"
							aria-expanded={expandedCategory === category}
						>
							<span class="font-semibold text-white text-sm">{category.toUpperCase()}</span>
							<ChevronDown
								class="size-4 transition-transform duration-200 {expandedCategory === category
									? 'rotate-180'
									: ''}"
							/>
						</button>

						<!-- Category Content -->
						{#if expandedCategory === category}
							<div class="p-4 bg-card space-y-3">
								{#each calculatorsByCategory[category] as calculator}
									<a
										href={calculator.href}
										onclick={closeMenu}
										class="block py-2 px-3 rounded-md text-sm transition-colors {activeUrl ===
										calculator.href
											? 'bg-brand/20 text-brand border-l-2 border-l-brand'
											: 'text-muted-foreground hover:text-white hover:bg-muted/50'}"
									>
										{calculator.name}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
