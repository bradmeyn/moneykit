<script lang="ts">
	import { formatAsNumber } from '$lib/utils/formatters';

	type Props = {
		name?: string;
		class?: string;
		value: number;
		error?: boolean;
	};

	let { name = '', value = $bindable(), class: cls = '', error }: Props = $props();

	// Reactive statement to format value whenever it changes
	let formattedValue = $derived(formatAsNumber(value));

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

<div class={`input-base ${error ? 'input-error' : ''}`}>
	<div class="flex items-center pointer-events-none text-brand-default mr-2">$</div>
	<input
		type="text"
		{name}
		id={name}
		placeholder="0.00"
		aria-describedby="currency-symbol"
		aria-labelledby="currency-symbol"
		value={formattedValue}
		oninput={handleInput}
	/>
</div>
