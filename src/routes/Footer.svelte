<script lang="ts">
	import Icon from '@iconify/svelte';
	let year = new Date().getFullYear();
</script>

<footer class=" mt-auto items-center p-4 bg-neutral text-neutral-content justify-center">
	<div class="text-center">
		<p class=" mb-2 flex items-center justify-center text-sm">
			<span class="mr-2">Developed by</span>
			<a
				href={'https://www.bradmeyn.com'}
				target="_blank"
				rel="noreferrer"
				class="underline-offset-2 hover:underline font-bold"
			>
				Brad Meyn
			</a>
			<span class="px-2">&#8226;</span>
			<a
				href={'https://www.github.com/bradmeyn/wealthkit'}
				target="_blank"
				rel="noreferrer"
				class="font-bold flex items-center justify-center text-sm underline-offset-2 hover:underline"
			>
				<Icon icon="akar-icons:github-fill" class="mr-2" />
				<span>GitHub</span>
			</a>
		</p>

		<p class="text-xs">
			Copyright © {year} - All right reserved
		</p>
	</div>
</footer>
