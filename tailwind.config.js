/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],

	daisyui: {
		themes: ['cmyk', 'dracula'],
		darkTheme: 'dracula' // name of one of the included themes for dark mode
	}
};
