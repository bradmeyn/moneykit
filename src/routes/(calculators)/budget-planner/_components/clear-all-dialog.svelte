<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import Button from '$ui/button/button.svelte';
	import { Trash } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let {
		trigger,
		text = 'all budget items',
		onDelete
	}: { trigger?: Snippet; text?: string; onDelete: () => void } = $props();

	let open = $state(false);

	function handleDelete() {
		onDelete();
		open = false;
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>
		{#if trigger}
			{@render trigger()}
		{:else}
			<Button size="icon" variant="outline">
				<Trash class="size-4" />
			</Button>
		{/if}
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete {text}?</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete {text}? This action cannot be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>
				{#snippet child()}
					<Button variant="destructive" onclick={handleDelete}>Delete all</Button>
				{/snippet}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
