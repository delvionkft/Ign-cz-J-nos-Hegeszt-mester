# Induló utasítás Emergentnek

Illeszd be ezt első üzenetként az Emergent-munkamenetbe, miután bekötötted a
GitHub repót. Célja, hogy az agent gyorsan tájékozódjon, és ne térjen el a
meglévő technológiai és tartalmi rendszertől.

---

## A projekt

Kész, működő landing oldal **HRJ Profitech** (alumínium- és rozsdamentes
hegesztés, öntvényjavítás, egyedi gyártás) számára. Cél: fotóval együtt
érkező ajánlatkérések gyűjtése, nem a szolgáltatások puszta felsorolása.

A teljes stratégia egyetlen ígéretre épül: „Amit máshol azt mondták, hogy
nem javítható, csak cserélhető – azt én megjavítom.” A látogató egy
problémaválasztóval eldönti, melyik szegmensbe tartozik (sürgős javítás /
egyedi gyártás / B2B partnerség), és ettől kezdve az oldal teljes tartalma
(fájdalomblokk, galéria, árak, folyamat, garancia, GYIK, űrlap) ehhez igazodik.

**Mielőtt bármit módosítasz: olvasd el a `README.md`-t (technikai és
tartalmi kézikönyv) és a `CONTENT_CHECKLIST.md`-t (mi van kitöltve, mi hiányzik
még, pontosan hol). Ez a két fájl a hiteles forrás – ne duplikáld a tartalmukat,
és ne térj el tőlük indoklás nélkül.**

## Technológia – ezt NE cseréld le

React 18 + TypeScript + Vite 5 + Tailwind CSS 3. Nincs backend, nincs
adatbázis, nincs külső futásidejű függőség (a betűtípusok és a hero videó is
saját kiszolgálásúak). A build egy statikus `dist/` mappát ad.

```bash
npm install
cp .env.example .env      # lásd lent, mit kell kitölteni
npm run dev                # fejlesztéshez, élő újratöltéssel
```

**Az éles/előnézeti kiszolgáláshoz `npm start`-ot használj, ne `npm run dev`-et.**
Az `npm start` lebuildeli és statikusan szolgálja ki az oldalt (`vite build &&
vite preview`), a `PORT` környezeti változót olvassa 3000-es tartalékkal
(`vite.config.ts`). Ha a platform proxyzáson/iframe-en keresztül futtatja a
fejlesztői szervert (`npm run dev`), annak HMR WebSocket-kapcsolata
meghiúsulhat, ami folyamatos oldal-újratöltést okoz – erre az oldalnak nincs
is szüksége, mivel nincs futásidejű backend.

`npm run build` + `npm run lint` (TypeScript ellenőrzés) mindig fusson le
hibátlanul, mielőtt bármit véglegesítesz.

## Amit SOHA ne csinálj

- **Ne cseréld le a tech stacket**, és ne vezess be szerveroldali keretrendszert
  „egyszerűbb lenne” alapon – a jelenlegi statikus felépítés szándékos.
- **Ne találj ki üzleti adatot**: árat, referenciát, minősítést, garanciát,
  tapasztalati számot. A `src/content/` mappában minden kitöltetlen valós adat
  `todo('...')` jelöléssel van ellátva, magyar útmutatóval – ezeket a
  vállalkozóval folytatott beszélgetésben kell megszerezni, nem kitalálni.
  Ellenőrzés: `npm run check:content`.
- **Ne bontsd meg a tartalmi réteget** (`src/content/`): a szövegek, árak,
  referenciák, GYIK-elemek egy központi helyről jönnek, hogy a komponenskód
  módosítása nélkül szerkeszthetők legyenek. Új tartalmi mezőt a megfelelő
  `.ts` fájlban és a `types.ts`-ben adj hozzá, ne hardkódold a komponensbe.
- **Ne írj `overflow: hidden`-t** egyetlen olyan elem ősére sem, amelyben
  `position: sticky` van (galéria, technológia, árak, GYIK fejrésze,
  `src/components/ui/Section.tsx`). Ez a CSS specifikáció szerint görgetési
  konténert hoz létre, ami megtöri a sticky viselkedést – ezért van
  `overflow-clip` a `body`-n és a `Section`-ön `hidden` helyett. Ez már egyszer
  élesen elromlott a fejlesztés során; ne vezesd vissza.
- **Ne engedd élesbe az űrlapot valós végpont nélkül úgy, hogy sikeresnek
  tűnjön.** Ha `VITE_FORM_ENDPOINT` nincs beállítva, az űrlap production
  buildben szándékosan hibaüzenetet mutat sikeres beküldés helyett (lásd
  `src/lib/formAdapter.ts`). Ezt ne írd felül hamis sikerállapotra – vagy köss
  be valós végpontot, vagy hagyd ezt a védelmet érintetlenül.
- **Ne tölts be marketing mérőkódot hozzájárulás előtt.** A GA4/GTM/Meta Pixel
  kizárólag a süti-elfogadás után töltődik be (`src/lib/consent.ts`) – ez
  szándékos, jogi okból is.
- **Ne bántsd a szegmensváltás logikáját** (`src/hooks/useSegment.tsx`): az
  URL query paraméter, a tárolt állapot és a tartalom-újratöltés egymáshoz van
  kötve.

## Azonnali prioritások (ebben a sorrendben)

1. **`.env` kitöltése.** A legfontosabb: `VITE_FORM_ENDPOINT` – enélkül az
   oldal fő konverziós pontja (fotós ajánlatkérés) nem tud sikeresen elküldeni
   semmit élesben. Ha Emergent tud biztosítani egy egyszerű backend
   végpontot/webhookot a lead fogadására, kösd be azt.
2. **Menj végig a `CONTENT_CHECKLIST.md` 20 pontján a vállalkozóval
   beszélgetve.** Ésszerű sorrend:
   - gyors, egyszeri adatok: telephely, nyitvatartás, vonzáskörzet leírása,
     térkép beágyazás/koordináták, jogi oldalak linkje, GA4/GTM azonosító
   - tényadatok: válaszidő, átfutás, garancia időtartama, heti kapacitás,
     minősítés, tapasztalat évek
   - nagyobb munka: legalább 6 tipikus munka valós ársávja szegmensenként
     (`src/content/priceRanges.ts`), legalább 12–15 előtte-utána referencia
     fotóval és adatokkal (`src/content/galleryCases.ts`, fotózási útmutató a
     README „Milyen fotók kellenek” fejezetében)
3. A `WhatsApp`/`Viber` szám még nincs megerősítve (`contact.whatsapp` /
   `contact.viber` a `site.config.ts`-ben) – kérdezd meg, van-e ilyen csatorna,
   mielőtt kitöltöd.

## Ellenőrzés minden érdemi módosítás után

- `npm run build` és `npm run lint` hibátlan
- `npm run check:content` – csökken-e a hátralévő tételek száma a
  szándékodnak megfelelően (ne nőjön véletlenül)
- Vizuális ellenőrzés 320 px-től legalább 1920 px-ig: nincs vízszintes
  túlcsordulás, nincs konzolhiba
- A szegmensváltás (problémaválasztó → URL, űrlap kategória, galéria/árak/GYIK
  tartalma) ténylegesen működik mindhárom szegmensben

## Repó-állapot

Két, tartalmilag azonos GitHub repó létezik jelenleg (`landing-teszt` és
`Ign-cz-J-nos-Hegeszt-mester`), mindkettő a `claude/aluminum-welding-landing-yngv7p`
ágon. **Csak az egyiket kösd be Emergentbe**, és onnantól csak abban dolgozz
tovább – a másik szinkronban tartása innentől nem automatikus.
