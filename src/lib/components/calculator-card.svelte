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
	hover:border-brand hover:shadow-lg hover:shadow-brand/25
	transition-all duration-300 ease-out
	group w-full hover:-translate-y-2 h-full
	bg-card border border-border rounded-lg p-4 md:p-6
	backdrop-blur-sm hover:bg-card/80
	col-span-3 md:col-span-1
	relative overflow-hidden"
>
	<div class="relative z-10">
		<!-- Responsive layout: horizontal on mobile, vertical on desktop -->
		<div
			class="flex md:flex-col items-start md:items-center md:text-center space-x-3 md:space-x-0 md:space-y-4"
		>
			<!-- Enhanced icon container -->
			<div
				class="size-12 md:size-16 rounded-lg md:rounded-xl bg-gradient-to-br from-brand/20 to-brand/10
				flex items-center justify-center shrink-0
				group-hover:scale-110 group-hover:rotate-3
				transition-all duration-300 ease-out
				border border-brand/20 group-hover:border-brand/30
				shadow-sm group-hover:shadow-md group-hover:shadow-brand/20"
			>
				<svg
					class="size-5 md:size-7 text-brand group-hover:text-brand/90 transition-colors duration-300"
					{viewBox}
					fill="currentColor"
				>
					<path d={iconPath} />
				</svg>
			</div>

			<!-- Content -->
			<div class="space-y-1 md:space-y-2 min-w-0 flex-1">
				<h3
					class="text-base md:text-lg font-semibold text-white group-hover:text-brand transition-colors duration-300"
				>
					{name}
				</h3>
				<p
					class="text-muted-foreground text-xs md:text-sm leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300"
				>
					{description}
				</p>
			</div>
		</div>
	</div>
</a>
