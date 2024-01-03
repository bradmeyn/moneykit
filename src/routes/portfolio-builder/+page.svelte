<script lang="ts">
	type Holding = {
		name: string;
		symbol: string;
		cost: number;
		value: number;
	};

	let portfolio = [
		{
			name: 'Vanguard Total Stock Market Index Fund ETF Shares',
			ticker: 'VTI',
			percentage: 0.5
		},
		{
			name: 'Vanguard Total International Stock Index Fund ETF Shares',
			ticker: 'VXUS',
			percentage: 0.5
		}
	];
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="text-3xl font-light p-3">Portfolio Builder</h1>

	<section class="md:flex gap-5">
		<div class="w-full p-3" />
	</section>
</main>
