<script lang="ts">
	import { formatAsCurrency, getFrequencyLabel } from '$lib/utils/formatters';

	const income = [
		{ name: 'Salary', value: 2100, frequency: 26, category: 'Salary/wages' },
		{ name: 'Bonus', value: 500, frequency: 1, category: 'Salary/wages' },
		{ name: 'Interest', value: 100, frequency: 12, category: 'Investments' }
	];

	const expenses = [
		{ name: 'Rent', value: 1000, frequency: 12, category: 'Housing' },
		{ name: 'Groceries', value: 200, frequency: 52, category: 'Food' },
		{ name: 'Car payment', value: 300, frequency: 12, category: 'Transportation' }
	];

	const savings = [
		{ name: 'Emergency Fund', value: 1000, frequency: 12, category: 'Savings' },
		{ name: 'Retirement', value: 500, frequency: 12, category: 'Savings' }
	];

	const incomeTotal = income.reduce((acc, i) => acc + i.value * i.frequency, 0);

	let globalfrequency = 12;
</script>

<div class="space-y-6 max-w-4xl mx-auto">
	<h1 class="mb-4 text-white">Budget</h1>

	<section class="card">
		<h2>Income</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(incomeTotal)}
		</p>

		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Investments</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
					<th class="text-right text-sm text-ui-400 p-2 border-t-transparent">Total</th>
				</tr>
			</thead>
			<tbody>
				{#each income as i (i.name)}
					<tr class="text-white">
						<td class="p-2">{i.name}</td>
						<td class="p-2">{formatAsCurrency(i.value)}</td>
						<td class="p-2">{getFrequencyLabel(i.frequency)}</td>
						<td class="p-2 text-right">{formatAsCurrency(i.value * i.frequency)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section class="card">
		<h2>Expenses</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(incomeTotal)}
		</p>

		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Investments</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
					<th
						class="text-right
                    text-sm text-ui-400 p-2 border-t-transparent">Total</th
					>
				</tr>
			</thead>
			<tbody>
				{#each expenses as i (i.name)}
					<tr
						class="text-white
                    "
					>
						<td class="p-2">{i.name}</td>
						<td class="p-2">{formatAsCurrency(i.value)}</td>
						<td class="p-2">{getFrequencyLabel(i.frequency)}</td>
						<td class="p-2 text-right">{formatAsCurrency(i.value * i.frequency)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section class="card">
		<h2>Savings</h2>
		<p class="text-2xl font-semibold mb-2 text-white">
			{formatAsCurrency(incomeTotal)}
		</p>

		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Investments</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Value</th>
					<th class="text-left text-sm text-ui-400 p-2 border-t-transparent">Frequency</th>
					<th
						class="text-right
                    text-sm text-ui-400 p-2 border-t-transparent">Total</th
					>
				</tr>
			</thead>
			<tbody>
				{#each savings as i (i.name)}
					<tr
						class="text-white
                    "
					>
						<td class="p-2">{i.name}</td>
						<td class="p-2">{formatAsCurrency(i.value)}</td>
						<td class="p-2">{getFrequencyLabel(i.frequency)}</td>
						<td class="p-2 text-right">{formatAsCurrency(i.value * i.frequency)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>
