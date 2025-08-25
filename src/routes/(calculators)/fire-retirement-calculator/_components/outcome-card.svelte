<script lang="ts">
	let {
		title,
		chart,
		table
	}: {
		title: string;
		chart: Snippet;
		table: Snippet;
	} = $props();
	import * as Tabs from '$lib/components/ui/tabs';
	import type { Snippet } from 'svelte';
	let view = $state('chart');
</script>

<div class="card w-full h-full">
	<div class="flex justify-between flex-col md:flex-row gap-2">
		<h2 class="card-heading">{title}</h2>

		<Tabs.Root value={view} onValueChange={(value) => (view = value)} class="">
			<Tabs.List class="w-full md:w-fit min-w-[200px]">
				<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
				<Tabs.Trigger value="table">Table</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>

	<Tabs.Root value={view} onValueChange={(value) => (view = value)}>
		<Tabs.Content value="chart">
			{@render chart()}
		</Tabs.Content>
		<Tabs.Content value="table">
			{@render table()}
		</Tabs.Content>
	</Tabs.Root>
</div>
