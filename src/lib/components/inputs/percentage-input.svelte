<script lang="ts">
	import { formatAsPercentage, parsePercentage } from '$lib/utils/formatters';
	import Input from '$lib/components/ui/input/input.svelte';

	let {
		value = $bindable(),
		id = '',
		onchange,
		placeholder
	}: {
		value: number;
		id?: string;
		onchange?: (value: number) => void;
		placeholder?: string;
	} = $props();

	let displayValue = $state(formatAsPercentage(value));

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value.replace(/[^\d.]/g, '');
		const numericValue = parsePercentage(rawValue);
		if (!isNaN(numericValue)) {
			value = numericValue;
			onchange?.(value);
		}
	}

	function handleBlur() {
		displayValue = formatAsPercentage(value);
	}
</script>

<Input
	{id}
	{placeholder}
	value={displayValue}
	onchange={handleInput}
	onblur={handleBlur}
	onfocus={(e) => e.currentTarget.select()}
/>
