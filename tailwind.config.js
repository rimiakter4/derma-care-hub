/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {Sextend: {
      colors: {
        brand: {
          deep: "#0D4C4F",
          emerald: "#14B8A6",
          mint: "#99F6E4",
        }
      }
    },
  },
  plugins: [],
}