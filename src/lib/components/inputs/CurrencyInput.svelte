<script lang="ts">
	import { formatAsCurrency, parseCurrency } from '$lib/utils/formatters';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	type Props = {
		value: number;
		label?: string;
		id?: string;
	};

	let { value = $bindable(), label = '', id = '' }: Props = $props();

	let displayValue = $state(formatAsCurrency(value));

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value;
		const numericValue = parseCurrency(rawValue);
		value = numericValue;
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
		onchange={handleInput}
		onblur={handleBlur}
		onfocus={(e) => e.currentTarget.select()}
	/>
</div>
