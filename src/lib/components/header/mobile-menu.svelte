<script lang="ts">
	import { page } from '$app/state';
	import { X } from 'lucide-svelte';
	import { calculators } from '$lib/constants/calculators';

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
			<nav class="p-4" aria-label="Main menu">
				<ul class="space-y-2">
					{#each calculators as calculator}
						<li>
							<a
								href={calculator.href}
								class="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-150 text-muted-foreground hover:text-white hover:bg-muted focus:outline-none focus:ring-2 focus:ring-brand {activeUrl ===
								calculator.href
									? 'text-white bg-muted'
									: ''}"
								aria-current={activeUrl === calculator.href ? 'page' : undefined}
								onclick={closeMenu}
							>
								<div
									class="size-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0"
								>
									<svg class="size-4 text-brand" viewBox={calculator.viewBox} fill="currentColor">
										<path d={calculator.iconPath} />
									</svg>
								</div>
								<span>{calculator.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	{/if}
</div>
