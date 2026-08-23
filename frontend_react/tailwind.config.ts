import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				"3xl": "2000px",
			},
			colors: {
				// Cream/off-white background, matching the Framer template
				primary: "#FAF7F3",
				ink: "#111111",
				dark: "#111111",
				// legacy names kept so any leftover class references don't 500 the build
				secondary: "#111111",
				"light-purple": "#11111114",
				"app-black": "#111111",
				"light-gray": "#E7E2DA",
				"app-gray": "#11111180",
				brown: "#111111",
				accent: {
					green: "#2F5233",
					purple: "#6C4CE0",
					pink: "#F0A8C8",
					blue: "#3E6FEB",
				},
			},
			fontFamily: {
				base: ["Archivo", "sans-serif"],
			},
			borderRadius: {
				xl2: "20px",
			},
		},
	},
	plugins: [],
} satisfies Config;
