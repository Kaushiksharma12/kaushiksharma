/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        red: 'var(--red)',
        orange: 'var(--orange)',
        muted: 'var(--muted)',
        'ai-lab-bg': 'var(--ai-lab-bg)',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        serif: ['var(--font-instrument)', 'serif'],
        mono: ['var(--font-ibm-plex)', 'monospace'],
        hand: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
}
