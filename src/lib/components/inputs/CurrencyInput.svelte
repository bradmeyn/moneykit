<script lang="ts">
	import { formatAsCurrency, parseCurrency } from '$lib/utils/formatters';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	type Props = {
		class?: string;
		value: number;
		label?: string;
		id?: string;
		onchange?: (value: number) => void;
	};

	let { value = $bindable(), label = '', id = '', onchange, class: className }: Props = $props();

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

<div>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<Input
		{id}
		class={className}
		name={id}
		value={displayValue}
		onchange={handleChange}
		onblur={handleBlur}
		onfocus={(e) => e.currentTarget.select()}
	/>
</div>
