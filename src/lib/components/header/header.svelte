<script lang="ts">
	import DesktopMenu from './desktop-menu.svelte';
	import MobileMenu from './mobile-menu.svelte';
</script>

<header class="relative">
	<div class="container relative">
		<div class="flex items-center gap-8 w-full py-5 justify-between">
			<a href="/" class="flex items-center">
				<span class="text-foreground text-xl font-medium tracking-tight"
					>Money<span class="text-transparent bg-clip-text bg-linear-to-b from-primary to-brand"
						>Kit</span
					></span
				>
			</a>

			<DesktopMenu />
			<MobileMenu />
		</div>
	</div>
</header>
