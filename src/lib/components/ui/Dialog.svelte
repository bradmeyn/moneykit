<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';

	export let title: string;
	export let description: string;
	export let triggerText: string = 'Add';
	export let actionText: string = 'Save';
	export let onAction: () => void = () => {};
	export let disabled: boolean = false;
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
	>
		{triggerText}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/60"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] tranui-x-[-50%] tranui-y-[-50%] shadow-popover outline-none sm:max-w-[520px] md:w-full"
		>
			<div class="card">
				<Dialog.Title class="text-lg font-semibold tracking-tight text-left">
					{title}
				</Dialog.Title>
				<Dialog.Close
					class="absolute text-white hover:text-brand-default hover:bg-ui-700 right-5 top-5 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
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

				<slot />

				<div class="flex w-full justify-end">
					<button
						{disabled}
						class="w-full bg-brand-dark text-white rounded px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98 disabled:bg-brand-dark/60 disabled:cursor-not-allowed disabled:hover:bg-brand-dark/60 disabled:active:scale-100 disabled:shadow-popover"
						on:click={onAction}
					>
						{actionText}
					</button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
