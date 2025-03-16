<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { FREQUENCIES, FREQUENCY_ENUM, type FrequencyType } from '$lib/constants/frequencies';

	type Props = {
		value: FrequencyType;
		name?: string;
		id?: string;
		onchange?: (value: FrequencyType) => void;
	};

	let { value = $bindable(), id = '', name = '', onchange }: Props = $props();

	const handleChange = (value: FrequencyType) => onchange?.(value);
</script>

<Select.Root onValueChange={handleChange} {name} type="single" bind:value>
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
