<script lang="ts">
	// Props
	export let label: string = '';
	export let name: string = '';
	export let value: number;
</script>

<div class={`${$$restProps.class}`}>
	<label for={name}>{label}</label>
	<div class="input-base">
		<input {name} type="number" id={name} bind:value />
		<div class="flex items-center pointer-events-none text-brand-default">%</div>
	</div>
</div>
