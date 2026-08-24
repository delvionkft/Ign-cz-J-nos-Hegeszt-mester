# HRJ Profitech – Landing oldal (PRD / munkanapló)

## Projekt
Kész, működő konverzió-orientált landing oldal HRJ Profitech (alumínium- és
rozsdamentes hegesztés, öntvényjavítás, egyedi gyártás) számára. Cél: fotóval
érkező ajánlatkérések gyűjtése. Fő ígéret: „Amit máshol azt mondták, hogy nem
javítható, csak cserélhető – azt én megjavítom."

## Tech stack (NEM cserélhető)
React 18 + TypeScript + Vite 5 + Tailwind 3. Nincs backend/adatbázis, statikus
`dist/` build. Tartalmi réteg: `src/content/` (todo('...') placeholderek valós
adatokhoz). Szegmenslogika: `src/hooks/useSegment.tsx`. Hiteles forrás:
`README.md` + `CONTENT_CHECKLIST.md`.

## Környezeti beüzemelés (2026-06 / ebben a session-ben)
- A projekt a `/app` gyökérben van (nem `/app/frontend`).
- A readonly supervisor `frontend` programja `/app/frontend`-ben `yarn start`-ot
  vár → készült egy vékony wrapper: `/app/frontend/package.json`, amelynek
  `start` scriptje `cd /app && ./node_modules/.bin/vite --host 0.0.0.0 --port 3000`.
  A `/frontend` a `.gitignore`-ban (nem a projekt része).
- `vite.config.ts` → `server.allowedHosts: true` hozzáadva (preview host engedése).
- Kiszolgálás: Vite dev szerver a supervisor `frontend` alatt, 0.0.0.0:3000.
- `.env` a `.env.example`-ből létrehozva (értékek üresek – szándékos).

## Ellenőrzések (mind lefutott)
- `npm install` ✓
- `npm run lint` (tsc) ✓ hibátlan
- `npm run build` ✓ hibátlan, `dist/` legenerálva
- `npm run check:content` → 284 kitöltetlen kötelező tartalom (SZÁNDÉKOS placeholder)
- Preview URL vizuális ellenőrzés ✓ (hero, branding, CTA-k, headline rendben)

## Ami szándékosan NINCS kész (backlog – valós üzleti adat kell hozzá)
- CONTENT_CHECKLIST.md 20 pontja: elérhetőségek, telephely, nyitvatartás,
  vonzáskörzet, ársávok (`priceRanges.ts`), 12–15 előtte-utána referencia
  (`galleryCases.ts`), garancia, jogi linkek, térkép, GA4/GTM/Pixel.
- `VITE_FORM_ENDPOINT`: űrlap valós végpontja (enélkül prod buildben az űrlap
  szándékosan nem mutat sikeres beküldést).

## Állapot
Beüzemelés + futtatás ellenőrzése KÉSZ. Adatkitöltés és backend a felhasználó
kérésére most nem történt.
