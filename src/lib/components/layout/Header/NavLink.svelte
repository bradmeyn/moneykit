<script lang="ts">
	import type { Link } from './Header.svelte';
	export let link: Link;
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<li>
	<a
		href={link.href}
		class="py-4 md:py-0 block text-lg md:text-sm text-left border-b-2 {activeUrl === link.href
			? 'text-white border-b-2 border-b-brand-default'
			: 'text-slate-400  hover:text-white border-b-transparent'}"
		>{link.name}
	</a>
</li>
