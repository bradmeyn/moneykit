<script lang="ts">
	export let options: { label: string; value: string }[] = [];
	export let selectedView: string = options.length > 0 ? options[0].value : '';

	const selectOption = (value: string) => (selectedView = value);
</script>

<div class={`bg-slate-700 p-1 rounded grid gap-2 justify-between h-10 grid-cols-${options.length}`}>
	{#each options as option}
		<button
			class={`text-sm font-semibold block px-2 py-1 rounded col-span-1 min-w-20  ${
				selectedView === option.value
					? 'text-white bg-slate-800'
					: 'hover:text-white text-slate-400 '
			}`}
			on:click={() => selectOption(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>
