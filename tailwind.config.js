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
        // A grafit háttérnél is mélyebb tónus a teljes szélességű sávokhoz.
        pit: '#0B0C0D',
        // Az ívfény hidegkék csúcsfénye a hero videóból – kizárólag apró
        // fénypontokhoz és a videós szekció hangulati kötéséhez.
        arc: '#7FD4FF',
        // A hegesztési szikrák meleg tónusa. KIZÁRÓLAG néhány pixeles
        // szikrarészecskékhez – szövegre és felületre soha.
        ember: '#FFB25A',
      },
      fontFamily: {
        display: ['Oswald', 'Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Folytonos tipográfiai skála – a méret és a sortáv mindig együtt jár,
        // így a reszponzív text-* osztály nem tud sortávot felülírni.
        'display-2xl': ['clamp(2.125rem, 4.9vw, 4.25rem)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        'display-xl': ['clamp(1.875rem, 4vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.012em' }],
        'display-lg': ['clamp(1.625rem, 3vw, 2.375rem)', { lineHeight: '1.06', letterSpacing: '-0.008em' }],
        'display-md': ['clamp(1.35rem, 2.2vw, 1.75rem)', { lineHeight: '1.12', letterSpacing: '-0.005em' }],
        'display-sm': ['1.125rem', { lineHeight: '1.2' }],
        // Nagy számadatokhoz (bizalmi sáv, ár-összehasonlítás).
        'numeral-xl': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'numeral-lg': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '0.95', letterSpacing: '-0.015em' }],
        // Műszaki feliratok.
        label: ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.18em' }],
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
        content: '1280px',
        prose: '68ch',
      },
      spacing: {
        gutter: 'clamp(1rem, 4vw, 2.5rem)',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(215,25,32,0.35), 0 12px 40px -12px rgba(215,25,32,0.45)',
        'glow-lg': '0 0 60px -10px rgba(215,25,32,0.55)',
        'glow-arc': '0 0 50px -12px rgba(127,212,255,0.35)',
        // Megmunkált fémél: felül fénytörés, alul árnyék.
        edge: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.45)',
        'edge-strong': 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.55)',
        lift: '0 18px 40px -24px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        // Szálcsiszolt alumíniumot idéző, nagyon visszafogott felület.
        brushed:
          'repeating-linear-gradient(112deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)',
        // Műszaki rajzot idéző raszter a teljes szélességű sávokhoz.
        grid:
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '72px 72px',
        'grid-sm': '40px 40px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'arc-flicker': {
          '0%, 100%': { opacity: '0.5' },
          '45%': { opacity: '0.85' },
          '55%': { opacity: '0.35' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        /* Szikra: kipattan, ível egyet, majd kihuny. */
        'spark-fly': {
          '0%': { opacity: '0', transform: 'translate3d(0, 0, 0) scale(0.5)' },
          '12%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': {
            opacity: '0',
            transform: 'translate3d(var(--spark-dx), var(--spark-dy), 0) scale(0.15)',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 220ms ease-out both',
        'fade-in': 'fade-in 150ms ease-out both',
        'slide-down': 'slide-down 200ms ease-out both',
        marquee: 'marquee 38s linear infinite',
        'arc-flicker': 'arc-flicker 4s ease-in-out infinite',
        'scroll-cue': 'scroll-cue 1.9s ease-in-out infinite',
        'rise-in': 'rise-in 620ms cubic-bezier(0.16, 0.84, 0.28, 1) both',
        'spark-fly': 'spark-fly var(--spark-dur, 620ms) cubic-bezier(0.2, 0.6, 0.4, 1) forwards',
      },
    },
  },
  plugins: [],
}
