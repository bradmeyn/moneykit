<script lang="ts">
	import { Input, Label, type FormSizeType } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	// Props
	export let label: string = '';
	export let value: number;
	export let size: FormSizeType;
</script>

<Label class="space-y-1 ">
	{#if label}
		<div class="text-sm text-slate-200">{label}</div>
	{/if}
	<Input let:props class="rounded" {size}>
		<Icon icon="carbon:percentage" slot="right" class="w-5 h-5 text-emerald-300" />
		<input type="number" {...props} bind:value />
	</Input>
</Label>
