<script lang="ts">
	import { Checkbox, Label } from 'bits-ui';
	import { Check } from 'lucide-svelte';
	export let label: string = '';
	export let checked: boolean = false;
	export let name: string = '';
</script>

<div class="flex items-center p-1 gap-2">
	<Checkbox.Root
		id={name}
		aria-labelledby="terms-label"
		class="inline-flex items-center justify-center rounded border border-transparent transition-colors duration-150 ease-in-out data-[state=unchecked]:border-ui-500"
		bind:checked
	>
		<Checkbox.Indicator
			class={`data-[state=checked]:bg-brand-default rounded data-[state=unchecked]:bg-transparent data-[state=unchecked]:text-transparent `}
		>
			<Check class="size-4 " />
		</Checkbox.Indicator>
	</Checkbox.Root>
	<Label.Root
		id={name + '-label'}
		for={name}
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-0"
	>
		{label}
	</Label.Root>
</div>
