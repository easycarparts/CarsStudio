/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        secondary: '#4b5563',
        background: '#000000',
        foreground: '#ffffff',
        card: '#1f2937',
        'card-foreground': '#ffffff',
        border: '#4b5563',
        input: '#4b5563',
        ring: '#dc2626',
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
}
