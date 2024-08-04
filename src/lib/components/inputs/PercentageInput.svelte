<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label: string = '';
	export let name: string = '';
	export let value: number;

	const dispatch = createEventDispatcher();

	// Reactive statement to format the value for display
	$: formattedValue = (value * 100).toFixed(2);

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		// Validate and parse the input value as a float
		const number = Number(input.value);
		if (!isNaN(number)) {
			// Update the value with the raw value
			value = number / 100;
			// Call the parent component's onChange handler
			dispatch('input', value);
		}
	}
</script>

<div class="input-container">
	<label for={name}>{label}</label>
	<div class="input-base">
		<input
			{name}
			type="text"
			id={name}
			bind:value={formattedValue}
			inputmode="decimal"
			on:change={handleInput}
		/>
		<div class="flex items-center pointer-events-none text-brand-default">%</div>
	</div>
</div>
