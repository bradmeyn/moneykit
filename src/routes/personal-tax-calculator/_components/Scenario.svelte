<script lang="ts">
	import Inputs from './Inputs.svelte';
	let income = 0;
</script>

<div class="md:flex gap-5">
	<Inputs bind:income />

	<div class="w-full p-3">Output</div>
</div>
