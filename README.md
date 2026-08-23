# Alumínium- és rozsdamentes hegesztés – landing oldal

Konverzió-orientált, magyar nyelvű landing oldal alumínium-, öntvény- és rozsdamentes
hegesztéssel foglalkozó vállalkozás számára. Az oldal célja nem a szolgáltatások
felsorolása, hanem **fotóval együtt érkező ajánlatkérések** megszerzése.

Az oldal egyetlen ígéretre épül:

> „Amit máshol azt mondták, hogy nem javítható, csak cserélhető – azt én megjavítom.”

A látogató a problémaválasztóval eldönti, melyik szegmensbe tartozik, és ettől kezdve az
oldal teljes tartalma (fájdalomblokk, galéria, árak, folyamat, garancia, GYIK, űrlap) az ő
esetéhez igazodik.

---

## 1. Technológia

| | |
|---|---|
| Keretrendszer | React 18 + TypeScript |
| Build | Vite 5 |
| Stílus | Tailwind CSS 3 |
| Külső futásidejű függőség | **nincs** (a betűtípusok is saját kiszolgálásúak) |
| Backend | nincs – az űrlap egy konfigurálható végpontra POST-ol |

Nincs olyan zárt vagy külső szolgáltatás, amely az Emergentbe történő integrációt
akadályozná. A build egy statikus `dist/` mappát állít elő.

## 2. Telepítés és futtatás

```bash
npm install
cp .env.example .env      # töltsd ki a valós értékekkel
npm run dev               # fejlesztői szerver: http://localhost:3000
```

| Parancs | Mit csinál |
|---|---|
| `npm run dev` | Fejlesztői szerver élő újratöltéssel |
| `npm run build` | Production build a `dist/` mappába |
| `npm run preview` | A production build helyi kiszolgálása |
| `npm run lint` | TypeScript típusellenőrzés |
| `npm run check:content` | **Kilistázza a még kitöltetlen kötelező tartalmakat** |

### Emergent / statikus tárhely

- Build parancs: `npm run build`
- Kimeneti mappa: `dist`
- Node verzió: 18 vagy újabb

Az oldal egyoldalas statikus alkalmazás, nem igényel szerveroldali útvonalkezelést.

---

## 3. A tartalom cseréje

**Minden szöveg, ár, referencia és elérhetőség a `src/content/` mappában található.
Komponenskódot tartalomcseréhez nem kell módosítani.**

| Fájl | Mit tartalmaz |
|---|---|
| `site.config.ts` | Cégadatok, elérhetőség, telephely, vonzáskörzet, nyitvatartás, tényadatok, bizalmi sáv, jogi linkek, mérési azonosítók, űrlap végpont |
| `hero.ts` | A hero szövegei és a kiemelt előtte-utána fotópár |
| `segments.ts` | A három fő szegmens (`urgent`, `custom`, `b2b`) minden szövege |
| `problemCards.ts` | A problémaválasztó hat kártyája |
| `galleryCases.ts` | Az előtte-utána referenciák |
| `priceRanges.ts` | Ártáblázat sorai + B2B együttműködési modellek |
| `processSteps.ts` | A négylépéses folyamat szegmensenként |
| `guarantee.ts` | Garanciális állítások, feltételek és kizárások |
| `faqs.ts` | GYIK kérdések és válaszok szegmensenként |
| `technology.ts` | Technológiai magyarázatok ügyfélnyelven |

### Kötelezően kitöltendő mezők

A valós üzleti adatokat nem találtuk ki. A hiányzó mezők a `todo('...')` jelöléssel vannak
ellátva, és magyar nyelvű útmutatót tartalmaznak arról, mit kell beírni:

```ts
phoneDisplay: todo('Telefonszám olvasható formában, pl. +36 30 123 4567'),
// kitöltés után:
phoneDisplay: '+36 30 123 4567',
```

Ezek a mezők:

- **fejlesztői módban** az oldal jobb alsó sarkában, a „Tartalmi teendők" panelen látszanak,
- **production buildben** nem jelennek meg nyers helykitöltőként (az érintett elem
  egyszerűen kimarad, vagy semleges tartalmi helyet mutat),
- a `npm run check:content` paranccsal bármikor kilistázhatók.

```bash
npm run check:content
# ⚠️  290 kitöltetlen kötelező tartalom maradt:
# ── contact (5)
#    • contact.phoneDisplay
#      Telefonszám olvasható formában, pl. +36 30 123 4567
```

A parancs 1-es hibakóddal áll le, amíg maradt teendő – így beépíthető élesítés előtti
ellenőrzésbe vagy CI-be.

**A teljes, számozott lista: [`CONTENT_CHECKLIST.md`](./CONTENT_CHECKLIST.md)**

### Tényadatok szövegen belül

A szövegekben `{token}` formában lehet a `site.config.ts` `facts` objektumára hivatkozni:

```ts
answer: 'A legtöbb javítás {leadTime} alatt elkészül.'
```

Ha az adott tényadat még nincs kitöltve, **az azt tartalmazó mondat automatikusan kimarad**
a megjelenített szövegből. Így soha nem kerül ki féllábas vagy kitalált állítás.
Ezért a tényadatot tartalmazó állítást mindig külön mondatba írd.

Elérhető tokenek: `businessName`, `shortName`, `phone`, `email`, `serviceArea`, `city`,
`responseTime`, `leadTime`, `warrantyPeriod`, `weeklyCapacity`, `certifications`,
`experienceYears`.

---

## 4. Milyen fotók kellenek

A galéria az oldal legerősebb bizonyítékblokkja. **Négy homályos telefonfotóból nem lesz
meggyőző referencia.** Az elfogadhatóság minimuma: 12–15 valós munka.

A `galleryCases.ts` 22 előkészített helyet tartalmaz, a szerkezet (kategória, szegmens,
megnevezés) készen áll – a fotókat és a tényadatokat kell pótolni.

### Fotózási útmutató

- **Előtte és utána ugyanabból a nézetből**, azonos távolságból – ez teszi az összehasonlítást
  hitelessé.
- Éles fókusz a sérülésen; a mobiltelefon is elég, ha van elég fény.
- Semleges, rendezett háttér (műhelypad, kartonlap). Ne legyen a képen más ügyfél munkája.
- Egy közeli a hibáról + egy távolabbi az egész alkatrészről.
- Kerüld a vakut a fényes alumíniumfelületeken – oldalról érkező, szórt fény a jó.

### Képek elhelyezése és formátuma

1. Tedd a fájlokat a `public/images/gallery/` mappába.
2. Konvertáld **WebP** vagy **AVIF** formátumba (kb. 1600 px szélesség, 80–85% minőség).
3. Írd be az elérési utat a `galleryCases.ts` megfelelő tételébe:
   ```ts
   images: {
     before: '/images/gallery/valtohaz-elotte.webp',
     after: '/images/gallery/valtohaz-utana.webp',
     beforeAlt: 'Alumínium váltóház letört rögzítő füle – állapot a javítás előtt',
     afterAlt: 'Alumínium váltóház letört rögzítő füle – állapot a javítás után',
   },
   ```

A hero képe (`hero.ts` → `showcase`) előre töltődik és elsőbbséget kap; a hajtás alatti
képek lazy loadinggal, rögzített képaránnyal töltődnek, így nincs elrendezésugrás.

---

## 5. Az űrlap bekötése

Az ajánlatkérő űrlap egyetlen bekötési ponton keresztül kommunikál a backenddel:
**`src/lib/formAdapter.ts`**. A komponens nem tud a végpontról.

### Beállítás

```bash
# .env
VITE_FORM_ENDPOINT=https://sajat-backend.hu/api/lead
VITE_FORM_MODE=multipart      # multipart (fájlokkal) | json (fájlok nélkül)
```

### Amit a végpont kap – `multipart/form-data`

| Mező | Tartalom |
|---|---|
| `segment` | `urgent` \| `custom` \| `b2b` |
| `problem` | a kiválasztott problémakártya azonosítója |
| `problem_label` | ugyanaz emberi olvasásra |
| `name` | név / kapcsolattartó |
| `phone` | telefonszám |
| `company` | cégnév (csak B2B) |
| `message` | rövid leírás |
| `consent` | `true` |
| `page_url` | az oldal URL-je a beküldéskor |
| `source` | az URL query paraméterei JSON-ként (pl. UTM) |
| `photo_1` … `photo_5` | a feltöltött képek |
| `photo_count` | a képek száma |

`json` módban ugyanezek a mezők JSON törzsben, fájlok nélkül (`photo_names` listával).

**Elvárt válasz:** bármilyen 2xx HTTP státusz. A válasz törzse nem kötelező.

### Ha nincs beállítva végpont

| Környezet | Viselkedés |
|---|---|
| `npm run dev` | Szimulált beküldés, **jelölt** „FEJLESZTŐI MOCK" figyelmeztetéssel. Hálózati kérés nem indul. |
| production build | Az űrlap **soha nem mutat sikeres állapotot.** Hibaüzenetet ad, és a telefonos / WhatsApp / Viber elérhetőségre irányít. |

### Egyedi formátum

Ha a CRM-ed más szerkezetet vár, a `formAdapter.ts` `buildMultipart` / `buildJson`
függvényét írd át. Az űrlapkomponensben nem kell módosítani semmit.

### Képfeltöltés

- Elfogadott: JPG, PNG, WebP, HEIC/HEIF
- Fájlonként max. 10 MB, legfeljebb 5 kép (`site.config.ts` → `formEndpoint`)
- Előnézet és eltávolítás minden képnél
- Mobilon külön „Fotózás most" gomb (`capture="environment"`)
- HEIC fájlnál a böngésző nem tud előnézetet mutatni – ilyenkor fájlnév-kártya jelenik meg,
  a fájl feltöltése ettől még működik

---

## 6. Mérési események

Minden esemény a `window.dataLayer`-be kerül (GTM ezt olvassa), és ha van betöltött GA4,
`gtag('event', ...)` hívásként is elmegy. Központi hely: **`src/lib/analytics.ts`**.

| Esemény | Mikor | Kiemelt paraméterek |
|---|---|---|
| `segment_select` | problémakártya kiválasztása | `segment`, `problem`, `location` |
| `cta_click` | bármelyik fő CTA | `location`, `cta`, `contactMethod` |
| `phone_click` | `tel:` link | `location`, `contactMethod: phone` |
| `whatsapp_click` | WhatsApp gomb | `location`, `contactMethod: whatsapp` |
| `viber_click` | Viber gomb | `location`, `contactMethod: viber` |
| `gallery_case_open` | referencia megnyitása | `case_id`, `filter` |
| `price_section_view` | az ártáblázat láthatóvá válik | `segment` |
| `form_start` | első interakció az űrlappal | `segment`, `problem` |
| `photo_upload` | kép hozzáadása | `count`, `source` (`file` / `camera`) |
| `lead_submit` | sikeres beküldés | `segment`, `problem`, `photo_count` |
| `form_error` | validációs vagy küldési hiba | `fields` vagy `reason` |

**Minden esemény automatikusan tartalmazza:** `segment` (fő szegmens), `problem`
(problématípus), `page_position` (görgetési mélység százalékban), valamint ahol értelmezhető,
a `location` (a CTA helye) és a `contactMethod` mezőt.

A lead a kiválasztott szegmenssel és problématípussal együtt megy a backendnek, így később
mérhető, melyik szolgáltatási ág hoz valódi üzletet.

### Hozzájárulás-alapú működés

**Marketingcélú követőkód kizárólag kifejezett hozzájárulás után töltődik be.**
(`src/lib/consent.ts`)

- Google Consent Mode v2 alapértelmezés: minden megtagadva.
- Hozzájárulás előtt semmilyen külső kérés nem indul – az események csak a helyi
  `dataLayer`-be kerülnek.
- Ha a `.env`-ben nincs mérési azonosító, a süti sáv **meg sem jelenik**.
- A hozzájárulás a láblécben, a „Süti beállítások" ponton bármikor módosítható.
- A `tracking.consentVersion` növelésével újra bekérhető a hozzájárulás.

Beállítás: `VITE_GA4_ID`, `VITE_GTM_ID`, `VITE_META_PIXEL_ID`.

---

## 7. SEO és strukturált adatok

- Egyetlen `H1`, logikus `H2`/`H3` hierarchia, szemantikus HTML.
- Title, meta description, canonical és Open Graph a `site.config.ts`-ből épül fel
  (`src/lib/seo.ts`) – nem kell két helyen karbantartani.
- **LocalBusiness** strukturált adat: cégnév, cím, telefon, e-mail, nyitvatartás,
  vonzáskörzet, koordináták, szolgáltatások, URL.
- **FAQPage** strukturált adat kizárólag a ténylegesen látható kérdésekből és a
  megjelenített válaszszövegből.
- **Érvénytelen vagy helykitöltő strukturált adat nem kerül ki:** ha a kötelező mezők
  (név, telefon, cím) hiányoznak, a JSON-LD blokk egyszerűen nem jön létre.

Élesítés előtt írd át a `public/robots.txt` sitemap sorát a saját domainre.

---

## 8. Arculat

| Szerep | Hex |
|---|---|
| Grafitszürke háttér | `#111315` |
| Sötét alumíniumszürke | `#292D31` |
| Középszürke | `#727981` |
| Világos alumínium | `#BCC1C6` |
| Törtfehér | `#F4F4F2` |
| Fő piros akcentus | `#D71920` |
| Sötétebb piros (hover) | `#AD1117` |

A színek a `tailwind.config.js`-ben egy helyen módosíthatók
(`ink`, `panel`, `steel`, `alu`, `paper`, `brand`, `brand.dark`, `brand.light`).

A `brand.light` (`#FF5A60`) kizárólag **kis méretű piros szöveghez** kell sötét háttéren:
a `#D71920` ekkora méretben nem érné el az AA kontrasztkövetelményt.

Betűtípusok: **Oswald** (címsorok) és **Inter** (törzsszöveg), saját kiszolgálással a
`public/fonts/` mappából – nincs külső betűtípus-kérés. A latin-ext alkészlet a magyar
`ő` és `ű` karakterek miatt szükséges.

Animációk 150–250 ms között; a `prefers-reduced-motion` beállítást az oldal tiszteletben
tartja. Nincs automatikusan mozgó carousel, parallax vagy felugró ablak.

---

## 9. Akadálymentesség és teljesítmény

- Mobile-first, 320 px szélességtől hibamentes; nincs vízszintes túlcsordulás.
- A problémaválasztó `radiogroup` mintát követ: Tab a csoportra, nyílbillentyűk a
  kártyák között.
- A képnézet (lightbox) fókuszcsapdát használ, Escape-re zár, nyilakkal léptethető,
  és visszaadja a fókuszt a megnyitó elemnek.
- Az előtte-utána csúszkát egy teljes felületet lefedő `input[type=range]` vezérli, ezért
  érintőképernyőn és billentyűzettel egyaránt működik.
- Minden űrlapmezőnek valódi `label`-je van; a hibaüzenetek ikonnal és szöveggel is
  jelölve vannak, nem csak színnel (`aria-invalid`, `role="alert"`).
- Látható fókuszállapot minden interaktív elemen.
- Rögzített képarányok – a képek betöltése nem okoz elrendezésugrást.

---

## 10. Projektstruktúra

```
src/
├── content/          # MINDEN tartalom – itt kell szerkeszteni
│   ├── site.config.ts    cégadatok, elérhetőség, mérés, űrlap végpont
│   ├── segments.ts       a három fő szegmens
│   ├── hero.ts / problemCards.ts / galleryCases.ts / priceRanges.ts
│   ├── processSteps.ts / guarantee.ts / faqs.ts / technology.ts
│   ├── types.ts          típusdefiníciók
│   ├── fillable.ts       a `todo()` jelölés
│   └── validate.ts       tartalmi ellenőrző
├── lib/
│   ├── analytics.ts      mérési események
│   ├── consent.ts        hozzájárulás-kezelés
│   ├── formAdapter.ts    az űrlap egyetlen bekötési pontja
│   ├── seo.ts            meta adatok és strukturált adatok
│   ├── text.ts           `{token}` feloldás
│   └── utils.ts
├── hooks/
│   ├── useSegment.tsx    szegmensállapot + URL + tárolás
│   ├── useInView.ts / useMedia.ts
└── components/
    ├── ui/               újrahasznált elemek (Button, Modal, BeforeAfter, …)
    └── sections/         az oldal szekciói, sorrendben
```

---

## 11. Élesítés előtti ellenőrzőlista

- [ ] `npm run check:content` hibátlanul lefut
- [ ] `.env` kitöltve (`VITE_FORM_ENDPOINT`, mérési azonosítók, `VITE_SITE_URL`)
- [ ] Az űrlap tesztbeküldése megérkezik a backendbe / CRM-be
- [ ] Legalább 12 valós előtte-utána munka fotóval és adatokkal
- [ ] Legalább hat tipikus munka valós ársávval szegmensenként
- [ ] Telefonszám, WhatsApp és Viber link tesztelve mobilon
- [ ] Adatkezelési tájékoztató és impresszum linkje működik
- [ ] `public/robots.txt` sitemap sora a saját domainre írva
- [ ] Google Maps beágyazás és koordináták beállítva
