<script lang="ts">
	import DesktopMenu from './desktop-menu.svelte';
	import MobileMenu from './mobile-menu.svelte';
</script>

<header class="h-16 relative">
	<div class="container h-full flex justify-between items-center relative">
		<div class="flex items-center gap-8 w-full">
			<a href="/" class="flex items-center gap-2">
				<span class="text-white text-xl"
					>Money<span class="text-transparent bg-clip-text bg-linear-to-b from-brand to-brand"
						>Kit</span
					></span
				>
			</a>
			<nav class=" items-center justify-between w-full">
				<DesktopMenu />
				<MobileMenu />
			</nav>
		</div>
	</div>
</header>
