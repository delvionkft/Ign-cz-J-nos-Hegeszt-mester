# Kötelezően bekérendő tartalmak

Ez a lista azokat az adatokat tartalmazza, amelyeket **nem lehet kitalálni** – a valós
üzleti működésből kell származniuk. Amíg ezek nincsenek kitöltve, a production build
nem tekinthető késznek.

Aktuális állapot bármikor lekérdezhető:

```bash
npm run check:content
```

Fejlesztői módban ugyanez az oldal jobb alsó sarkában, a „Tartalmi teendők" panelen látszik.

---

## 1. Vállalkozás pontos neve
`src/content/site.config.ts` → `business.name`, `business.shortName`

A nyilvántartás szerinti pontos név, valamint egy rövid változat a fejlécbe.
Ide tartozik a `business.legalForm` (jogi forma) és `business.taxId` (adószám) is az
impresszumhoz.

## 2. Logó
`src/content/site.config.ts` → `business.logoSrc`

SVG vagy PNG, a `public/images/` mappába. Sötét háttéren is olvasható változat kell.
Amíg nincs logó, a fejléc a cégnevet mutatja.

## 3. Telefonszám
`site.config.ts` → `contact.phoneDisplay`, `contact.phoneHref`
(vagy `.env`: `VITE_PHONE_DISPLAY`, `VITE_PHONE_HREF`)

- `phoneDisplay`: olvasható formátum, pl. `+36 30 123 4567`
- `phoneHref`: `tel:` linkhez, szóköz nélkül, pl. `+36301234567`

**Amíg üres, minden telefongomb rejtve marad az oldalon** (a „Hívás most", a fejléc
telefonszáma és a mobil alsó sáv hívás gombja is).

## 4. WhatsApp- és Viber-szám
`site.config.ts` → `contact.whatsapp`, `contact.viber`
(vagy `.env`: `VITE_WHATSAPP_NUMBER`, `VITE_VIBER_NUMBER`)

- WhatsApp: `+` és szóköz **nélkül**, pl. `36301234567`
- Viber: `+` jellel, pl. `+36301234567`

Ha az űrlap végpontja még nem él, ez a két csatorna a tartalék konverziós út.

## 5. E-mail-cím
`site.config.ts` → `contact.email` (vagy `.env`: `VITE_EMAIL`)

## 6. Telephely
`site.config.ts` → `serviceArea.address`, `.city`, `.postalCode`

## 7. Nyitvatartás
`site.config.ts` → `openingHours`

Naponként `opens` / `closes` `"08:00"` formátumban. Zárt nap: `null`.
A LocalBusiness strukturált adatba is ez kerül.

## 8. Pontos vonzáskörzet
`site.config.ts` → `serviceArea.description`, `serviceArea.short`

**Természetes, emberi szöveg – NE településnevek felsorolása.** Rossz példa:
„Budapest, Vecsés, Gyál, Üllő, Monor, Pilis…". Jó példa: „A műhely [település]en működik,
a környező kistérségből napi szinten érkeznek munkák."

A `short` a hero alcímébe kerül, pl. „[Település] és környéke".

## 9. Műhelybe hozott és helyszíni munkák feltételei
`site.config.ts` → `serviceArea.dropOff`, `serviceArea.onSite`

Mikor és hogyan hozható be a munkadarab; van-e kiszállás, milyen körben, milyen díjjal.
Ha nincs kiszállás, azt is írd le – erre a GYIK és a lábazat is hivatkozik.

## 10. Heti kapacitás
`site.config.ts` → `facts.weeklyCapacity`

A B2B GYIK („Mekkora heti kapacitás áll rendelkezésre?") és a B2B folyamat hivatkozik rá.
**Csak akkor töltsd ki, ha a valós kapacitás ezt lehetővé teszi** – ellenkező esetben az
állítást tartalmazó mondat automatikusan kimarad.

## 11. Valós tapasztalati és referenciaadatok
`site.config.ts` → `trustMetrics`, `facts.experienceYears`

Szakmában eltöltött évek, elvégzett javítások száma. **Ne legyen üres jelző** („prémium
minőség", „maximális precizitás") konkrét bizonyíték nélkül. Kitöltetlen bizalmi elem
élesben nem jelenik meg.

## 12. Hegesztői minősítések
`site.config.ts` → `facts.certifications`, `trustMetrics[certification]`

A minősítés pontos megnevezése, pl. `MSZ EN ISO 9606-2 141 / 131`.
**Partnerlogót írásos engedély nélkül ne tegyél az oldalra.**

## 13. Legalább 12–15 előtte-utána munka
`src/content/galleryCases.ts`

22 előkészített hely van, a szerkezet kész. Tételenként szükséges:

| Mező | Tartalom |
|---|---|
| `images.before` / `images.after` | fotópár, WebP vagy AVIF |
| `issue` | mi volt a hiba vagy a feladat |
| `solution` | milyen javítás / gyártás történt |
| `duration` | mennyi ideig tartott |
| `replacementCost` | mennyibe került volna a csere / új termék |
| `repairCost` | mennyibe került a javítás / gyártás |
| `material` | anyag megnevezése |

Fotózási útmutató: README → „Milyen fotók kellenek".
**A `npm run check:content` külön figyelmeztet, ha 12-nél kevesebb tételnél van fotó.**

## 14. Legalább hat tipikus munka valós ársávja
`src/content/priceRanges.ts`

Szegmensenként (`urgent`, `custom`) minimum hat sor kitöltve:
`replacement` (csere ára), `price` (javítás/gyártás ára -tól/-ig), `leadTime` (átfutás).

**Egyetlen fix, mindenre érvényes ár nem használható – valós intervallum kell.**
A B2B szegmensben ártáblázat helyett az együttműködési modellek jelennek meg, azok
kitöltve vannak.

Az összehasonlító blokk ársávjai külön mezők: `src/content/segments.ts` →
`segments[...].pain.comparison`.

## 15. Valós gyártási és javítási idők
`site.config.ts` → `facts.responseTime`, `facts.leadTime`

- `responseTime`: ajánlati válaszidő, pl. „2 óra"
- `leadTime`: jellemző átfutás, pl. „24–72 óra"

**Csak akkor jelenjenek meg végleges állításként, ha a tényleges kapacitás ezt lehetővé
teszi.** Kitöltetlen érték esetén az azt tartalmazó mondat automatikusan kimarad
a folyamat- és GYIK-szövegekből.

## 16. Garanciális feltételek
`src/content/guarantee.ts` → `primaryClaim`, `terms`

Öt pontban: mire terjed ki, meddig érvényes, hogyan kell bejelenteni, mi történik jogos
igény esetén, mikor szűnik meg. Plusz `facts.warrantyPeriod` az időtartamhoz.

**A kizárások (`exclusions`) szándékosan fixek**: teherviselő és biztonságkritikus
szerkezetekre korlátozás nélküli garanciát nem szabad vállalni. Ezeket csak akkor
módosítsd, ha a valós vállalási feltételek ezt indokolják.

## 17. Adatkezelési tájékoztató és impresszum linkje
`site.config.ts` → `legalLinks`

Amíg üres, a lábléc nem kattintható szövegként jeleníti meg őket (nem lesz törött link),
az űrlapon pedig link nélküli hivatkozás szerepel.

## 18. Űrlap backend vagy CRM végpontja
`.env` → `VITE_FORM_ENDPOINT`

Bekötés és a küldött mezők listája: README → „Az űrlap bekötése".

**Amíg nincs beállítva, a production build űrlapja soha nem mutat sikeres beküldést** –
hibaüzenetet ad és a telefonos / WhatsApp elérhetőségre irányít.

## 19. Térkép és földrajzi koordináták
`site.config.ts` → `serviceArea.mapEmbedUrl`, `.mapLinkUrl`, `.latitude`, `.longitude`

- Beágyazás: Google Maps → Megosztás → Térkép beágyazása → az `iframe` `src` értéke
- Koordináták: Google Maps → jobb klikk a pontra → az első sor a koordinátapár

A koordináták a LocalBusiness strukturált adathoz kellenek.

## 20. GA4, GTM vagy más mérési azonosítók
`.env` → `VITE_GA4_ID`, `VITE_GTM_ID`, `VITE_META_PIXEL_ID`

**Amíg egyik sincs beállítva, semmilyen mérőkód nem töltődik be, és a süti sáv sem jelenik
meg.** A kódok kizárólag marketing hozzájárulás után kerülnek betöltésre.

---

## Amit szándékosan nem töltöttünk ki

Az alábbiakat nem lehetett kitalálni, ezért helykitöltőként maradtak, magyar nyelvű
útmutatóval: cégnév, elérhetőségek, telephely, nyitvatartás, vonzáskörzet, minősítések,
tapasztalati számok, minden ársáv, minden referencia adata és fotója, garanciális
feltételek, jogi oldalak linkje, térkép és mérési azonosítók.

A **szövegek** (hero, fájdalomblokk, technológiai magyarázatok, folyamat, GYIK válaszok,
garanciális kizárások, együttműködési modellek) készen vannak, és tényadatot csak
`{token}` formában hivatkoznak – így nem tartalmaznak kitalált állítást.
