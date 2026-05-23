<script lang="ts">
	import Button from '$ui/button/button.svelte';
	import * as Dialog from '$ui/dialog/index.js';
	import Input from '$ui/input/input.svelte';
	import * as Field from '$ui/field';
	import { updatePortfolio } from '$lib/remotes/portfolio.remote';
	import { getPortfolio, getPortfolios } from '$lib/remotes/portfolio.remote';
	import Spinner from '$ui/spinner/spinner.svelte';

	let {
		portfolioId,
		portfolioName,
		open = $bindable(false)
	}: {
		portfolioId: string;
		portfolioName: string;
		open?: boolean;
	} = $props();

	async function onSubmitEnhance({ form, submit }: any) {
		try {
			await submit().updates(getPortfolio(portfolioId), getPortfolios());
			if (updatePortfolio.result?.success) {
				open = false;
			}
		} catch (e) {
			console.error('Error editing portfolio', e);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Portfolio</Dialog.Title>
			<Dialog.Description>Update your portfolio details.</Dialog.Description>
		</Dialog.Header>

		{#each updatePortfolio.fields.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}

		<form {...updatePortfolio.for(portfolioId).enhance(onSubmitEnhance)} class="space-y-4">
			<Field.Field>
				<Field.Label for="name">Portfolio Name</Field.Label>
				<Input
					id="name"
					{...updatePortfolio.fields.name.as('text')}
					value={portfolioName}
					autocomplete="off"
					placeholder="e.g., Growth Portfolio"
				/>
				<Field.Error />
			</Field.Field>

			<input type="hidden" name="id" value={portfolioId} />

			<div class="mt-4 flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!updatePortfolio.pending}>
					{#if updatePortfolio.pending}
						<Spinner class="size-4" />
					{:else}
						Save Changes
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
