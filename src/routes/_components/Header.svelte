<script>
	import Navbar from './Navbar.svelte';
	import Icon from '@iconify/svelte';

	let isOpen = true;
	let isMobile = false;
</script>

<header class="z-20 py-4 border border-slate-600">
	<div class="container flex justify-between items-center relative z-10">
		<!-- <Navbar>
			<NavBrand href="/">
				<Icon icon="streamline:bag-dollar-solid" class="w-6 h-6 text-emerald-500 mr-2" />
				<span class="text-white font-bold text-xl">WealthKit</span>
			</NavBrand>
			<NavHamburger />
			<NavUl {activeUrl}>
				<NavLi href="/growth-calculator">Growth Calculator</NavLi>
				<NavLi href="/portfolio-builder">Portfolio Builder</NavLi>
				<NavLi href="/personal-tax-calculator">Tax Calculator</NavLi>
			</NavUl>
		</Navbar> -->
		<a href="/" class="flex items-center">
			<Icon icon="streamline:bag-dollar-solid" class="w-6 h-6 text-emerald-500 mr-2" />
			<span class="text-white font-semibold text-xl"
				>Wealth<span
					class="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500"
					>Kit</span
				></span
			>
		</a>

		<Navbar {isOpen} />
		<button
			class="block md:hidden text-white"
			on:click={() => {
				isOpen = !isOpen;
			}}
		>
			<Icon icon="carbon:menu" class="w-6 h-6" />
		</button>
	</div>
</header>
{#if isOpen}
	<div class="fixed inset-0 bg-black opacity-50 z-10" />
{/if}
