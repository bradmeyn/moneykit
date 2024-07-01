<script lang="ts">
	import type { Link } from './Header.svelte';
	export let link: Link;
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<li>
	<a
		href={link.href}
		class="py-4 block text-lg md:text-sm {activeUrl === link.href
			? 'text-white'
			: 'text-slate-300  hover:text-brand-default'}"
		>{link.name}
	</a>
</li>
