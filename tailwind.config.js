/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
			},

			colors: {
				secondary: '#731982',
				darkmode: {
					10: '#30353e',
					20: '#1e2531',
				},
				blue: {
					10: '#283444',
					20: '#3b82f6',
				},
			},
		},

		screens: {
			lg: '1280px',
			xl: '1440px',
		},
	},

	plugins: [require('@tailwindcss/typography')],
};
