/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        customBackground: '#F5FDFE',

        customPrimary: {
          DEFAULT: '#82A0D8',
          '100': '#A3B9E5', // Lighter shade
          '200': '#618AC5', // Slightly darker
        },

        customSecondary: {
          DEFAULT: '#8DDFCB',
          '100': '#A8E8D6', // Lighter shade
          '200': '#72D6B6', // Slightly darker
          // Add more shades as needed
        },

        customAccent: {
          DEFAULT: '#ECEE81',
          '100': '#F1F28B', // Lighter shade
          '200': '#E9E677', // Slightly darker
        },

        customTextbox: "#FEFEFA"
      }
    },
  },
  plugins: [],
}

