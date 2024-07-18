<script lang="ts">
	import { formatAsNumber } from '$lib/utils/formatters';

	// Props
	export let label: string = '';
	export let name: string = '';
	export let value: number;

	// Reactive statement to format value whenever it changes
	$: formattedValue = formatAsNumber(value);

	// Handle input event
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = target.value.replace(/[^0-9.]+/g, '');
		value = +newValue;
	}
</script>

<div class={`w-full ${$$restProps.class}`}>
	<label class={`mb-1 ${label ? 'block' : 'hidden'}`} for={name}>{label}</label>
	<div
		class="relative px-2 rounded sm:text-sm flex bg-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-brand-default w-full"
	>
		<div class="flex items-center pointer-events-none text-brand-default">$</div>
		<input
			type="text"
			{name}
			id={name}
			class="bg-transparent text-sm block w-full focus:outline-none border-none focus:ring-0 sm:text-sm text-white placeholder-slate-400"
			placeholder="0.00"
			aria-describedby="currency-symbol"
			aria-labelledby="currency-symbol"
			aria-label={label}
			value={formattedValue}
			on:input={handleInput}
		/>
	</div>
</div>
