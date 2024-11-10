<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { FrequencyType } from '$lib/constants/frequencies';
	import { FREQUENCIES, FREQUENCY_ENUM } from '$lib/constants/frequencies';

	type Props = {
		value: FrequencyType;
		label?: string;
		id?: string;
	};

	let { value = $bindable(), label = '', id = '' }: Props = $props();
</script>

<div>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<Select.Root type="single" bind:value>
		<Select.Trigger>
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
