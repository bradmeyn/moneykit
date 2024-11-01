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
					50: colors.slate[50],
					100: colors.slate[100],
					200: colors.slate[200],
					300: colors.slate[300],
					400: colors.slate[400],
					500: colors.slate[500],
					600: colors.slate[600],
					700: colors.slate[700],
					800: colors.slate[800],
					900: colors.slate[900],
					950: colors.slate[950]
				}
			}
		}
	}
};
