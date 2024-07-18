<script lang="ts">
	import { Checkbox, Label } from 'bits-ui';
	export let label: string = '';
	export let checked: boolean = false;
	export let name: string = '';
</script>

<div class="flex items-center gap-2">
	<Checkbox.Root
		id={name}
		aria-labelledby="terms-label"
		class="inline-flex items-center justify-center rounded border border-transparent transition-colors duration-150 ease-in-out data-[state=unchecked]:border-slate-500 "
		bind:checked
	>
		<Checkbox.Indicator class={`data-[state=checked]:bg-brand-dark rounded size-4 p-1`}>
			{#if checked}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
			{/if}
		</Checkbox.Indicator>
	</Checkbox.Root>
	<Label.Root
		id={name + '-label'}
		for={name}
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
		{label}
	</Label.Root>
</div>
