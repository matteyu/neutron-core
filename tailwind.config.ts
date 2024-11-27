import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'slow-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 5px rgba(147, 51, 234, 0.3)' },
          '10%': { boxShadow: '10px -7px 10px 5px rgba(147, 51, 234, 0.3)' },
          '20%': { boxShadow: '10px -10px 10px 5px rgba(147, 51, 234, 0.3)' },
          '30%': { boxShadow: '10px -5px 10px 5px rgba(147, 51, 234, 0.3)' },
          '40%': { boxShadow: '10px 0 10px 5px rgba(147, 51, 234, 0.3)' },
          '50%': { boxShadow: '10px 5px 10px 5px rgba(147, 51, 234, 0.3)' },
          '60%': { boxShadow: '5px 10px 10px 5px rgba(147, 51, 234, 0.3)' },
          '70%': { boxShadow: '0 10px 10px 5px rgba(147, 51, 234, 0.3)' },
          '80%': { boxShadow: '-5px 7px 10px 5px rgba(147, 51, 234, 0.3)' },
          '90%': { boxShadow: '-10px 2px 10px 5px rgba(147, 51, 234, 0.3)' },
        },
      },
      animation: {
        'slow-glow': 'slow-glow 30s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.animate-slow-glow': {
          animation: 'slow-glow 30s linear infinite',
        },
      })
    }),
  ],
} satisfies Config;
