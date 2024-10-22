<script lang="ts">
	import { formatAsNumber } from '$lib/utils/formatters';

	// Props
	export let name: string = '';
	export let value: number;

	// Reactive statement to format value whenever it changes
	$: formattedValue = formatAsNumber(value);

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		// change value to a number
		const number = parseInt(input.value);
		if (!isNaN(number) && number >= 0) {
			const newValue = input.value.replace(/[^0-9.]+/g, '');
			value = +newValue;
		} else {
			input.value = '';
		}
	}
</script>

<div class="input-base">
	<div class="flex items-center pointer-events-none text-brand-default mr-2">$</div>
	<input
		type="text"
		{name}
		id={name}
		placeholder="0.00"
		aria-describedby="currency-symbol"
		aria-labelledby="currency-symbol"
		value={formattedValue}
		on:input={handleInput}
	/>
</div>
