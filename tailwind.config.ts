import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00BB77',
          50: '#E6F9F3',
          100: '#CCF2E6', 
          200: '#99E6CD',
          300: '#66D9B4',
          400: '#33CC9B',
          500: '#00BB77',
          600: '#009960',
          700: '#008855',
          800: '#006644',
          900: '#004433',
          950: '#002211'
        },
        secondary: {
          DEFAULT: '#F3F4F6',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
    },
  },
  plugins: [],
}
export default config
