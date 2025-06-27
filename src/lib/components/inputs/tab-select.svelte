<script lang="ts">
	import { onMount } from 'svelte';

	let {
		value = $bindable(),
		options,
		name
	}: {
		value: string | number;
		name: string;
		options: {
			value: string;
			label: string;
		}[];
	} = $props();
</script>

<div class="flex gap-2 rounded-md bg-ui-800 p-1">
	{#each options as option}
		<label class="flex-1 mb-0" for={`${name}-tabs-${option.value}`}>
			<input
				type="radio"
				id={`${name}-tabs-${option.value}`}
				name={`${name}-tabs-${option.value}`}
				bind:group={value}
				value={option.value}
				checked={value == option.value}
				class="sr-only peer"
			/>
			<div
				class="flex items-center justify-center px-2 py-1.5 text-sm font-medium rounded-md transition-all
					peer-checked:bg-background peer-checked:text-foreground
					peer-data-[state=unchecked]:text-muted-foreground
					hover:bg-muted-foreground/10
					cursor-pointer"
				data-state={value == option.value ? 'checked' : 'unchecked'}
			>
				{option.label}
			</div>
		</label>
	{/each}
</div>
