<script lang="ts">
	import { Search } from 'lucide-svelte';
	interface Props {
		placeholder?: string;
		value?: string;
		name?: string;
		label?: string;
		[key: string]: any
	}

	let {
		placeholder = 'Search...',
		value = $bindable(''),
		name = 'search',
		label = '',
		...rest
	}: Props = $props();
</script>

<div class={`w-full ${rest.class}`}>
	<label class={`mb-1 ${label ? 'block' : 'hidden'}`} for={name}>{label}</label>
	<div class="input-base">
		<Search class="size-4 mr-2 text-brand-default" />
		<input
			type="text"
			{name}
			id={name}
			{placeholder}
			aria-describedby="currency-symbol"
			aria-labelledby="currency-symbol"
			aria-label={label}
			bind:value
		/>
	</div>
</div>
