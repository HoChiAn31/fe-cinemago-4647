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
				gray2: '#DFE0E1',
				darkBlue: '#25396F',
			},
			boxShadow: {
				top: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui(), require('tailwindcss-animated')],
	important: true,
};
export default config;
