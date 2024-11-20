<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';

	interface Props {
		title: string;
		description: string;
		triggerText?: string;
		actionText?: string;
		onAction?: () => void;
		disabled?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		title,
		description,
		triggerText = 'Add',
		actionText = 'Save',
		onAction = () => {},
		disabled = false,
		children
	}: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
	>
		{triggerText}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/60" />
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] shadow-popover outline-none sm:max-w-[520px] md:w-full"
		>
			<div class="card">
				<Dialog.Title class="text-lg font-semibold tracking-tight text-left">
					{title}
				</Dialog.Title>
				<Dialog.Close
					class="absolute text-white hover:text-brand hover:bg-ui-700 right-5 top-5 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
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
				</Dialog.Close>

				<Dialog.Description class="text-sm text-ui-300 py-2 text-foreground-alt">
					{description}
				</Dialog.Description>

				{@render children?.()}

				<div class="flex w-full justify-end">
					<button
						{disabled}
						class="w-full bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98 disabled:bg-brand-dark/60 disabled:cursor-not-allowed disabled:hover:bg-brand-dark/60 disabled:active:scale-100 disabled:shadow-popover"
						onclick={onAction}
					>
						{actionText}
					</button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
