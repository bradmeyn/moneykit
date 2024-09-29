<script lang="ts">
	import Hamburger from './Hamburger.svelte';
	import CalculatorsDropdown from './CalculatorsDropdown.svelte';

	let isOpen = false;
</script>

<header class="h-16 relative">
	<div class="container h-full flex justify-between items-center relative">
		<div class="flex items-center gap-8">
			<a href="/" class="flex items-center gap-2">
				<span class="text-white font-semibold text-xl"
					>Wealth<span
						class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
						>Kit</span
					></span
				>
			</a>
			<nav class="hidden md:block">
				<ul class="flex gap-6 items-center">
					<CalculatorsDropdown />
				</ul>
			</nav>
		</div>
		<Hamburger bind:isOpen />
	</div>
	<!-- <NavbarMobile bind:isOpen {links} /> -->
</header>
