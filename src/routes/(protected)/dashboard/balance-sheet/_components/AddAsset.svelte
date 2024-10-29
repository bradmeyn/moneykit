<script lang="ts">
	import { enhance } from '$app/forms';
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { X } from 'lucide-svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { assetSchema } from '$lib/schemas/dashboard';
	import { ASSET_TYPES } from '../constants';

	import type { SubmitFunction } from '@sveltejs/kit';

	let isOpen = $state(false);
	let isLoading = $state(false);
	let serverError = '';

	let assetValue = $state(0);

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const validation = assetSchema.safeParse(Object.fromEntries(formData));

		if (!validation.success) {
			cancel();
			return;
		}

		return async ({ result, update }) => {
			isLoading = true;

			switch (result.type) {
				case 'success':
					isLoading = false;
					isOpen = false;
					break;

				case 'failure':
					isLoading = false;
					serverError = result?.data?.error || 'An error occurred while adding the liability';
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger
		class="bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
	>
		Add
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/60"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] shadow-popover outline-none sm:max-w-[520px] md:w-full"
		>
			<div class="card">
				<Dialog.Title class="text-lg font-semibold tracking-tight text-left">
					Add Asset
				</Dialog.Title>
				<Dialog.Close
					class="absolute text-white hover:text-brand-default hover:bg-ui-700 right-5 top-5 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				>
					<X class="size-6" />
				</Dialog.Close>

				<Dialog.Description class="text-sm text-ui-300 py-2 text-foreground-alt">
					Add a new asset to track.
				</Dialog.Description>

				<form method="POST" action="?/addAsset" use:enhance={submit} class="grid grid-cols-2 gap-4">
					<div class="col-span-2">
						<label for="name" class="label">Name</label>
						<input type="text" id="name" name="name" required class="input-base" />
					</div>

					<div class="col-span-2">
						<label for="type" class="label">Type</label>
						<select id="type" name="type" required class="input-base">
							{#each ASSET_TYPES as type}
								<option value={type.value}>{type.label}</option>
							{/each}
						</select>
					</div>

					<div class="col-span-2">
						<label for="value" class="label">Value</label>
						<CurrencyInput bind:value={assetValue} />
						<input type="hidden" name="value" value={assetValue} />
					</div>

					<button
						type="submit"
						disabled={isLoading}
						class="px-4 py-2 col-span-2 text-sm block w-full font-medium text-white bg-brand-default rounded-md hover:bg-brand-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-brand-500 disabled:opacity-50"
					>
						{isLoading ? 'Adding...' : 'Add Asset'}
					</button>
				</form>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
