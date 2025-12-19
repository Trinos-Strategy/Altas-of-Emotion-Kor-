/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'tracking-wide',
    'tracking-wider',
    'px-8',
    'py-6',
    'p-10',
    'p-12',
  ],
}
