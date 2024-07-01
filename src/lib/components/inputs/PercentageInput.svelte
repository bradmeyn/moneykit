<script lang="ts">
	// Props
	export let label: string = '';
	export let name: string = '';
	export let labelClass: string = '';
	export let value: number;
</script>

<div>
	<label class="mb-2 block" for={name}>{label}</label>
	<div
		class="relative rounded-md sm:text-sm flex bg-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-brand-default w-full"
	>
		<input
			{name}
			type="number"
			id={name}
			class="bg-transparent text-sm border-box block w-full border-none focus:outline-none focus:ring-0 sm:text-sm text-white placeholder-slate-400"
			bind:value
		/>
		<div class="flex items-center pointer-events-none text-brand-default pr-2">%</div>
	</div>
</div>
