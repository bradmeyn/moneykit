<script lang="ts">
	import { type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>MoneyKit</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
	<a href="/" class="mb-8 text-xl font-medium tracking-tight">
		Money<span class="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary-dark">Kit</span>
	</a>
	{@render children()}
</div>
