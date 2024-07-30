<script lang="ts">
	import { FREQUENCY_OPTIONS } from '$lib/constants';
	export let value: number;
	export let name: string;
	export let showLabel: boolean = true;
</script>

<div>
	<label class={`${showLabel ? 'block' : 'hidden'}`} for={name}>{name}</label>

	<select id={name} {name} bind:value class="input-base">
		{#each FREQUENCY_OPTIONS as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
