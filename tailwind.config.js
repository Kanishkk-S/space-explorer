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
          dark: '#050814',
          subdark: '#0A1020',
          card: '#101A2E',
          border: 'rgba(57, 132, 255, 0.15)',
          'border-hover': 'rgba(137, 93, 255, 0.35)',
          blue: '#3984FF',
          violet: '#895DFF',
          cyan: '#00E5FF',
          gold: '#F5A623',
          text: '#F1F5FF',
          muted: '#98A7C0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(circle at 50% 0%, rgba(57, 132, 255, 0.15) 0%, rgba(5, 8, 20, 0.95) 75%)',
        'card-gradient': 'linear-gradient(135deg, rgba(16, 26, 46, 0.8) 0%, rgba(10, 16, 32, 0.9) 100%)',
        'glow-radial': 'radial-gradient(circle, rgba(137, 93, 255, 0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'cosmos-glow': '0 0 25px -5px rgba(57, 132, 255, 0.3)',
        'violet-glow': '0 0 25px -5px rgba(137, 93, 255, 0.3)',
        'cyan-glow': '0 0 20px -3px rgba(0, 229, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
