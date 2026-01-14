/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#0D4C4F",   // Logo Deep Teal
          emerald: "#14B8A6", // Main Emerald
          mint: "#99F6E4",    // Soft Mint
        }
      }
    },
  },
  plugins: [],
};