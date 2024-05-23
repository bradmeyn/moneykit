<script>
	import Hamburger from './Hamburger.svelte';
	import Navbar from './Navbar.svelte';
	import Icon from '@iconify/svelte';

	let isOpen = true;
	let isMobile = false;
</script>

<header class="z-50 h-16 bg-slate-900 lg:flex border">
	<div class="container border h-full flex justify-between items-center relative z-10">
		<a href="/" class="flex items-center gap-2">
			<Icon icon="streamline:bag-dollar-solid" class="w-6 h-6 text-emerald-500 " />
			<span class="text-white font-semibold text-xl"
				>Wealth<span
					class="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500"
					>Kit</span
				></span
			>
		</a>

		<Hamburger bind:isOpen />
	</div>
	<Navbar {isOpen} />
</header>
{#if isOpen}
	<div class="fixed inset-0 bg-black opacity-50 z-10" />
{/if}
