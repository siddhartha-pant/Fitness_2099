/** @type {import('tailwindcss').Config} */
export default {
  // Configure files to scan for Tailwind classes
  // This tells Tailwind which files to look at to find and generate CSS for the classes you're using.
  content: [
    "./index.html", // Your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JavaScript/TypeScript/React files in the src directory
  ],
  theme: {
    // Extend Tailwind's default theme
    // You can add your custom colors, fonts, spacing, etc., here.
    extend: {
      colors: {
        // Adding custom colors if needed
        'deep-blue': '#00008B',
        'deep-red': '#8B0000',
        'light-purple': '#D8BFD8', // Matches the light theme purple
        'light-yellow': '#FFFFE0', // Matches the light theme yellow
      },
      // You can define custom animations here if you prefer
      // For example, to add gradient animation directly in Tailwind config:
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 10s ease infinite',
      },
    },
  },
  plugins: [], // Add any Tailwind plugins here
  // Enable dark mode based on the 'class' strategy
  // This means Tailwind will apply dark mode styles when the 'dark' class is present on the HTML tag (documentElement).
  darkMode: 'class',
}
