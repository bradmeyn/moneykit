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
	<div class="flex justify-between items-center">
		<h2 class="card-heading mb-1">{title}</h2>
		<div class="flex items-center gap-2">
			<Tabs.Root value={view} onValueChange={(value) => (view = value)} class="w-[200px]">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
					<Tabs.Trigger value="table">Table</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</div>
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
