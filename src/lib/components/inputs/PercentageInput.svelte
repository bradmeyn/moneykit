<script lang="ts">
	import { formatAsPercentage, parsePercentage } from '$lib/utils/formatters';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { on } from 'svelte/events';

	let {
		value = $bindable(),
		label = '',
		id = '',
		onChange
	}: {
		value: number;
		label?: string;
		id?: string;
		onChange?: (value: number) => void;
	} = $props();

	let displayValue = $state(formatAsPercentage(value));

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value.replace(/[^\d.]/g, '');
		const numericValue = parsePercentage(rawValue);
		if (!isNaN(numericValue)) {
			value = numericValue;
			onChange?.(value);
		}
	}

	function handleBlur() {
		displayValue = formatAsPercentage(value);
	}
</script>

<div>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<Input
		{id}
		value={displayValue}
		onchange={handleInput}
		onblur={handleBlur}
		onfocus={(e) => e.currentTarget.select()}
	/>
</div>
