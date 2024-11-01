<script lang="ts">
	import { enhance } from '$app/forms';
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { X } from 'lucide-svelte';
	import CurrencyInput from '$lib/components/inputs/CurrencyInput.svelte';
	import FrequencySelect from '$lib/components/inputs/FrequencySelect.svelte';
	import { liabilitySchema } from '$lib/schemas/dashboard';
	import { LIABILITY_TYPES } from '../constants';
	import { validateFormData } from '$lib/utils/validation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import PercentageInput from '$lib/components/inputs/PercentageInput.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';

	let isOpen = $state(false);
	let isLoading = $state(false);
	let balance = $state(0);
	let repaymentAmountValue = $state(0);
	let interestRateValue = $state(0);
	let validation: ValidationResult<any> | null = $state(null);

	// Helper function to check if a field has an error
	const hasError = (fieldName: string) => {
		return validation?.fieldErrors?.[fieldName]?.length > 0;
	};

	// Helper function to get error messages for a field
	const getErrors = (fieldName: string) => {
		return validation?.fieldErrors?.[fieldName] || [];
	};

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const parsedData = {
			name: formData.get('name'),
			type: formData.get('type'),
			balance: +balance,
			repaymentAmount: +repaymentAmountValue,
			interestRate: +interestRateValue,
			repaymentFrequency: formData.get('repaymentFrequency')
		};

		// Validate the form data
		validation = validateFormData(parsedData, liabilitySchema);

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
					validation = null; // Clear validation state on success
					break;

				case 'failure':
					isLoading = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={() => (validation = null)}>
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

				{#if validation?.formErrors?.length}
					<div class="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
						{#each validation.formErrors as error}
							<p class="text-red-700 text-sm">{error}</p>
						{/each}
					</div>
				{/if}

				<form
					method="POST"
					action="?/addLiability"
					use:enhance={submit}
					class="grid grid-cols-2 gap-4"
				>
					<div class="col-span-2">
						<label for="name" class="label">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							disabled={true}
							class="input-base {hasError('name') ? 'border-red-500' : ''}"
						/>
						{#if hasError('name')}
							{#each getErrors('name') as error}
								<p class="text-red-500 text-sm mt-1">{error}</p>
							{/each}
						{/if}
					</div>

					<div class="col-span-2">
						<label for="type" class="label">Type</label>
						<select
							name="type"
							id="type"
							required
							class="input-base {hasError('type') ? 'border-red-500' : ''}"
						>
							{#each LIABILITY_TYPES as type}
								<option value={type.value}>{type.label}</option>
							{/each}
						</select>
						{#if hasError('type')}
							{#each getErrors('type') as error}
								<p class="text-red-500 text-sm mt-1">{error}</p>
							{/each}
						{/if}
					</div>

					<div class="col-span-2">
						<label for="balance" class="label">Balance</label>
						<CurrencyInput bind:value={balance} error={hasError('balance')} />
						<input type="hidden" name="balance" value={balance} />
						{#if hasError('balance')}
							{#each getErrors('balance') as error}
								<p class="text-red-500 text-sm mt-1">{error}</p>
							{/each}
						{/if}
					</div>

					<div class="col-span-2">
						<label for="interestRate" class="label">Interest Rate</label>
						<PercentageInput
							name="interestRate"
							bind:value={interestRateValue}
							class={hasError('interestRate') ? 'border-red-500' : ''}
						/>
						{#if hasError('interestRate')}
							{#each getErrors('interestRate') as error}
								<p class="text-red-500 text-sm mt-1">{error}</p>
							{/each}
						{/if}
					</div>

					<div class="col-span-1">
						<label for="repaymentAmount" class="label">Repayment Amount</label>
						<CurrencyInput bind:value={repaymentAmountValue} error={hasError('balance')} />
						<input type="hidden" name="repaymentAmount" value={repaymentAmountValue} />
						{#if hasError('repaymentAmount')}
							{#each getErrors('repaymentAmount') as error}
								<p class="text-red-500 text-sm mt-1">{error}</p>
							{/each}
						{/if}
					</div>

					<div class="col-span-1 mb-4">
						<label for="repaymentFrequency" class="label">Repayment Frequency</label>
						<FrequencySelect
							name="repaymentFrequency"
							value={'monthly'}
							class={hasError('repaymentFrequency') ? 'border-red-500' : ''}
						/>
						{#if hasError('repaymentFrequency')}
							{#each getErrors('repaymentFrequency') as error}
								<p class="text-red-500 text-sm mt-1">{error}</p>
							{/each}
						{/if}
					</div>

					<button
						type="submit"
						disabled={isLoading}
						class="px-4 py-2 col-span-2 text-sm w-full flex justify-center items-center font-medium text-white bg-brand-default rounded-md hover:bg-brand-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-brand-500 disabled:opacity-50"
					>
						{#if isLoading}
							<Spinner /> <span>Adding...</span>
						{:else}
							<div>Add Liability</div>
						{/if}
					</button>
				</form>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
