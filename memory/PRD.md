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
  vár → készült egy vékony wrapper: `/app/frontend/package.json`. A `/frontend`
  a `.gitignore`-ban (nem a projekt része).
- **Szerválási mód: production build kiszolgálása** (`vite build && vite preview`)
  a 3000-es porton. Ok: a dev szerver HMR websocketje a HTTPS proxy mögött
  periodikusan megszakadt, ezért a Vite teljes oldal-újratöltéssel reagált
  (a felhasználó „folyamatosan újratölt" panasza). A `vite preview` statikus
  szerver, nincs websocket → nincs újratöltés. Fejlesztéshez lokálisan
  `npm run dev` használható.
- `vite.config.ts`: `server.allowedHosts: true`, `server.hmr {clientPort:443,
  protocol:'wss'}`, `preview.allowedHosts: true` hozzáadva (preview host engedése).
- `.env` a `.env.example`-ből létrehozva (értékek üresek – szándékos).
- Megjegyzés: production buildben a dev-only „Tartalmi teendők" panel nem
  jelenik meg (szándékos, csak `npm run dev`-ben látszik).

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
