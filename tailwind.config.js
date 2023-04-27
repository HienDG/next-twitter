/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#3b82f6",
					secondary: "#F000B8",
					accent: "#37CDBE",
					neutral: "#3D4451",
					"base-100": "#FFFFFF",
					info: "#3ABFF8",
					success: "#4ade80",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
		],
	},

	plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
