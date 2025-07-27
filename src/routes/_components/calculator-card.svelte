<script lang="ts">
	let {
		name,
		href,
		description,
		iconPath,
		viewBox
	}: {
		name: string;
		href: string;
		description: string;
		iconPath: string;
		viewBox: string;
	} = $props();
</script>

<a
	{href}
	class="card-animate block card
	hover:border-brand transition-all duration-300
	group w-full hover:-translate-y-1"
>
	<div class="flex items-start space-x-4">
		<div
			class="mb-4 size-12 rounded-lg bg-brand/10 flex items-center
		justify-center group-hover:scale-110 transition-transform duration-300 shrink-0"
		>
			<svg class="size-5 text-brand" {viewBox} fill="currentColor">
				<path d={iconPath} />
			</svg>
		</div>
		<div class="flex-1">
			<h3 class="text-xl font-medium text-white mb-2">{name}</h3>
			<p class="text-muted-foreground text-sm leading-relaxed">{description}</p>
		</div>
	</div>
</a>

<!-- <style>
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
	:global(.card-animate:nth-child(6)) {
		animation-delay: 0.5s;
	}
	:global(.card-animate:nth-child(7)) {
		animation-delay: 0.6s;
	}
	:global(.card-animate:nth-child(8)) {
		animation-delay: 0.7s;
	}
</style> -->
