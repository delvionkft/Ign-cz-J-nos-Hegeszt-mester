/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Alumíniumszürke–piros arculat. A hex értékek egy helyen módosíthatók.
        ink: '#111315', // grafitszürke háttér
        panel: '#292D31', // sötét alumíniumszürke
        steel: '#727981', // középszürke (keret, ikon, nagy szöveg)
        alu: '#BCC1C6', // világos alumínium (másodlagos szövegszín)
        paper: '#F4F4F2', // törtfehér (elsődleges szövegszín sötét háttéren)
        brand: {
          DEFAULT: '#D71920', // fő piros akcentus
          dark: '#AD1117', // hover állapot
          // Kis méretű piros szöveghez sötét háttéren (AA kontraszt miatt).
          light: '#FF5A60',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        // Éles, műszaki formavilág: legfeljebb 8px kerekítés.
        none: '0px',
        sm: '4px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
        full: '9999px',
      },
      maxWidth: {
        content: '1200px',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
      backgroundImage: {
        // Szálcsiszolt alumíniumot idéző, nagyon visszafogott felület.
        brushed:
          'repeating-linear-gradient(180deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px)',
        'brushed-h':
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 200ms ease-out both',
        'fade-in': 'fade-in 150ms ease-out both',
      },
    },
  },
  plugins: [],
}
