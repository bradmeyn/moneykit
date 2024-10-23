<script lang="ts">
	import { enhance } from '$app/forms';
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { X } from 'lucide-svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';
	import { liabilitySchema } from '$lib/schemas/dashboard';
	import { z } from 'zod';
	import type { SubmitFunction } from '@sveltejs/kit';

	let isOpen = false;
	let isLoading = false;
	let serverError = '';

	let fieldErrors = {
		name: '',
		amount: '',
		interestRate: '',
		repaymentAmount: '',
		repaymentFrequency: '',
		remainingTerm: ''
	};

	function mapZodErrorsToFieldErrors(errors: z.ZodError) {
		const { fieldErrors: mapped } = errors.flatten();
		fieldErrors = { ...fieldErrors, ...mapped };
	}

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const validation = liabilitySchema.safeParse(Object.fromEntries(formData));

		if (!validation.success) {
			console.log('add liability', formData, validation.error);
			mapZodErrorsToFieldErrors(validation.error);
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

	let amountValue = 0;
	let repaymentAmountValue = 0;
	let interestRateValue = 0;
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
					Add Liability
				</Dialog.Title>
				<Dialog.Close
					class="absolute text-white hover:text-brand-default hover:bg-ui-700 right-5 top-5 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				>
					<X class="size-6" />
				</Dialog.Close>

				<Dialog.Description class="text-sm text-ui-300 py-2 text-foreground-alt">
					Add a new liability to track.
				</Dialog.Description>

				<form
					method="POST"
					action="?/addLiability"
					use:enhance={submit}
					class="grid grid-cols-2 gap-4"
				>
					<div class="col-span-2">
						<label for="name" class="label">Name</label>
						<input type="text" id="name" name="name" required class="input-base" />
						{#if fieldErrors.name}
							<span class="text-error-default text-sm">{fieldErrors.name}</span>
						{/if}
					</div>

					<div class="col-span-2">
						<label for="amount" class="label">Total Amount</label>
						<CurrencyInput bind:value={amountValue} />
						<input type="hidden" name="amount" value={amountValue} />
						{#if fieldErrors.amount}
							<span class="text-error-default text-sm">{fieldErrors.amount}</span>
						{/if}
					</div>

					<div class="col-span-2">
						<label for="interestRate" class="label">Interest Rate (%)</label>
						<input
							type="number"
							id="interestRate"
							name="interestRate"
							step="0.01"
							min="0"
							max="100"
							bind:value={interestRateValue}
							required
							class="input-base"
						/>
						{#if fieldErrors.interestRate}
							<span class="text-error-default text-sm">{fieldErrors.interestRate}</span>
						{/if}
					</div>

					<div class="col-span-1">
						<label for="repaymentAmount" class="label">Repayment Amount</label>
						<CurrencyInput bind:value={repaymentAmountValue} />
						<input type="hidden" name="repaymentAmount" value={repaymentAmountValue} />
						{#if fieldErrors.repaymentAmount}
							<span class="text-error-default text-sm">{fieldErrors.repaymentAmount}</span>
						{/if}
					</div>

					<div class="col-span-1">
						<label for="repaymentFrequency" class="label">Repayment Frequency</label>
						<FrequencySelect name="repaymentFrequency" value={12} />
						{#if fieldErrors.repaymentFrequency}
							<span class="text-error-default text-sm">{fieldErrors.repaymentFrequency}</span>
						{/if}
					</div>

					<div class="col-span-2">
						<label for="remainingTerm" class="label">Remaining Term (months)</label>
						<input
							type="number"
							id="remainingTerm"
							name="remainingTerm"
							min="0"
							required
							class="input-base"
						/>
						{#if fieldErrors.remainingTerm}
							<span class="text-error-default text-sm">{fieldErrors.remainingTerm}</span>
						{/if}
					</div>

					{#if serverError}
						<div class="text-error-default text-sm">{serverError}</div>
					{/if}

					<button
						type="submit"
						disabled={isLoading}
						class="px-4 py-2 text-sm block w-full font-medium text-white bg-brand-default rounded-md hover:bg-brand-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-brand-500 disabled:opacity-50"
					>
						{isLoading ? 'Adding...' : 'Add Liability'}
					</button>
				</form>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
