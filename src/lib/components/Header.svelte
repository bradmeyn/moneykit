<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	let btnClass = 'text-gray-400 hover:bg-gray-700 rounded-lg text-xl p-2';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<header>
	<div class="container mx-auto flex justify-between items-center py-3">
		<Navbar>
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
		</Navbar>
	</div>
</header>
