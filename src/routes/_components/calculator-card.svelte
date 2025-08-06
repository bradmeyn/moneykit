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
	class="block card
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
