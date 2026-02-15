/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'magi-dark': '#0a0a0f',
        'magi-panel': '#12121a',
        'magi-border': '#2a2a3a',
        'magi-green': '#00ff88',
        'magi-red': '#ff4444',
        'magi-yellow': '#ffaa00',
        'magi-blue': '#00aaff',
      },
      fontFamily: {
        'game': ['Press Start 2P', 'monospace'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
