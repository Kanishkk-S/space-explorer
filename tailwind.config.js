/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          black: '#03050B',
          midnight: '#080E1C',
          blue: '#172B50',
          electric: '#5B8CFF',
          violet: '#8766FF',
          cyan: '#61E6F2',
          gold: '#F5C56A',
          white: '#F5F6FF',
          muted: '#A4B0C8',
          // Subtle border/accent tokens
          border: 'rgba(91, 140, 255, 0.14)',
          'border-strong': 'rgba(97, 230, 242, 0.28)',
          'glass-surface': 'rgba(8, 14, 28, 0.65)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'universe-hero': 'radial-gradient(ellipse at 50% 15%, rgba(91, 140, 255, 0.18) 0%, rgba(8, 14, 28, 0.85) 55%, #03050B 100%)',
        'radial-nebula': 'radial-gradient(circle at 75% 25%, rgba(135, 102, 255, 0.22) 0%, transparent 60%)',
        'hud-glass': 'linear-gradient(135deg, rgba(23, 43, 80, 0.35) 0%, rgba(8, 14, 28, 0.55) 100%)',
      },
      boxShadow: {
        'electric-glow': '0 0 35px -5px rgba(91, 140, 255, 0.35)',
        'violet-glow': '0 0 35px -5px rgba(135, 102, 255, 0.35)',
        'cyan-glow': '0 0 30px -4px rgba(97, 230, 242, 0.45)',
        'gold-glow': '0 0 30px -4px rgba(245, 197, 106, 0.45)',
        'hud-border': 'inset 0 0 0 1px rgba(91, 140, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
