<script lang="ts">
	export let placeholder = 'Search...';
	export let value = '';
	export let name = 'search';
	export let label = '';
</script>

<div class={`w-full ${$$restProps.class}`}>
	<label class={`mb-1 ${label ? 'block' : 'hidden'}`} for={name}>{label}</label>
	<div
		class="relative px-2 rounded sm:text-sm flex bg-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-brand-default w-full"
	>
		<div class="flex items-center pointer-events-none text-brand-default">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
		</div>
		<input
			type="text"
			{name}
			id={name}
			class="bg-transparent text-sm block w-full border-none focus:ring-0 sm:text-sm text-white placeholder-slate-400"
			{placeholder}
			aria-describedby="currency-symbol"
			aria-labelledby="currency-symbol"
			aria-label={label}
			bind:value
		/>
	</div>
</div>
