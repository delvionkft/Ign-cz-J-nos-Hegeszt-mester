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

## 4/b. A hero háttérvideó

A hero hátterében valós hegesztési felvétel fut. A fájlok a `public/video/`
mappában vannak, a hivatkozás a `src/content/hero.ts` → `hero.video` mezőben.

| Fájl | Méret | Szerep |
|---|---|---|
| `hero-welding.webm` | ~1,3 MB | VP9 – Chrome, Firefox, Edge, Safari 14.1+ |
| `hero-welding.mp4` | ~1,2 MB | H.264 – minden más böngésző (tartalék) |
| `hero-welding-poster.webp` | ~43 KB | Poszterkép betöltés közben és csökkentett mozgás esetén |

**A böngésző csak az egyik videót tölti le** – a `<source>` elemek sorrendje dönt.

### Csere másik felvételre

```bash
# 1024x576, 24 fps, 11 másodperc, hang nélkül
ffmpeg -ss 0 -t 11 -i sajat-felvetel.mp4 -an \
  -vf "scale=1024:576:flags=lanczos,fps=24" \
  -c:v libvpx-vp9 -crf 50 -b:v 0 -row-mt 1 public/video/hero-welding.webm

ffmpeg -ss 0 -t 11 -i sajat-felvetel.mp4 -an \
  -vf "scale=1024:576:flags=lanczos,fps=24" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 33 -preset veryslow \
  -movflags +faststart public/video/hero-welding.mp4

# poszterkép egy jellemző képkockából
ffmpeg -ss 1.5 -i sajat-felvetel.mp4 -frames:v 1 -vf "scale=1280:-1" -q:v 3 /tmp/p.jpg
ffmpeg -i /tmp/p.jpg -c:v libwebp -quality 72 public/video/hero-welding-poster.webp
```

**Tartsd 1,5 MB alatt.** A hero videó a mobil adatforgalom terhére megy;
a felvétel sötétített és részben takart, ezért a magas bitráta felesleges.

### Amit a videó körül megoldottunk

- **Olvashatóság:** a szöveget több rétegű fátyol védi, nem a felvétel véletlen
  sötét részei. A fátyol iránya reszponzív – mobilon függőleges (keskeny
  képernyőn egy oldalirányú fátyol az egész felvételt eltakarná), asztali
  nézetben oldalirányú, hogy jobbra az ívfény szabadon látszódjon.
- **Mobil kivágás:** keskeny képernyőn a 16:9 felvételből csak szűk sáv fér el.
  Középre igazítva a hegesztő sisakjának sötét része látszana, ezért az
  `object-position` az ívfényre és a szikrákra van hangolva (`58% 46%`).
- **Csökkentett mozgás:** `prefers-reduced-motion` esetén a videó el sem indul,
  helyette a poszterkép jelenik meg.
- **Megállítható (WCAG 2.2.2):** a hero jobb alsó sarkában szünet/indítás gomb.
- **Nincs elrendezésugrás:** a poszterkép azonnal kirajzolódik, így nincs üres
  fekete első képernyő.
- **Parallax:** a videóréteg lassabban mozog a görgetésnél (`transform`, a
  kompozitorban). Mobilon és csökkentett mozgás esetén kikapcsol.

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

| Szerep | Hex | Token |
|---|---|---|
| Grafitszürke háttér | `#111315` | `ink` |
| Sötét alumíniumszürke | `#292D31` | `panel` |
| Középszürke | `#727981` | `steel` |
| Világos alumínium | `#BCC1C6` | `alu` |
| Törtfehér | `#F4F4F2` | `paper` |
| Fő piros akcentus | `#D71920` | `brand` |
| Sötétebb piros (hover) | `#AD1117` | `brand.dark` |

A színek a `tailwind.config.js`-ben egy helyen módosíthatók. Két származtatott token
egészíti ki a megadott palettát:

- **`brand.light` (`#FF5A60`)** – kizárólag kis méretű piros szöveghez sötét háttéren.
  A `#D71920` ekkora méretben nem érné el az AA kontrasztkövetelményt.
- **`pit` (`#0B0C0D`)** – a grafitnál mélyebb tónus a teljes szélességű sávokhoz, hogy a
  szekciók ritmusa szín nélkül is olvasható legyen.

### Ahol a piros megjelenhet

Elsődleges CTA, aktív problémakártya, sorszámozás, fókusz- és hover állapot, valamint az
ártáblázat „javítás ára" oszlopa. Máshol nem – nagy piros háttérfelület sehol nincs.

### Tipográfia

**Oswald** (címsorok, számadatok, műszaki feliratok) és **Inter** (törzsszöveg),
saját kiszolgálással a `public/fonts/` mappából – nincs külső betűtípus-kérés.
A latin-ext alkészlet a magyar `ő` és `ű` karakterek miatt szükséges.

A tipográfiai skála folytonos (`clamp()`), és a `tailwind.config.js` `fontSize` blokkjában
a **méret és a sortáv mindig együtt jár** (`display-2xl`, `display-xl`, `display-lg`,
`display-md`, `display-sm`, `numeral-xl`, `numeral-lg`, `label`). Ez szándékos: így nem
fordulhat elő, hogy egy reszponzív `text-*` osztály felülírja a `leading-*` értéket, és a
sorok egymásra csúsznak.

### Felületkezelés

A fémes hatás nem gradiensből jön, hanem élkezelésből: a `shadow-edge` felül egy hajszálnyi
fénytörést, alul árnyékot tesz a panelekre – ez adja a megmunkált lemez érzetét.
Kiegészítő motívumok: `bg-brushed` (szálcsiszolt felület), `bg-grid` (műszaki raszter),
`corner-marks` (rajzlap-regisztrációs jelek), `tick-row` (mérőléc-osztás),
`section-rule` (szekcióhatároló hajszálvonal piros indítószakasszal).

### Mozgás

Animációk 150–250 ms között; a `prefers-reduced-motion` beállítást az oldal tiszteletben
tartja. Nincs automatikusan mozgó carousel, parallax vagy felugró ablak.

A görgetéses megjelenést a `src/components/ui/Reveal.tsx` végzi. **A tartalom soha nem
maradhat láthatatlan:** ha nincs IntersectionObserver vagy a látogató csökkentett mozgást
kért, a tartalom azonnal látszik; gyors görgetésnél az összevont értesítés is megjelenítést
vált ki; végső hálóként 1,2 másodperc után minden elem megjelenik.

### Fejléc: szikrázó menüpontok

A navigációs linkek kurzor alá érve apró szikrákat pattintanak ki az alsó élükből,
miközben a piros aláhúzás balról behúz – ugyanaz a mozdulat, mint amikor a
hegesztőpálca hozzáér az anyaghoz (`src/components/ui/SparkLink.tsx`).

- Tiszta CSS: minden szikra egy 2–4 px-es elem `transform` + `opacity` animációval,
  tehát a böngésző a kompozitorban futtatja.
- A röppályák kézzel hangoltak, nem véletlenszerűek – minden link ugyanazt a
  felismerhető mozdulatot ismétli.
- A szikrák `aria-hidden` és `pointer-events: none`.
- Billentyűzetes fókusznál is lefut (`group-focus-visible`).
- `prefers-reduced-motion` esetén nincs szikra, csak a színváltás és az aláhúzás –
  az aktív állapot így is egyértelmű.
- A szikrák az egyetlen hely, ahol az `ember` (`#FFB25A`) meleg tónus megjelenik.
  Szövegre és felületre soha.

### Lábléc

Az oldal lezárása, nem zsákutca: a „Miben segítek" gyorslinkek ugyanazt a
szegmensállapotot állítják, mint a problémaválasztó, és felgörgetnek hozzá.
Tartalma: márkablokk anyag- és eljáráskörrel, elérhetőségi csatornák, navigáció,
nyitvatartás, jogi linkek, süti beállítások, cégadatok és „Vissza a tetejére".

Lezárásként nagy méretű, alig látható névvízjel. A betűmérete a felirat hosszához
igazodik (`~190vw / karakterszám`), így hosszabb cégnév sem lóg ki. Amíg a cégnév
nincs kitöltve, a szakma neve áll ott.

### Struktúra

- **Szekció-sorszámozás (01–10)** a jobb margón: a landing egy megtervezett sorrend,
  ezért a számozás valós információt hordoz.
- **Szegmens-kontextussáv** (`SegmentBar`): görgetés közben is mutatja és válthatóvá teszi
  az aktuális szegmenst. A problémaválasztó után jelenik meg, az űrlapnál eltűnik.
- **Megtapadó fejrészek** a galériánál, a technológiánál és a GYIK-nél: a szűrő és a
  kontextus végig kéznél marad, miközben a tartalom mellette görög.
- **Váltakozó tónusok** (`base` / `panel` / `pit`) adják a szekciók ritmusát.

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
