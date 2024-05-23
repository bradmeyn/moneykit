<script lang="ts">
	import { page } from '$app/stores';
	export let isOpen;
	$: activeUrl = $page.url.pathname;

	const links = [
		{ name: 'Growth Calculator', href: '/growth-calculator' },
		{ name: 'Portfolio Builder', href: '/portfolio-builder' },
		{ name: 'Tax Calculator', href: '/personal-tax-calculator' }
	];
</script>

{#if isOpen}
	<nav class="absolute lg:static z-10 w-full border bg-slate-900 top-16 py-4">
		<ul class="w-full lg:w-fit lg:flex">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="px-4 block border-slate-700 {activeUrl === link.href
							? 'text-white'
							: 'text-slate-300 hover:text-white hover:bg-slate-600'}"
						>{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
