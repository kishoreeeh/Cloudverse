/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        brand: {
          aws: '#FF9900',
          docker: '#2496ED',
          k8s: '#326CE5',
          linux: '#2D3748',
          git: '#F05032',
          terraform: '#844FBA',
        },
        slate: {
          75: '#f4f6f8',
          850: '#141e2e',
          950: '#090d16',
        },
      },
      boxShadow: {
        'doc': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'doc-hover': '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'floating': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        'doc': '0.5rem',
      }
    },
  },
  plugins: [],
}
