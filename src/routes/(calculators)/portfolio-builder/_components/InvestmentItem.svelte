<script lang="ts">
	import { formatAsCurrency, formatAsPercentage } from '$lib/utils/formatters';

	import { Trash2 } from 'lucide-svelte';

	import Button from '$ui/button/button.svelte';
</script>

<tr class="">
	<td> VAS </td>
	<td class="w-60"> Vanguard Australian Index Fund </td>
	<td class="text-right relative">
		{formatAsCurrency(100000)}
	</td>
	<td class="text-right relative">
		{formatAsPercentage(0.1)}
	</td>
	<td class="text-right">
		<Button size="icon" variant="ghost" class="  text-muted hover:text-red-500 ">
			<Trash2 class="size-4 " />
		</Button>
	</td>
</tr>
