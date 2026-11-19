import type { Config } from 'tailwindcss'

// Colours are CSS variables (see globals.css) so one class works in light and dark mode.
const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('bg'), card: c('card'), ink: c('ink'), mute: c('mute'), line: c('line'),
        pri: c('pri'), pri2: c('pri2'), gold: c('gold'), soft: c('soft'), hd: c('hd'),
      },
      fontFamily: { sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        ping2: { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        ping2: 'ping2 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
