<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string = '';
	export let checked: boolean = false;
	export let name: string = '';

	const dispatch = createEventDispatcher();

	function toggleCheckbox() {
		checked = !checked;
		dispatch('change', checked);
	}
</script>

<div class="flex items-center p-1 gap-2">
	<div
		id={name}
		role="checkbox"
		aria-checked={checked}
		aria-labelledby={`${name}-label`}
		tabindex="0"
		class="inline-flex items-center justify-center w-5 h-5 rounded border transition-colors duration-150 ease-in-out cursor-pointer
			 {checked ? 'bg-brand-default border-transparent' : 'bg-transparent border-ui-500'}"
		on:click={toggleCheckbox}
		on:keypress={(e) => e.key === ' ' && toggleCheckbox()}
	>
		{#if checked}
			<svg
				class="w-4 h-4 text-white"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12" />
			</svg>
		{/if}
	</div>
	<label
		id={`${name}-label`}
		for={name}
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-0 cursor-pointer"
	>
		{label}
	</label>
</div>
