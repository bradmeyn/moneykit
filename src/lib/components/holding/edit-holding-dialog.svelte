<script lang="ts">
	import Button from '$ui/button/button.svelte';
	import * as Dialog from '$ui/dialog/index.js';
	import * as Field from '$ui/field';
	import { updateHolding } from '$lib/remotes/holding.remote';
	import { getHolding, getHoldings } from '$lib/remotes/holding.remote';
	import { getPortfolio } from '$lib/remotes/portfolio.remote';
	import { getInvestments } from '$lib/remotes/investment.remote';
	import Spinner from '$ui/spinner/spinner.svelte';

	let {
		holdingId,
		portfolioId,
		holding,
		open = $bindable(false)
	}: {
		holdingId: string;
		portfolioId: string;
		holding: {
			investmentId: string;
		};
		open?: boolean;
	} = $props();

	const investments = $derived(await getInvestments());

	async function onSubmitEnhance({ form, submit }: any) {
		try {
			await submit().updates(
				getHolding(holdingId),
				getHoldings(portfolioId),
				getPortfolio(portfolioId)
			);
			if (updateHolding.result?.success) {
				open = false;
			}
		} catch (e) {
			console.error('Error editing holding', e);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Holding</Dialog.Title>
			<Dialog.Description>Update your holding details.</Dialog.Description>
		</Dialog.Header>

		{#each updateHolding.fields.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}

		<form {...updateHolding.for(holdingId).enhance(onSubmitEnhance)} class="space-y-4">
			<Field.Field>
				<Field.Label for="investmentId">Investment</Field.Label>
				<select
					id="investmentId"
					{...updateHolding.fields.investmentId.as('text')}
					value={holding.investmentId}
					class="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">Select an investment</option>
					{#each investments as investment}
						<option value={investment.id}>
							{investment.name} ({investment.code})
						</option>
					{/each}
				</select>
				<Field.Error />
			</Field.Field>

			<input type="hidden" name="id" value={holdingId} />

			<div class="mt-4 flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button type="submit" disabled={!!updateHolding.pending}>
					{#if updateHolding.pending}
						<Spinner class="size-4" />
					{:else}
						Save Changes
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
