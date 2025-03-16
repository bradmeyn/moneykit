<script lang="ts">
	import { formatAsCurrency, parseCurrency } from '$lib/utils/formatters';
	import Input from '$lib/components/ui/input/input.svelte';

	type Props = {
		class?: string;
		value: number;
		id?: string;
		placeholder?: string;
		onchange?: (value: number) => void;
	};

	let { value = $bindable(), id = '', onchange, class: className, placeholder }: Props = $props();

	let displayValue = $state(formatAsCurrency(value));

	function handleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value;
		const numericValue = parseCurrency(rawValue);
		value = numericValue;
		onchange?.(numericValue);
	}

	function handleBlur() {
		displayValue = formatAsCurrency(value);
	}
</script>

<Input
	{id}
	class={className}
	name={id}
	{placeholder}
	value={displayValue}
	onchange={handleChange}
	onblur={handleBlur}
	onfocus={(e) => e.currentTarget.select()}
/>
