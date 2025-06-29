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

<div
	class="bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-center rounded-lg p-[3px]"
>
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
				class="flex focus-visible:ring-ring/50 h-[calc(100%-1px)] items-center data-[state=checked]:shadow-sm focus-visible:border-ring border border-transparent justify-center px-2 whitespace-nowrap py-1 text-sm font-medium rounded-md transition-all gap-1.5
					data-[state=checked]:bg-background dark:data-[state=checked]:text-foreground dark:data-[state=checked]:border-input
					data-[state=unchecked]:text-muted-foreground dark:data-[state=checked]:bg-input/30 dark:text-muted-foreground"
				data-state={value == option.value ? 'checked' : 'unchecked'}
			>
				{option.label}
			</div>
		</label>
	{/each}
</div>
