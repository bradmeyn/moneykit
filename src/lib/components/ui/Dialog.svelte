<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let description: string;
	export let triggerText: string = 'Add';
	export let actionText: string = 'Save';
	export let onAction: () => void = () => {};
	export let disabled: boolean = false;

	let isOpen = false;
	const dispatch = createEventDispatcher();

	function open() {
		isOpen = true;
		dispatch('open');
	}

	function close() {
		isOpen = false;
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<button
	on:click={open}
	class="bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
>
	{triggerText}
</button>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<!-- Overlay -->
		<div
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/60"
			on:click={handleOverlayClick}
			on:keydown={handleOverlayKeydown}
			role="presentation"
		/>

		<!-- Dialog content -->
		<div
			class="card fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] shadow-popover outline-none sm:max-w-[520px] md:w-full"
			role="dialog"
			aria-modal="true"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
		>
			<h2 id="dialog-title" class="text-lg font-semibold tracking-tight text-left">
				{title}
			</h2>
			<button
				on:click={close}
				class="absolute text-white hover:text-brand-default hover:bg-ui-700 right-5 top-5 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				aria-label="Close dialog"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>

			<p id="dialog-description" class="text-sm text-ui-300 py-2 text-foreground-alt">
				{description}
			</p>

			<slot />

			<div class="flex w-full justify-end">
				<button
					{disabled}
					class="w-full bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98 disabled:bg-brand-dark/60 disabled:cursor-not-allowed disabled:hover:bg-brand-dark/60 disabled:active:scale-100 disabled:shadow-popover"
					on:click={() => {
						onAction();
						close();
					}}
				>
					{actionText}
				</button>
			</div>
		</div>
	</div>
{/if}
