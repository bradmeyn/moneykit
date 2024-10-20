<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatAsCurrency, getFrequencyLabel } from '$lib/utils/formatters';
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { X } from 'lucide-svelte';

	const frequencyOptions = [
		{ value: 1, label: 'Monthly' },
		{ value: 12, label: 'Yearly' }
	];

	const categories = ['Salary', 'Investments', 'Other'];

	let isOpen = false;
</script>

<Dialog.Root open={isOpen}>
	<Dialog.Trigger
		class="bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
	>
		Add income
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
					Add a new income source to your budget.
				</Dialog.Description>

				<form
					method="POST"
					action="?/addItem"
					use:enhance={() => {
						return ({ result, update }) => {
							if (result.type === 'success') {
								isOpen = false;
							}
							update();
						};
					}}
					class="space-y-4"
				>
					<div>
						<label for="name" class="label">Name</label>
						<input type="text" id="name" name="name" required class="input-base" />
					</div>

					<div>
						<label for="value" class="label">Value</label>
						<input
							type="number"
							id="value"
							name="value"
							min="0"
							step="0.01"
							required
							class="input-base"
						/>
					</div>

					<div>
						<label for="frequency" class="label">Frequency</label>
						<select id="frequency" name="frequency" class="input-base">
							{#each frequencyOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
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

					<div class="justify-end space-x-2 block">
						<button
							type="submit"
							class="px-4 py-2 text-sm block w-full font-medium text-white bg-brand-default border border-transparent rounded-md hover:bg-brand-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Add income
						</button>
					</div>
				</form>
			</div></Dialog.Content
		>
	</Dialog.Portal>
</Dialog.Root>
