<script lang="ts">
	import { formatAsCurrency, parseCurrency } from '$lib/utils/formatters';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	type Props = {
		value: number;
		label?: string;
		id?: string;
		onChange?: (value: number) => void;
	};

	let { value = $bindable(), label = '', id = '', onChange }: Props = $props();

	let displayValue = $state(formatAsCurrency(value));

	function handleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value;
		const numericValue = parseCurrency(rawValue);
		value = numericValue;
		onChange?.(numericValue);
	}

	function handleBlur() {
		displayValue = formatAsCurrency(value);
	}
</script>

<div>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<Input
		{id}
		name={id}
		value={displayValue}
		onchange={handleChange}
		onblur={handleBlur}
		onfocus={(e) => e.currentTarget.select()}
	/>
</div>
