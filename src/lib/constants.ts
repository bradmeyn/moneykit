export type FrequencyOption = {
	name: string;
	value: number;
};

export const FREQUENCY_OPTIONS = [
	{ label: 'Weekly', value: 52 },
	{ label: 'Fortnightly', value: 26 },
	{ label: 'Monthly', value: 12 },
	{ label: 'Quarterly', value: 4 },
	{ label: 'Half Yearly', value: 2 },
	{ label: 'Yearly', value: 1 }
];

export const CHART_COLOURS = [
	'rgb(2 132 199)', // tw sky-600
	'rgb(219 39 119)', // tw pink-600
	'rgb(202 138 4)', // tw yellow-600
	'rgb(22 163 74)', // tw green-600
	'rgb(79 70 229)', // tw indigo-600
	'rgb(190 18 60)', // tw rose-600
	'rgb(13 148 136)' // tw teal-600
];
