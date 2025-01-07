<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	let { text }: { text: string } = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={300}>
		<Tooltip.Trigger
			class="flex justify-center items-center rounded-full size-2 bg-ui-700 p-2 text-ui-200"
			><div class="text-sm">?</div></Tooltip.Trigger
		>
		<Tooltip.Content>
			<p>{text}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
