<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	interface Props {
		label?: string;
		name?: string;
		value: number;
	}

	let { label = '', name = '', value = $bindable() }: Props = $props();

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		// Validate and parse the input value as a float
		const number = +input.value;
		if (!isNaN(number)) {
			// Update the value with the raw value
			value = number / 100;
			// Call the parent component's onChange handler
		}
	}

	// Reactive statement to format the value for display
	let formattedValue = $derived((value * 100).toFixed(2));
</script>

<div class="input-container">
	<label for={name}>{label}</label>
	<div class="input-base">
		<input
			{name}
			type="text"
			id={name}
			value={formattedValue}
			inputmode="decimal"
			onchange={handleInput}
		/>
		<div class="flex items-center pointer-events-none text-brand-default">%</div>
	</div>
</div>
