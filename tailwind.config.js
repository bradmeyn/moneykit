import colors from 'tailwindcss/colors';

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
					light: colors.emerald[300],
					default: colors.emerald[500],
					dark: colors.emerald[700]
				}
			}
		}
	}
};
