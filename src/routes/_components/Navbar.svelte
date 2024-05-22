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
	<nav class="absolute lg:static z-10 w-full bg-slate-700 top-20 border border-red-600">
		<ul class="w-full">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="w-full p-4 block {activeUrl === link.href
							? 'text-white'
							: 'text-slate-500 hover:text-white'}"
						>{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
