<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import Button from '$ui/button/button.svelte';
	import { Trash } from 'lucide-svelte';
	import { getBudgetState } from '../budget.svelte';

	const calc = getBudgetState();

	let open = $state(false);

	function handleDelete() {
		calc.clearAll();
		open = false;
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>
		<Button size="icon" variant="outline">
			<Trash class="size-5" />
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Remove all budget items??</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete all budget items? This action cannot be undone.
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
