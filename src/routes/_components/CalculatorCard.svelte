<script lang="ts">
	let {
		name,
		href,
		description,
		iconPath
	}: {
		name: string;
		href: string;
		description: string;
		iconPath: string;
	} = $props();
</script>

<a
	{href}
	class="card-animate block p-6 rounded-xl bg-ui-800/50 border border-ui-700
	hover:border-primary hover:bg-ui-800/70 transition-all duration-300
	group w-full hover:-translate-y-1"
>
	<div class="flex items-start space-x-4">
		<div
			class="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center
		justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
		>
			<svg
				class="w-6 h-6 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d={iconPath} />
			</svg>
		</div>
		<div class="flex-1">
			<h3 class="text-xl font-medium text-white mb-2">{name}</h3>
			<p class="text-gray-400 text-sm leading-relaxed">{description}</p>
		</div>
	</div>
</a>

<style>
	.card-animate {
		animation: slideUp 0.4s ease-out forwards;
		opacity: 0;
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	:global(.card-animate:nth-child(1)) {
		animation-delay: 0s;
	}
	:global(.card-animate:nth-child(2)) {
		animation-delay: 0.1s;
	}
	:global(.card-animate:nth-child(3)) {
		animation-delay: 0.2s;
	}
	:global(.card-animate:nth-child(4)) {
		animation-delay: 0.3s;
	}
	:global(.card-animate:nth-child(5)) {
		animation-delay: 0.4s;
	}
</style>
