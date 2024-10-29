<script lang="ts">
	import { enhance } from '$app/forms';
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { X } from 'lucide-svelte';
	import type { ActionData, PageData } from '../$types';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import { budgetItemSchema } from '$lib/schemas/dashboard';
	import { z } from 'zod';
	import type { SubmitFunction } from '@sveltejs/kit';
	interface Props {
		type: 'income' | 'expense' | 'savings';
	}

	let { type }: Props = $props();

	const categories = ['Salary', 'Investments', 'Other'];

	let isOpen = false;

	// export let page: PageData;
	// export let form: ActionData;

	let isLoading = false;
	let serverError = '';

	let fieldErrors = {
		name: '',
		amount: '',
		frequency: '',
		category: '',
		type: ''
	};

	function mapZodErrorsToFieldErrors(errors: z.ZodError) {
		const { fieldErrors: mapped } = errors.flatten();
		fieldErrors = { ...fieldErrors, ...mapped };
	}

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const validation = budgetItemSchema.safeParse(Object.fromEntries(formData));

		if (!validation.success) {
			console.log('add item', formData, validation.error);
			mapZodErrorsToFieldErrors(validation.error);
			cancel();
			return;
		}

		return async ({ result, update }) => {
			isLoading = true;

			switch (result.type) {
				case 'success':
					isLoading = false;
					break;

				case 'failure':
					isLoading = false;
					serverError = result?.data?.error || 'An error occurred while adding the budget item';
					break;

				default:
					break;
			}
			await update();
		};
	};

	let amountValue = $state(0);
</script>

<Dialog.Root open={isOpen}>
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
					Add income
				</Dialog.Title>
				<Dialog.Close
					class="absolute text-white hover:text-brand-default hover:bg-ui-700 right-5 top-5 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				>
					<X class="size-6" />
				</Dialog.Close>

				<Dialog.Description class="text-sm text-ui-300 py-2 text-foreground-alt">
					Add a new {type} item to your budget.
				</Dialog.Description>

				<form method="POST" action="?/addItem" use:enhance={submit} class="space-y-4">
					<input type="hidden" name="type" value={type} />
					<div>
						<label for="name" class="label">Name</label>
						<input type="text" id="name" name="name" required class="input-base" />
					</div>

					<div>
						<label for="amount" class="label">Amount</label>
						<CurrencyInput bind:value={amountValue} />
						<input type="hidden" name="amount" value={amountValue} />
					</div>

					<div>
						<label for="frequency" class="label">Frequency</label>
						<FrequencySelect name="frequency" value={52} />
					</div>

					<div>
						<label for="category" class="label">Category</label>
						<select id="category" name="category" required class="input-base">
							<option value="">Select a category</option>
							{#each categories as category}
								<option value={category}>{category}</option>
							{/each}
						</select>
					</div>

					<button
						type="submit"
						class="px-4 py-2 text-sm block w-full font-medium text-white bg-brand-default rounded-md hover:bg-brand-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-brand-500"
					>
						Add income
					</button>
				</form>
			</div></Dialog.Content
		>
	</Dialog.Portal>
</Dialog.Root>
