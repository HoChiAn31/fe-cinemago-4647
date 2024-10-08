import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: '#F0284A',
				second: '#D52237',
				dark: '#1F1F1F',
				bgDark: '#272727',
				green1: '#1ED5B9',
				green2: '#288082',
				skyblue: '#F2F7FF',
				gray: '#7C8DB5',
				gray1: '#F2F2F2',
				darkBlue: '#25396F',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui(), require('tailwindcss-animated')],
	important: true,
};
export default config;
