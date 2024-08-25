<script lang="ts">
	import { Search } from 'lucide-svelte';
	export let placeholder = 'Search...';
	export let value = '';
	export let name = 'search';
	export let label = '';
</script>

<div class={`w-full ${$$restProps.class}`}>
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
