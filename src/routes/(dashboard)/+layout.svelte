<script lang="ts">
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>MoneyKit — Portfolio</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<div class="flex-1 bg-gray-50 py-8">
		<div class="container mx-auto max-w-6xl">
			{@render children?.()}
		</div>
	</div>
	<footer></footer>
</div>
