<script>
	import { DarkMode } from 'flowbite-svelte';

	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
</script>

<header>
	<div class="container mx-auto flex justify-between items-center py-6">
		<a href="/" class="font-bold text-xl dark:text-white text-slate-900">Wealthkit</a>
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
		<DarkMode {btnClass} />
	</div>
</header>
