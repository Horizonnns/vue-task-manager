/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
			},
		},

		screens: {
			lg: '1280px',
			xl: '1440px',
		},
	},

	plugins: [require('@tailwindcss/typography')],
};
