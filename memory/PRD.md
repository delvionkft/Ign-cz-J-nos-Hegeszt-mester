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

## Módosítások (2. session – elérhetőség + varratképek)
- Elérhetőség kitöltve (`src/content/site.config.ts`): telefon
  `+36 20 564 6485` (href `+36205646485`), e-mail `hareszjani85@gmail.com`.
- 3 valós hegesztéskép saját kiszolgálással (`public/images/weld-macro-1.webp`,
  `weld-macro-2.png`, `weld-macro-3.png`).
- Új tartalmi réteg: `types.ts` (WeldShot, WeldShowcase) + `content/weldShowcase.ts`.
- Új komponens `components/sections/CraftShowcase.tsx` – aszimmetrikus,
  „megtervezett" képcsoport (álló makró balra, két négyzetes jobbra egymás alatt),
  **a Technológia szekción belül** (`Technology.tsx`, `#technologia`), NEM külön
  referenciaszekció. data-testid-k: `weld-showcase`, `weld-image-1..3`.
- Ellenőrzés: `npm run lint` + `npm run build` hibátlan; testing_agent frontend
  100% PASS (elérhetőség, képek betöltése, elhelyezés, reszponzivitás 375/768/1440,
  0 konzolhiba, nincs újratöltés). `check:content` változatlan (284).

## Deployment-előkészítés (KÉSZ, deployment_agent = PASS)
- Supervisor: `/etc/supervisor/conf.d/supervisord.conf` már csak a `[program:frontend]`
  szekciót tartalmazza (a nem létező backend és a felesleges mongodb eltávolítva).
  frontend RUNNING a 3000-en, HTTP 200.
- `.gitignore`: a `.env` már NEM kizárt (a platform így tudja kezelni). `.env.local`
  továbbra is kizárva.
- `.env`: a hamis `VITE_SITE_URL=https://pelda.hu` kiürítve – deploy előtt a VALÓS
  domaint kell beállítani.
- `npm run build` + `npm run lint` hibátlan; statikus `dist/` a kimenet.
- Szándékos védelmek érintetlenek: üres `VITE_FORM_ENDPOINT` → az űrlap
  production buildben nem mutat hamis sikert, hanem telefon/WhatsApp elérhetőségre
  irányít; mérőkódok csak süti-hozzájárulás után töltődnek.

### Deploy előtt a felhasználónak beállítandó (opcionális, üzleti döntés)
- `VITE_SITE_URL` = valós éles domain (SEO canonical / OG / structured data).
- `VITE_FORM_ENDPOINT` = valós lead-fogadó végpont, ha az űrlapos ajánlatkérést
  élesben is fogadni akarja (különben marad a telefon/WhatsApp fallback).
