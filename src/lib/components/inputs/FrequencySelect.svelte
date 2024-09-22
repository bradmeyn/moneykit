<script lang="ts">
	export let value: number;
	export let name: string;
	export let showLabel: boolean = true;

	const FREQUENCY_OPTIONS = [
		{ label: 'Weekly', value: 52 },
		{ label: 'Fortnightly', value: 26 },
		{ label: 'Monthly', value: 12 },
		{ label: 'Quarterly', value: 4 },
		{ label: 'Half Yearly', value: 2 },
		{ label: 'Yearly', value: 1 }
	];
</script>

<div>
	<label class={`${showLabel ? 'block' : 'hidden'}`} for={name}>{name}</label>

	<select id={name} {name} bind:value class="input-base">
		{#each FREQUENCY_OPTIONS as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
