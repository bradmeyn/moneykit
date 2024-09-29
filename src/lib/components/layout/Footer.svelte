<script lang="ts">
	let year = new Date().getFullYear();
</script>

<footer
	class=" mt-auto items-center p-4 bg-neutral text-neutral-content justify-center text-ui-100"
>
	<div class="text-center">
		<p class=" mb-2 flex items-center justify-center text-sm">
			<a
				href={'https://www.github.com/bradmeyn/wealthkit'}
				target="_blank"
				rel="noreferrer"
				class="flex items-center justify-center text-sm underline-offset-2 hover:underline"
			>
				<span>GitHub</span>
			</a>
		</p>

		<p class="text-xs">
			Copyright © {year} - All right reserved
		</p>
	</div>
</footer>
