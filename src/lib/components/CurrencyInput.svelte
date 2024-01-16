<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	// Props
	export let label: string;

	export let value: number;

	// Function to format the value as a number with commas, without the currency symbol
	function formatAsCurrency(value) {
		return value.toLocaleString('en-US');
	}

	// Function to parse the formatted value back to an integer
	function parseCurrency(value) {
		return parseInt(value.replace(/[^0-9]+/g, ''));
	}

	// Reactive statement to format value whenever it changes
	$: formattedValue = formatAsCurrency(value);

	// Handle input event
	function handleInput(event) {
		value = parseCurrency(event.target.value);
		if (isNaN(value)) {
			value = 0;
		}
	}
</script>

<Label class="space-y-1 mb-3">
	{#if label}
		<div class="text-sm text-slate-200">{label}</div>
	{/if}

	<Input size="lg" let:props class="rounded w-52">
		<Icon icon="carbon:currency-dollar" slot="left" class="w-5 h-5 text-emerald-300" />
		<input type="text" {...props} value={formattedValue} on:input={handleInput} />
	</Input>
</Label>
