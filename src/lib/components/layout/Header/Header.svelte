<script lang="ts">
	import CalculatorsDropdown from './CalculatorsDropdown.svelte';
</script>

<header class="h-16 relative">
	<div class="container h-full flex justify-between items-center relative">
		<div class="flex items-center gap-8 w-full">
			<a href="/" class="flex items-center gap-2">
				<span class="text-white text-xl"
					>Money<span
						class="text-transparent bg-clip-text bg-gradient-to-b from-primary-light to-primary"
						>Kit</span
					></span
				>
			</a>
			<nav class="hidden md:flex items-center justify-between w-full">
				<ul class="flex gap-6 items-center">
					<CalculatorsDropdown />
				</ul>
			</nav>
		</div>
	</div>
</header>
