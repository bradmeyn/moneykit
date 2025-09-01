export interface CsvData {
	columns: string[];
	rows: (string | number)[][];
}

export function downloadCsv(data: CsvData, filename = 'moneykit.csv') {
	const csvContent = [data.columns, ...data.rows]
		.map((row) =>
			row
				.map((cell: string | number) =>
					typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
				)
				.join(',')
		)
		.join('\n');

	const blob = new Blob([csvContent], { type: 'text/csv' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	window.URL.revokeObjectURL(url);
}
