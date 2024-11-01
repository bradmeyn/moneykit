<script lang="ts">
	import { FREQUENCIES, FREQUENCY_ENUM, type FrequencyType } from '$lib/constants/frequencies';
	interface Props {
		value: FrequencyType;
		name: string;
	}

	let { value = $bindable(), name }: Props = $props();
</script>

<select id={name} {name} bind:value class="input-base">
	{#each FREQUENCY_ENUM as frequency}
		<option value={frequency}>{FREQUENCIES[frequency].label}</option>
	{/each}
</select>
