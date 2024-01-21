<script lang="ts">
	import { Input, Label, type FormSizeType } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { formatAsCurrency, parseCurrency } from '$lib/utils';

	// Props
	export let label: string = '';
	export let size: FormSizeType = 'md';
	export let value: number;
	export let inputClass: string = '';

	// Reactive statement to format value whenever it changes
	$: formattedValue = formatAsCurrency(value);

	// Handle input event
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = parseCurrency(target.value);
		if (isNaN(value)) {
			value = 0;
		}
	}
</script>

<Label class="space-y-1 {inputClass}">
	{#if label}
		<div class="text-sm text-slate-200">{label}</div>
	{/if}

	<Input {size} let:props class="rounded">
		<Icon icon="carbon:currency-dollar" slot="left" class="w-5 h-5 text-emerald-300" />
		<input type="text" {...props} value={formattedValue} on:input={handleInput} />
	</Input>
</Label>
