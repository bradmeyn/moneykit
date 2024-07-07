<script lang="ts">
	import { Dialog, Separator, Label } from 'bits-ui';
	import { fade } from 'svelte/transition';
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="bg-brand-dark text-white rounded-md px-4 py-2 text-sm font-semibold shadow-popover hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
	>
		Add
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-background p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
				>Create API key</Dialog.Title
			>
			<Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-muted" />
			<Dialog.Description class="text-sm text-foreground-alt">
				Create and manage API keys. You can create multiple keys to organize your applications.
			</Dialog.Description>

			<div class="flex w-full justify-end">
				<Dialog.Close
					class="inline-flex h-input items-center justify-center rounded-input bg-dark px-[50px] text-[15px] font-semibold text-background shadow-mini hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				>
					Save
				</Dialog.Close>
			</div>
			<Dialog.Close
				class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
			>
				<div>
					<!-- <X class="size-5 text-foreground" /> -->
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
