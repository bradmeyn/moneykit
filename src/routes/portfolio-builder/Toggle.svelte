<script lang="ts">
	export let options: { label: string; value: string }[] = [];
	export let selectedValue: string = options.length > 0 ? options[0].value : '';

	// Function to handle option selection
	function selectOption(value: string) {
		selectedValue = value;
	}
</script>

<div class="flex justify-center my-6">
	<div class="bg-slate-800 rounded p-2 w-64 flex gap-3 justify-between">
		{#each options as option}
			<button
				class={`text-sm font-semibold px-2 py-2 rounded flex-grow ${
					selectedValue === option.value ? 'text-white bg-brand-default' : 'text-brand-default'
				}`}
				on:click={() => selectOption(option.value)}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
