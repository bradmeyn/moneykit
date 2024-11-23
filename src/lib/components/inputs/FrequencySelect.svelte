<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { FREQUENCIES, FREQUENCY_ENUM, type FrequencyType } from '$lib/constants/frequencies';
	import Label from '$ui/label/label.svelte';

	type Props = {
		value: FrequencyType;
		name?: string;
		id?: string;
		label?: string;
	};

	let { value = $bindable(), id = '', name = '', label = '' }: Props = $props();
</script>

<div>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<Select.Root {name} type="single" bind:value>
		<Select.Trigger {id}>
			{value ? FREQUENCIES[value].label : 'Select'}
		</Select.Trigger>
		<Select.Content>
			{#each FREQUENCY_ENUM as freq}
				<Select.Item value={freq}>
					{FREQUENCIES[freq].label}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
