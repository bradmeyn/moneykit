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
				},
				ui: {
					50: colors.gray[50],
					100: colors.gray[100],
					200: colors.gray[200],
					300: colors.gray[300],
					400: colors.gray[400],
					500: colors.gray[500],
					600: colors.gray[600],
					700: colors.gray[700],
					800: colors.gray[800],
					900: colors.gray[900],
					950: colors.gray[950]
				}
			}
		}
	}
};
