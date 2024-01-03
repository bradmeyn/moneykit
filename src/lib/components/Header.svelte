<script>
	import { DarkMode } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	let btnClass = 'text-gray-400 hover:bg-gray-700 rounded-lg text-xl p-2';
</script>

<header>
	<div class="container mx-auto flex justify-between items-center py-3">
		<a href="/" class="font-semibold text-xl text-white flex items-center gap-2">
			<Icon icon="streamline:bag-dollar-solid" slot="left" class="w-6 h-6 text-emerald-500" /><span
				>WealthKit</span
			></a
		>
		<!-- <nav class="ml-20">
			<ul class="flex gap-2">
				<li>
					<a href="/growth-calculator" class="block ml-10 text-lg font-semibold text-white"
						>Growth Calculator
					</a>
				</li>

				<li>
					<a
						href="/investment-growth-calculator"
						class="block ml-10 text-lg font-semibold text-white"
						>Portfolio Builder
					</a>
				</li>
			</ul>
		</nav> -->
	</div>
</header>
