<script lang="ts">
	import type { Link } from './Header.svelte';
	export let link: Link;
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<li>
	<a
		href={link.href}
		class="py-4 md:py-1 block text-lg md:text-sm text-left border-b-2 border-b-transparent hover:border-b-brand-default px-0 hover:border-slate-600 {activeUrl ===
		link.href
			? 'text-white'
			: 'text-slate-300  hover:text-white'}"
		>{link.name}
	</a>
</li>
