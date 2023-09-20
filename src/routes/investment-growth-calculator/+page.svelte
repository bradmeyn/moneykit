<script>
	import { Label, Input, Button, CloseButton } from 'flowbite-svelte';
	import { DollarSolid } from 'flowbite-svelte-icons';
</script>

<main class="flex flex-col flex-1 container mx-auto border border-sky-800">
	<section class="flex h-full flex-1">
		<aside class="max-w-[1000px] min-w-[300px] bg-gray-100 p-3">
			<Label class="space-y-2">
				<span>Starting amount</span>
				<Input type="text" placeholder="0.00">
					<DollarSolid slot="left" class="w-4 h-4" />
				</Input>
			</Label>
		</aside>
		<div class="border border-red-500 w-full flex justify-center items-center">
			<h1 class="text-5xl">main</h1>
			<!-- <p class="text-3xl font-semibold">This is a page.</p> -->
		</div>
	</section>
</main>
