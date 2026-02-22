import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        bg: '#0A0A0A',
        card: '#161616',
        border: '#262626',
        primary: '#818CF8',
        accent: '#E2E2E2',
      },
    },
  },
  plugins: [],
}
export default config
