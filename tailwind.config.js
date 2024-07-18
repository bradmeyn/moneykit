import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem'
				}
			},

			colors: {
				brand: {
					default: colors.emerald[500],
					dark: colors.emerald[700],
					light: colors.emerald[300]
				}
			}
		}
	}
};
