<script lang="ts">
	interface Props {
		options?: { label: string; value: string }[];
		selectedView?: string;
	}

	let { options = [], selectedView = $bindable(options.length > 0 ? options[0].value : '') }: Props = $props();

	const selectOption = (value: string) => (selectedView = value);
</script>

<div
	class={`bg-ui-800 border border-ui-800 p-1 rounded grid gap-1 justify-between h-fit grid-cols-${options.length}`}
>
	{#each options as option}
		<button
			role="tab"
			class={`text-sm font-semibold block px-2 py-1 rounded col-span-1 min-w-20  ${
				selectedView === option.value ? 'text-white bg-ui-950' : 'hover:text-white text-ui-400 '
			}`}
			onclick={() => selectOption(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>
