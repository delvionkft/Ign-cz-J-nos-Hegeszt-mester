# Képek

## Mappaszerkezet

```
public/images/
├── hero/       a hero előtte-utána fotópárja (src/content/hero.ts)
└── gallery/    referenciafotók (src/content/galleryCases.ts)
```

## Formátum

- **WebP** vagy **AVIF**, kb. 1600 px szélesség, 80–85% minőség
- A galéria kártyáin négyzetes kivágás jelenik meg, a lightboxban 16:10 –
  a fő tárgy legyen középen

## Elnevezés

`<munka-azonosito>-elotte.webp` és `<munka-azonosito>-utana.webp`,
pl. `valtohaz-ful-elotte.webp`.

Az azonosító egyezzen a `galleryCases.ts` `id` mezőjével – így később könnyen
visszakereshető, melyik fotó melyik munkához tartozik.

## Logó

A logót a `public/images/logo.svg` útvonalra tedd, és állítsd be a
`src/content/site.config.ts` → `business.logoSrc` mezőjében.
