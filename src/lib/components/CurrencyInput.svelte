<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	export let label = 'Label';
	export let value: number;
	export let icon = 'carbon:currency-dollar';
</script>

<Label class="space-y-1 mb-3">
	<span>{label}</span>
	<Input let:props class="rounded-none" size="lg">
		<Icon {icon} slot="left" class="w-4 h-4" />
		<input type="number" {...props} bind:value />
	</Input>
</Label>
